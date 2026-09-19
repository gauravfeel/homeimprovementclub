import { appendFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { Resend } from "resend";
import {
  renderProspectHtml,
  renderStaffLeadHtml,
} from "../emails/render-lead.tsx";

const ROOT = process.cwd();
const DIST = join(ROOT, "dist");
const PORT = Number(process.env.PORT) || 8787;

function loadEnv({ override = false } = {}) {
  for (const name of [".env"]) {
    const path = join(ROOT, name);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq < 1) continue;
      const key = trimmed.slice(0, eq).trim();
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (override || !process.env[key]) process.env[key] = value;
    }
  }
}

loadEnv();

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

const hits = new Map();

function tooMany(ip) {
  const now = Date.now();
  const windowMs = 10 * 60 * 1000;
  const row = hits.get(ip)?.filter((t) => now - t < windowMs) || [];
  if (row.length >= 8) {
    hits.set(ip, row);
    return true;
  }
  row.push(now);
  hits.set(ip, row);
  return false;
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8") || "{}"));
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

function send(res, status, body, headers = {}) {
  const payload = typeof body === "string" ? body : JSON.stringify(body);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    ...headers,
  });
  res.end(payload);
}

function saveLocalLead(lead) {
  const dir = join(ROOT, "data");
  mkdirSync(dir, { recursive: true });
  appendFileSync(
    join(dir, "leads.jsonl"),
    `${JSON.stringify({ at: new Date().toISOString(), ...lead })}\n`,
  );
}

async function appendSheet(lead) {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!url) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("GOOGLE_SHEETS_WEBHOOK_URL is not set");
    }
    saveLocalLead(lead);
    console.warn("No GOOGLE_SHEETS_WEBHOOK_URL; wrote data/leads.jsonl");
    return;
  }
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    redirect: "follow",
    body: JSON.stringify({
      secret: process.env.GOOGLE_SHEETS_WEBHOOK_SECRET || "",
      ...lead,
    }),
  });
  if (!res.ok) {
    throw new Error(`Sheets webhook ${res.status}`);
  }
}

async function notifyEmail(lead) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("RESEND_API_KEY is not set");
    }
    console.warn("No RESEND_API_KEY; skip email");
    return;
  }
  const resend = new Resend(key);
  const to = (process.env.LEAD_EMAIL_TO || "homeimprovementclub.co@gmail.com")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  const from =
    process.env.RESEND_FROM || "Home Improvement Club <beth.t@example.com>";
  const subject =
    lead.source === "lead_popup"
      ? `New HIC lead: ${lead.projectType || "project enquiry"}`
      : `New HIC enquiry: ${lead.projectType || "project"} in ${lead.city || "service area"}`;
  const html = await renderStaffLeadHtml(lead);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: lead.email,
    subject,
    html,
  });
  if (error) throw new Error(error.message);
}

async function confirmProspect(lead) {
  const key = process.env.RESEND_API_KEY;
  if (!key) return;
  const resend = new Resend(key);
  const from =
    process.env.RESEND_FROM || "Home Improvement Club <leads@homeimprovementclub.co>";
  const staff =
    (process.env.LEAD_EMAIL_TO || "homeimprovementclub.co@gmail.com")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)[0] || "homeimprovementclub.co@gmail.com";
  const html = await renderProspectHtml(lead);
  const { error } = await resend.emails.send({
    from,
    to: lead.email,
    replyTo: staff,
    subject: "Your HIC project enquiry is in",
    html,
  });
  if (error) throw new Error(error.message);
}

