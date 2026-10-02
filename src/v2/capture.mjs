import {chromium} from 'playwright';
import {mkdir} from 'node:fs/promises';
const browser=await chromium.launch({executablePath:`${process.env.LOCALAPPDATA}/ms-playwright/chromium-1217/chrome-win64/chrome.exe`,headless:true});
const page=await browser.newPage({viewport:{width:1440,height:1000}});
await page.route('**/*',r=>new URL(r.request().url()).origin==='http://127.0.0.1:5182'?r.continue():r.fulfill({status:204,body:''}));
await page.goto('http://127.0.0.1:5182/v2');await page.locator('[data-v2] h1').waitFor();await page.evaluate(()=>document.fonts.ready);await mkdir('artifacts/v2',{recursive:true});await page.screenshot({path:'artifacts/v2/home-desktop.png',fullPage:true});await page.setViewportSize({width:390,height:844});await page.screenshot({path:'artifacts/v2/home-mobile.png',fullPage:true});console.log(await page.locator('h1').evaluate(e=>({font:getComputedStyle(e).fontSize,width:e.getBoundingClientRect().width})));await browser.close();
