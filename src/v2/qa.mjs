import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
const origin=process.env.QA_ORIGIN||'http://127.0.0.1:5182';
const services=['custom-homes-multiplex','kitchen-cabinets','bathrooms','lighting','flooring','hvac-electrical','exterior'];
const projects=['broadway-alma','joyce-2','m4-building','the-grand','the-grand-lion','the-butterfly','custom-home-burnaby','custom-home-project-stevenson','custom-home-delta','project-cloverdale','skyview','satori','photon-control'];
const routes=['','how-it-works','services',...services.map(s=>'services/'+s),'areas-we-serve','about','contact','testimonials','rebates','investment-partnerships','privacy','estimator','blog','blog/missing','gallery',...projects.map(s=>'gallery/'+s),'404','unknown'];
const browser=await chromium.launch({executablePath:`${process.env.LOCALAPPDATA}/ms-playwright/chromium-1217/chrome-win64/chrome.exe`,headless:true});
const context=await browser.newContext({reducedMotion:'reduce'});
// Never send review traffic to analytics or real lead integrations.
await context.route('**/*',r=>new URL(r.request().url()).origin===origin?r.continue():r.fulfill({status:200,contentType:'application/json',body:JSON.stringify({result:[]})}));
const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
const results=[];await mkdir('artifacts/v2',{recursive:true});
try{
for(const width of [390,768,1440]){
 await page.setViewportSize({width,height:900});
 for(const path of routes){
  await page.goto(`${origin}/v2/${path}`,{waitUntil:'domcontentloaded'});await page.locator('[data-v2] h1').waitFor();await page.evaluate(()=>document.fonts.ready);
  const facts=await page.evaluate(()=>({h1:document.querySelectorAll('main h1').length,overflow:document.documentElement.scrollWidth>innerWidth+1,robots:[...document.querySelectorAll('meta[name="robots"]')].map(e=>e.content),links:[...document.querySelectorAll('[data-v2] a[href]')].map(e=>e.getAttribute('href')),outside:[...document.querySelectorAll('[data-v2] *')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>innerWidth+1}).slice(0,5).map(e=>e.tagName+':'+e.className)}));
  assert.equal(facts.h1,1,`${path} h1`);assert.equal(facts.overflow,false,`${path}@${width} overflow ${facts.outside}`);assert(facts.robots.length&&facts.robots.every(s=>s==='noindex, nofollow'),`${path}: robots ${facts.robots}`);
  for(const link of facts.links)if(link.startsWith('/')&&!link.startsWith('//'))assert(/^\/v2(?:\/|\?|#|$)/.test(link),`${path} escapes V2: ${link}`);
  results.push({path:'/v2/'+path,width,passed:true});
  if(['','services','services/custom-homes-multiplex','services/kitchen-cabinets','contact','gallery','gallery/custom-home-delta','estimator','about','how-it-works','privacy'].includes(path))await page.screenshot({path:`artifacts/v2/${path.replaceAll('/','-')||'home'}-${width}.png`,fullPage:true});
 }
 console.log(`Routes passed at ${width}px`);
}
await page.setViewportSize({width:390,height:844});await page.goto(origin+'/v2');await page.getByRole('button',{name:'Open menu'}).click();assert.equal(await page.getByRole('navigation',{name:'Mobile navigation'}).isVisible(),true);await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'Our work'}).focus();await page.keyboard.press('Escape');assert.equal(await page.getByRole('button',{name:'Open menu'}).getAttribute('aria-expanded'),'false');assert.equal(await page.getByRole('button',{name:'Open menu'}).evaluate(e=>e===document.activeElement),true);
await page.goto(origin+'/v2/gallery');await page.getByRole('button',{name:'Custom homes',exact:true}).click();assert.equal(await page.locator('main article').count(),4);await page.getByRole('button',{name:'Upcoming',exact:true}).click();assert.equal(await page.locator('main article').count(),3);
await page.goto(origin+'/v2/estimator');await page.locator('#v2-area').fill('3000');await page.locator('#v2-rate').fill('300');assert.match(await page.getByRole('status').innerText(),/900,000/);await page.getByRole('link',{name:'Discuss this estimate'}).click();await page.locator('#v2-message').waitFor();assert.match(await page.locator('#v2-message').inputValue(),/900000/);
await page.goto(origin+'/v2/contact?service=bathrooms&city=Surrey');await page.locator('#v2-city').waitFor();assert.equal(await page.locator('#v2-city').inputValue(),'Surrey');assert.match(await page.locator('#v2-projectType').inputValue(),/Bathroom/);
await page.getByRole('button',{name:'Request my free consultation'}).click();assert(await page.getByRole('alert').count()>=6);assert.equal(await page.locator('#v2-firstName').evaluate(e=>e===document.activeElement),true);
await page.locator('#v2-firstName').fill('QA');await page.locator('#v2-email').fill('qa@example.com');await page.locator('#v2-phone').fill('6045550100');await page.locator('#v2-propertyAddress').fill('123 Test Street');await page.locator('#v2-bestContactTime').selectOption('Morning');await page.locator('#v2-budget').fill('50000');
let payload;await page.route('**/api/lead',r=>{payload=r.request().postDataJSON();return r.fulfill({status:500,body:'{}'})});await page.getByRole('button',{name:'Request my free consultation'}).click();await page.getByText('We couldn’t send your enquiry.',{exact:false}).waitFor();assert.equal(await page.locator('#v2-firstName').inputValue(),'QA');
await page.unroute('**/api/lead');await page.route('**/api/lead',r=>{payload=r.request().postDataJSON();return r.fulfill({status:200,body:'{"ok":true}'})});await page.getByRole('button',{name:'Request my free consultation'}).click();await page.getByText('Your enquiry is on its way.').waitFor();assert.equal(payload.source,'contact_page');assert.equal(payload.budget,'50000');const events=await page.evaluate(()=>window.dataLayer.map(x=>Array.from(x)));assert(events.some(x=>x[1]==='generate_lead'));assert(events.some(x=>x[1]==='conversion'));
await page.goto(origin+'/v2/admin/blog');await page.waitForTimeout(3000);assert((await page.locator('meta[name="robots"]').evaluateAll(nodes=>nodes.map(n=>n.content))).every(r=>r==='noindex, nofollow'));
// Existing production routes must retain their own headings, links and indexability.
for(const path of ['/','/services','/contact','/estimator','/gallery','/blog','/about']){await page.goto(origin+path);await page.locator('main h1').waitFor();assert.equal(await page.locator('[data-v2]').count(),0);assert(!(await page.locator('meta[name="robots"]').evaluateAll(nodes=>nodes.map(n=>n.content))).includes('noindex, nofollow'));}
assert.deepEqual(errors,[]);await writeFile('artifacts/v2/qa-results.json',JSON.stringify({routes:results,interactions:['mobile menu + Escape focus','gallery filters','estimator math + inquiry carryover','contact prefill + validation + failure + success','conversion events','admin noindex','production smoke'],errors},null,2));console.log(`PASS: ${results.length} responsive route checks, interactions and production smoke checks`);
}finally{await browser.close()}