async function handleLead(req, res) {
  if (process.env.NODE_ENV !== "production") {
    loadEnv({ override: true });
  }
  if (req.method === "OPTIONS") {
    send(res, 204, "", {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    return;
  }
  if (req.method !== "POST") {
    send(res, 405, { ok: false });
    return;
  }
  const ip = req.headers["x-forwarded-for"]?.split(",")[0]?.trim() || req.socket.remoteAddress || "unknown";
  if (tooMany(ip)) {
    send(res, 429, { ok: false, error: "Too many requests" });
    return;
  }
  let body;
  try {
    body = await readJson(req);
  } catch {
    send(res, 400, { ok: false, error: "Invalid JSON" });
    return;
  }
  if (body.company) {
    send(res, 200, { ok: true });
    return;
  }
  const lead = {
    source: body.source === "lead_popup" ? "lead_popup" : "contact_page",
    firstName: String(body.firstName || "").trim(),
    lastName: String(body.lastName || "").trim(),
    email: String(body.email || "").trim(),
    phone: String(body.phone || "").trim(),
    propertyAddress: String(body.propertyAddress || "").trim(),
    city: String(body.city || "").trim(),
    bestContactTime: String(body.bestContactTime || "").trim(),
    projectType: String(body.projectType || "").trim(),
    budget: String(body.budget || "").trim(),
    message: String(body.message || "").trim(),
  };
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email);
  const phoneDigits = lead.phone.replace(/\D/g, "");
  if (!lead.firstName || !emailOk) {
    send(res, 400, { ok: false, error: "Name and a valid email are required" });
    return;
  }
  if (phoneDigits && (phoneDigits.length < 10 || phoneDigits.length > 15)) {
    send(res, 400, { ok: false, error: "Enter a valid phone number" });
    return;
  }
  if (lead.source === "contact_page") {
    const budget = Number(lead.budget);
    const timeOk = ["Morning", "Afternoon", "Evening"].includes(lead.bestContactTime);
    if (phoneDigits.length < 10 || phoneDigits.length > 15) {
      send(res, 400, { ok: false, error: "Enter a valid phone number" });
      return;
    }
    if (!lead.propertyAddress) {
      send(res, 400, { ok: false, error: "Property address is required" });
      return;
    }
    if (!timeOk) {
      send(res, 400, { ok: false, error: "Select a contact time" });
      return;
    }
    if (!Number.isFinite(budget) || budget <= 10000) {
      send(res, 400, { ok: false, error: "Budget must be greater than $10,000 CAD" });
      return;
    }
  }
  try {
    await appendSheet(lead);
  } catch (error) {
    console.error(error?.message || error);
    send(res, 500, { ok: false, error: "Could not save lead" });
    return;
  }
  try {
    await notifyEmail(lead);
  } catch (error) {
    console.error("Resend failed", error?.message || error);
  }
  try {
    await confirmProspect(lead);
  } catch (error) {
    console.error("Prospect email failed", error?.message || error);
  }
  send(res, 200, { ok: true });
}

function serveSitemap(res) {
  const candidates = [
    join(DIST, "sitemap.xml"),
    join(ROOT, "public", "sitemap.xml"),
  ];
  for (const filePath of candidates) {
    try {
      if (!existsSync(filePath)) continue;
      res.writeHead(200, { "Content-Type": "application/xml; charset=utf-8" });
      res.end(readFileSync(filePath));
      return;
    } catch (error) {
      console.error("sitemap.xml read failed", error?.message || error);
    }
  }
  send(res, 404, { ok: false, error: "sitemap.xml missing" });
}

function serveStatic(req, res) {
  try {
    if (!existsSync(DIST)) {
      send(res, 503, { ok: false, error: "Build dist/ first" });
      return;
    }
    const url = new URL(req.url || "/", "http://localhost");
    let filePath = join(DIST, decodeURIComponent(url.pathname));
    if (!normalize(filePath).startsWith(DIST)) {
      send(res, 403, { ok: false });
      return;
    }
    if (existsSync(filePath) && !extname(filePath)) {
      filePath = join(filePath, "index.html");
    }
    if (!existsSync(filePath) || !extname(filePath)) {
      filePath = join(DIST, "index.html");
    }
    const type = MIME[extname(filePath)] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type });
    res.end(readFileSync(filePath));
  } catch (error) {
    console.error("static serve failed", error?.message || error);
    send(res, 500, { ok: false, error: "Could not serve file" });
  }
}

const server = createServer(async (req, res) => {
  const path = req.url?.split("?")[0] || "/";
  if (path === "/api/lead") {
    await handleLead(req, res);
    return;
  }
  if (path === "/sitemap.xml" || path === "/robots.txt") {
    if (path === "/sitemap.xml") {
      serveSitemap(res);
      return;
    }
    const robots = join(DIST, "robots.txt");
    const fallbackRobots = join(ROOT, "public", "robots.txt");
    const file = existsSync(robots) ? robots : fallbackRobots;
    if (existsSync(file)) {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(readFileSync(file));
      return;
    }
  }
  if (process.env.NODE_ENV === "production") {
    serveStatic(req, res);
    return;
  }
  send(res, 404, { ok: false });
});

server.listen(PORT, () => {
  console.log(`Lead API on http://127.0.0.1:${PORT}/api/lead`);
});
