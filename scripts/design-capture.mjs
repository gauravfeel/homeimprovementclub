import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
const browser = await chromium.launch({
  executablePath: `${process.env.LOCALAPPDATA}/ms-playwright/chromium-1217/chrome-win64/chrome.exe`,
  headless: true,
});
await mkdir("artifacts/redesign", { recursive: true });
const targets = process.argv.includes("--before")
  ? [
      ["original", "http://127.0.0.1:5173/"],
      ["original-kitchen", "http://127.0.0.1:5173/services/kitchen-cabinets"],
      ["original-bathroom", "http://127.0.0.1:5173/services/bathrooms"],
      ["gmatrix", "https://www.gmatrix.ca/"],
      ["icon", "https://www.wemakehomes.com/"],
      ["blackcastle", "https://blackcastlebuilds.com/"],
    ]
  : [
      ["home", "http://127.0.0.1:5173/"],
      ["kitchen", "http://127.0.0.1:5173/services/kitchen-cabinets"],
      ["bathroom", "http://127.0.0.1:5173/services/bathrooms"],
      ["contact", "http://127.0.0.1:5173/contact"],
      ["about", "http://127.0.0.1:5173/about"],
      ["services", "http://127.0.0.1:5173/services"],
      ["process", "http://127.0.0.1:5173/how-it-works"],
      ["areas", "http://127.0.0.1:5173/areas-we-serve"],
      ["lighting", "http://127.0.0.1:5173/services/lighting"],
      ["flooring", "http://127.0.0.1:5173/services/flooring"],
      ["systems", "http://127.0.0.1:5173/services/hvac-electrical"],
      ["exterior", "http://127.0.0.1:5173/services/exterior"],
      ["rebates", "http://127.0.0.1:5173/rebates"],
      ["stories", "http://127.0.0.1:5173/testimonials"],
      ["not-found", "http://127.0.0.1:5173/missing-page"],
    ];
for (const [name, url] of targets) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
  });
  if (url.startsWith("http://127.0.0.1"))
    await page.route("**/*", (route) =>
      new URL(route.request().url()).origin === "http://127.0.0.1:5173"
        ? route.continue()
        : route.abort(),
    );
  await page.addInitScript(() =>
    localStorage.setItem("hic_lead_popup_dismissed", "1"),
  );
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
    await page.locator('main h1').waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: `artifacts/redesign/${name}-desktop.png` });
    if (!process.argv.includes("--before")) {
      await page.evaluate(() => {
        for (const img of document.images) img.loading = "eager";
      });
      await page.waitForFunction(() =>
        [...document.images].every((i) => i.complete),
      );
      await page.screenshot({
        path: `artifacts/redesign/${name}-desktop-full.png`,
        fullPage: true,
      });
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({ path: `artifacts/redesign/${name}-mobile.png` });
    if (!process.argv.includes("--before"))
      await page.screenshot({
        path: `artifacts/redesign/${name}-mobile-full.png`,
        fullPage: true,
      });
    console.log(name, await page.title());
  } catch (e) {
    console.log(name, e.message);
  }
  await page.close();
}
await browser.close();
