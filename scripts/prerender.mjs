import { createReadStream, existsSync, promises as fs, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";
import { chromium } from "playwright";

const DIST = resolve("dist");
const HOST = "127.0.0.1";
const ROUTES = [
  "/", "/about", "/contact", "/how-it-works", "/services",
  "/services/kitchen-cabinets", "/services/bathrooms", "/services/lighting",
  "/services/flooring", "/services/hvac-electrical", "/services/exterior",
  "/testimonials", "/rebates",
];

const MIME_TYPES = {
  ".css": "text/css", ".html": "text/html", ".ico": "image/x-icon",
  ".js": "text/javascript", ".json": "application/json", ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg", ".png": "image/png", ".svg": "image/svg+xml",
  ".webp": "image/webp", ".woff": "font/woff", ".woff2": "font/woff2",
};

function fileForRequest(pathname) {
  const requested = normalize(join(DIST, decodeURIComponent(pathname)));
  if (requested.startsWith(`${DIST}${sep}`) && existsSync(requested) && statSync(requested).isFile()) return requested;
  return join(DIST, "index.html");
}

async function startServer() {
  const server = createServer((request, response) => {
    const pathname = new URL(request.url, `http://${HOST}`).pathname;
    const file = fileForRequest(pathname);
    response.writeHead(200, { "Content-Type": MIME_TYPES[extname(file)] ?? "application/octet-stream" });
    createReadStream(file).pipe(response);
  });
  await new Promise((resolveServer, rejectServer) => {
    server.once("error", rejectServer);
    server.listen(0, HOST, resolveServer);
  });
  const address = server.address();
  if (!address || typeof address === "string") throw new Error("Could not start prerender server.");
  return { server, origin: `http://${HOST}:${address.port}` };
}

function outputPath(route) {
  return route === "/" ? join(DIST, "index.html") : join(DIST, route.slice(1), "index.html");
}

async function browserExecutable() {
  const defaultExecutable = chromium.executablePath();
  if (existsSync(defaultExecutable)) return defaultExecutable;

  const cacheDir = join(process.env.LOCALAPPDATA ?? "", "ms-playwright");
  if (!existsSync(cacheDir)) return undefined;

  const entries = await fs.readdir(cacheDir, { withFileTypes: true });
  for (const entry of entries.filter((item) => item.isDirectory() && item.name.startsWith("chromium-"))) {
    const executable = join(cacheDir, entry.name, "chrome-win64", "chrome.exe");
    if (existsSync(executable)) return executable;
  }

  return undefined;
}

const { server, origin } = await startServer();
const executablePath = await browserExecutable();
const browser = await chromium.launch({ headless: true, ...(executablePath ? { executablePath } : {}) });

try {
  const page = await browser.newPage();
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ROUTES) {
    await page.goto(`${origin}${route}`, { waitUntil: "domcontentloaded" });
    await page.waitForTimeout(500);
    const html = `<!doctype html>\n${await page.content()}`;
    const destination = outputPath(route);
    await fs.mkdir(resolve(destination, ".."), { recursive: true });
    await fs.writeFile(destination, html, "utf8");
    console.log(`Prerendered ${route}`);
  }
} finally {
  await browser.close();
  await new Promise((resolveServer) => server.close(resolveServer));
}
