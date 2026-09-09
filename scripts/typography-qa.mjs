import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
const origin = process.env.QA_ORIGIN || 'http://127.0.0.1:5173';
const browser = await chromium.launch({executablePath: `${process.env.LOCALAPPDATA}/ms-playwright/chromium-1217/chrome-win64/chrome.exe`, headless: true});
const routes = ['/', '/about', '/how-it-works', '/contact', '/services/kitchen-cabinets', '/services/bathrooms', '/services/exterior', '/services/lighting'];
const results = [];
await mkdir('artifacts/typography', {recursive: true});
try {
  for (const width of [1440, 390, 720, 320]) {
    const page = await browser.newPage({viewport: {width, height: 1000}, deviceScaleFactor: width === 720 ? 2 : 1});
    await page.route('**/*', route => new URL(route.request().url()).origin === origin ? route.continue() : route.abort());
    for (const path of routes) {
      await page.goto(origin + path);
      await page.locator('main h1').waitFor();
      await page.evaluate(() => document.fonts.ready);
      const info = await page.evaluate(() => {
        const h1 = document.querySelector('main h1');
        const css = getComputedStyle(h1);
        return {
          heading: css.fontFamily,
          body: getComputedStyle(document.body).fontFamily,
          loaded: [...document.fonts].filter(f => f.status === 'loaded').map(f => `${f.family}/${f.style}`),
          overflow: document.documentElement.scrollWidth > innerWidth + 1,
          headingOverflow: h1.scrollWidth > h1.clientWidth + 1,
          fontBytes: performance.getEntriesByType('resource').filter(r => r.name.endsWith('.woff2')).reduce((sum,r) => sum + r.decodedBodySize,0),
        };
      });
      assert.match(info.heading, /Source Serif 4/);
      assert.match(info.body, /Source Sans 3/);
      assert.ok(info.loaded.some(f => f.includes('Source Serif 4')));
      assert.ok(info.loaded.some(f => f.includes('Source Sans 3')));
      assert.equal(info.overflow, false, `${path} at ${width}: document overflow`);
      assert.equal(info.headingOverflow, false, `${path} at ${width}: heading overflow`);
      results.push({path,width,...info});
      if (width === 1440 || width === 390) await page.screenshot({path:`artifacts/typography/${path.replaceAll('/','_') || 'home'}-${width}.png`});
    }
    await page.close();
  }
  await writeFile('artifacts/typography/results.json', JSON.stringify(results,null,2));
  console.log('PASS: 32 typography checks; fonts loaded, no document/heading overflow, including 720px at 2x zoom-equivalent reflow.');
} finally { await browser.close(); }
