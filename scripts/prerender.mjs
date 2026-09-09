import { spawnSync } from "node:child_process";
import {
  createReadStream,
  existsSync,
  promises as fs,
  statSync,
} from "node:fs";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import { dirname, extname, join, normalize, resolve, sep } from "node:path";
import { chromium } from "playwright";

const DIST = resolve("dist");
const baseHtml = await fs.readFile(join(DIST, "index.html"), "utf8");
const HOST = "127.0.0.1";
const ROUTES = [
  "/",
  "/about",
  "/contact",
  "/how-it-works",
  "/services",
  "/areas-we-serve",
  "/services/kitchen-cabinets",
  "/services/bathrooms",
  "/services/lighting",
  "/services/flooring",
  "/services/hvac-electrical",
  "/services/exterior",
  "/testimonials",
  "/rebates",
];

const MIME_TYPES = {
  ".css": "text/css",
  ".html": "text/html",
  ".ico": "image/x-icon",
  ".js": "text/javascript",
  ".json": "application/json",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function fileForRequest(pathname) {
  const requested = normalize(join(DIST, decodeURIComponent(pathname)));
  if (
    requested.startsWith(`${DIST}${sep}`) &&
    existsSync(requested) &&
    statSync(requested).isFile()
  )
    return requested;
  return join(DIST, "index.html");
}

async function startServer() {
  const server = createServer((request, response) => {
    const pathname = new URL(request.url, `http://${HOST}`).pathname;
    const file = fileForRequest(pathname);
    response.writeHead(200, {
      "Content-Type": MIME_TYPES[extname(file)] ?? "application/octet-stream",
    });
    createReadStream(file).pipe(response);
  });
  await new Promise((resolveServer, rejectServer) => {
    server.once("error", rejectServer);
    server.listen(0, HOST, resolveServer);
  });
  const address = server.address();
  if (!address || typeof address === "string")
    throw new Error("Could not start prerender server.");
  return { server, origin: `http://${HOST}:${address.port}` };
}

function outputPath(route) {
  return route === "/"
    ? join(DIST, "index.html")
    : join(DIST, route.slice(1), "index.html");
}

async function browserExecutable() {
  const defaultExecutable = chromium.executablePath();
  if (existsSync(defaultExecutable)) return defaultExecutable;

  const cacheDir = join(process.env.LOCALAPPDATA ?? "", "ms-playwright");
  if (!existsSync(cacheDir)) return undefined;

  const entries = await fs.readdir(cacheDir, { withFileTypes: true });
  for (const entry of entries.filter(
    (item) => item.isDirectory() && item.name.startsWith("chromium-"),
  )) {
    const executable = join(cacheDir, entry.name, "chrome-win64", "chrome.exe");
    if (existsSync(executable)) return executable;
  }

  return undefined;
}

function installChromium() {
  try {
    const playwrightRoot = dirname(
      createRequire(import.meta.url).resolve("playwright/package.json"),
    );
    const playwrightCli = join(playwrightRoot, "cli.js");
    console.log("Playwright Chromium not found; installing...");
    const result = spawnSync(
      process.execPath,
      [playwrightCli, "install", "chromium"],
      {
        stdio: "inherit",
        env: { ...process.env, PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD: "" },
      },
    );
    return result.status === 0;
  } catch (error) {
    console.warn(
      `Could not install Playwright Chromium (${error.message}). Skipping prerender.`,
    );
    return false;
  }
}

async function launchBrowser() {
  try {
    let executablePath = await browserExecutable();
    if (!executablePath && !installChromium()) return undefined;
    executablePath = await browserExecutable();
    return await chromium.launch({
      headless: true,
      ...(executablePath ? { executablePath } : {}),
    });
  } catch (error) {
    console.warn(
      `Could not launch Chromium (${error.message}). Skipping prerender.`,
    );
    return undefined;
  }
}

const { server, origin } = await startServer();
const browser = await launchBrowser();

if (!browser) {
  await new Promise((resolveServer) => server.close(resolveServer));
  console.error(
    "Production build requires prerendering; install Playwright Chromium and retry.",
  );
  process.exit(1);
}

try {
  const page = await browser.newPage();
  // Build-time visits must not send analytics or enquiries.
  await page.route("**/*", (route) =>
    new URL(route.request().url()).origin === origin
      ? route.continue()
      : route.abort(),
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ROUTES) {
    await page.goto(`${origin}${route}`, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(
      (path) =>
        document
          .querySelector('link[rel="canonical"][data-rh="true"]')
          ?.getAttribute("href") === `https://homeimprovementclub.co${path}`,
      route,
    );
    await page.locator("main h1").waitFor();
    const rendered = await page.evaluate(() => ({
      root: document.getElementById("root").innerHTML,
      title: document.querySelector("title").outerHTML,
      head: Array.from(document.head.querySelectorAll('[data-rh="true"]'))
        .map((node) => node.outerHTML)
        .join("\n"),
    }));
    // Preserve the pristine tag bootstrap; never serialize injected tracker scripts.
    const shell = baseHtml
      .replace(/<title[^>]*>[\s\S]*?<\/title>/g, "")
      .replace(/<(?:meta|link)\s+[^>]*data-rh="true"[^>]*>/g, "");
    const html = shell
      .replace("</head>", `${rendered.title}\n${rendered.head}\n</head>`)
      .replace(
        '<div id="root"></div>',
        `<div id="root">${rendered.root}</div>`,
      );
    const destination = outputPath(route);
    await fs.mkdir(resolve(destination, ".."), { recursive: true });
    await fs.writeFile(destination, html, "utf8");
    console.log(`Prerendered ${route}`);
  }
} finally {
  await browser.close();
  await new Promise((resolveServer) => server.close(resolveServer));
}
