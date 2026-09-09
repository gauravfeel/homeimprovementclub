import { readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { JSDOM } from 'jsdom';
import { chromium } from 'playwright';
import assert from 'node:assert/strict';
const paths=['/','/about','/contact','/how-it-works','/services','/areas-we-serve','/services/kitchen-cabinets','/services/bathrooms','/services/lighting','/services/flooring','/services/hvac-electrical','/services/exterior','/testimonials','/rebates'];
const before=execFileSync('git',['show','HEAD:index.html'],{encoding:'utf8'});
const trackerScripts=html=>[...new JSDOM(html).window.document.querySelectorAll('script:not([type])')].map(s=>s.outerHTML);
const expected=trackerScripts(before);
for(const route of paths){
 const html=await readFile(`dist${route==='/'?'':route}/index.html`,'utf8');
 const doc=new JSDOM(html).window.document;
 assert.equal(doc.querySelectorAll('title').length,1,route+' title');
 assert.equal(doc.querySelectorAll('main h1').length,1,route+' prerendered H1');
 assert.equal(doc.querySelectorAll('link[rel="canonical"]').length,1);
 assert.equal(doc.querySelector('link[rel="canonical"]').href,'https://homeimprovementclub.co'+route);
 assert.equal(doc.querySelectorAll('meta[name="description"]').length,1);
 assert.deepEqual(trackerScripts(html),expected,route+' tracker bootstrap changed or duplicated');
 assert.equal(doc.querySelectorAll('script[src*="/gtm.js"]').length,0,'GTM injected script serialized');
 assert.equal(doc.querySelectorAll('script[src*="gtag/js?id=G-H7T1HDT2KC"]').length,1);
 for(const script of doc.querySelectorAll('script[type="application/ld+json"]'))JSON.parse(script.textContent);
}
const browser=await chromium.launch({executablePath:`${process.env.LOCALAPPDATA}/ms-playwright/chromium-1217/chrome-win64/chrome.exe`,headless:true});
try{
 const page=await browser.newPage();
 await page.route('**/*',route=>new URL(route.request().url()).origin==='http://127.0.0.1:4173'?route.continue():route.abort());
 for(const width of [320,768,1024]){
  await page.setViewportSize({width,height:900});
  for(const route of ['/','/services/kitchen-cabinets','/services/bathrooms','/contact']){
   await page.goto('http://127.0.0.1:4173'+route,{waitUntil:'domcontentloaded'});await page.locator('main h1').waitFor();
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1),false,`${route} overflow at ${width}`);
  }
 }
 const nojs=await browser.newContext({javaScriptEnabled:false});const staticPage=await nojs.newPage();
 for(const route of paths){await staticPage.goto('http://127.0.0.1:4173'+route);assert.equal(await staticPage.locator('main h1').count(),1,route+' no-JS H1');}
 await writeFile('artifacts/redesign/production-audit.json',JSON.stringify({routes:paths,staticSEO:'passed',trackingBootstrap:'identical to original source; no serialized injected tags',additionalWidths:[320,768,1024],noJavaScriptContent:'all 14 routes have H1'},null,2));
 console.log('PASS: 14 prerendered pages, unique SEO, original tracking bootstrap, 12 extra viewport checks, no-JS content.');
}finally{await browser.close()}
