import { chromium } from "playwright";
import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
const origin = process.env.QA_ORIGIN || "http://127.0.0.1:5173";
const browser = await chromium.launch({
  executablePath: `${process.env.LOCALAPPDATA}/ms-playwright/chromium-1217/chrome-win64/chrome.exe`,
  headless: true,
});
const reports = [];
const routes = [
  "/",
  "/services",
  "/services/kitchen-cabinets",
  "/services/bathrooms",
  "/services/lighting",
  "/services/flooring",
  "/services/hvac-electrical",
  "/services/exterior",
  "/contact",
  "/about",
  "/how-it-works",
  "/areas-we-serve",
  "/testimonials",
  "/rebates",
];
await mkdir("artifacts/redesign", { recursive: true });
const context = await browser.newContext();
// No test enquiries or measurement leave the browser. Form responses are mocked below.
await context.route("**/*", (route) =>
  new URL(route.request().url()).origin === origin
    ? route.continue()
    : route.abort(),
);
try {
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    for (const path of routes) {
      await page.goto(origin + path, { waitUntil: "domcontentloaded" });
      await page.waitForFunction(
        (path) =>
          document
            .querySelector('link[rel="canonical"][data-rh="true"]')
            ?.getAttribute("href") ===
          "https://homeimprovementclub.co" + path,
        path,
      );
      await page.locator("main h1").waitFor();
      const facts = await page.evaluate(() => ({
        h1: document.querySelectorAll("main h1").length,
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        title: document.title,
        description: document.querySelector('meta[name="description"]')
          ?.content,
        canonicalCount: document.querySelectorAll('link[rel="canonical"]')
          .length,
        links: [...document.querySelectorAll("a[href]")].map((a) =>
          a.getAttribute("href"),
        ),
      }));
      assert.equal(facts.h1, 1, path + " H1");
      assert.equal(facts.overflow, false, `${path} overflow at ${width}`);
      assert.ok(facts.description, path + " description");
      assert.equal(facts.canonicalCount, 1, path + " unique canonical");
      for (const href of facts.links) {
        if (href.startsWith("/"))
          assert.ok(
            routes.includes(href.split(/[?#]/)[0]),
            `${path} broken internal link ${href}`,
          );
        assert.ok(href !== "#", path + " dead anchor");
      }
      await page.locator("footer").scrollIntoViewIfNeeded();
      await page.evaluate(() => {
        for (const img of document.images) img.loading = "eager";
      });
      await page.waitForFunction(() =>
        [...document.images].every((i) => i.complete),
      );
      assert.equal(
        await page.evaluate(
          () => [...document.images].filter((i) => !i.naturalWidth).length,
        ),
        0,
        path + " broken image",
      );
      reports.push({ path, width, ...facts, links: undefined });
    }
  }
  await page.goto(origin + "/");
  await page.getByRole("button", { name: "Open menu" }).click();
  assert.equal(
    await page
      .getByRole("button", { name: "Close menu" })
      .getAttribute("aria-expanded"),
    "true",
  );
  await page.keyboard.press("Escape");
  assert.equal(
    await page
      .getByRole("button", { name: "Open menu" })
      .getAttribute("aria-expanded"),
    "false",
  );
  await page.getByRole("button", { name: "Open menu" }).click();
  await page
    .locator("#mobile-navigation")
    .getByRole("link", { name: "Bathrooms", exact: true })
    .click();
  await page.getByRole("link", { name: "Plan my bathroom" }).first().click();
  assert.equal(
    await page.locator("#contact-project").inputValue(),
    "Full Bathroom Renovations",
  );
  assert.equal(await page.evaluate(() => scrollY), 0);
  await page.goto(origin + "/services/lighting");
  await page.getByRole("button", { name: "Task", exact: true }).click();
  assert.equal(await page.getByRole("button", { name: "Task", exact: true }).getAttribute("aria-pressed"), "true");
  await page.getByRole("heading", { name: "Light where life happens." }).waitFor();
  await page.goto(origin + "/areas-we-serve");
  await page.getByRole("link", { name: "Discuss a renovation in Richmond", exact: true }).click();
  assert.equal(await page.locator("#contact-city").inputValue(), "Richmond");
  await page.goto(origin + "/contact?service=kitchen-cabinets");
  await page.locator("#contact-project").waitFor();
  assert.equal(
    await page.locator("#contact-project").inputValue(),
    "Kitchen & Cabinet Renovations",
  );
  await page
    .getByRole("button", { name: "Request my free consultation" })
    .click();
  assert.equal(
    await page.evaluate(
      () => window.dataLayer.filter((e) => e.event === "generate_lead").length,
    ),
    0,
    "invalid form must not convert",
  );
  let submissions = 0;
  await page.route("https://formspree.io/f/**", (route) => {
    submissions++;
    return route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ errors: [{ message: "Test failure" }] }),
    });
  });
  await page.locator("#contact-firstName").fill("QA");
  await page.locator("#contact-email").fill("qa@example.com");
  await page
    .getByRole("button", { name: "Request my free consultation" })
    .click();
  await page
    .getByText("Something went wrong", { exact: true })
    .first()
    .waitFor();
  assert.equal(
    await page.evaluate(
      () => window.dataLayer.filter((e) => e.event === "generate_lead").length,
    ),
    0,
    "failed form must not convert",
  );
  await page.unroute("https://formspree.io/f/**");
  await page.route("https://formspree.io/f/**", (route) => {
    submissions++;
    return route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, next: "/thanks" }),
    });
  });
  await page
    .getByRole("button", { name: "Request my free consultation" })
    .click();
  await page.getByText("Your enquiry is on its way.").waitFor();
  assert.deepEqual(
    await page.evaluate(() =>
      window.dataLayer.filter((e) => e.event === "generate_lead"),
    ),
    [
      {
        event: "generate_lead",
        lead_type: "consultation_form",
        form_location: "contact_page",
      },
    ],
  );
  await page.getByRole("button", { name: "Send another message" }).click();
  await page.locator("#contact-firstName").fill("QA");
  await page.locator("#contact-email").fill("qa@example.com");
  await page
    .getByRole("button", { name: "Request my free consultation" })
    .click();
  await page.getByText("Your enquiry is on its way.").waitFor();
  assert.equal(
    await page.evaluate(
      () => window.dataLayer.filter((e) => e.event === "generate_lead").length,
    ),
    2,
    "one event per successful submission",
  );
  await page.getByRole("button", { name: "Prefer a short enquiry?" }).click();
  await page.locator("#popup-first-name").fill("QA");
  await page.locator("#popup-email").fill("qa@example.com");
  await page.unroute("https://formspree.io/f/**");
  await page.route("https://formspree.io/f/**", (route) =>
    route.fulfill({ status: 500, contentType: "application/json", body: "{}" }),
  );
  await page
    .getByRole("button", { name: "Request my consultation", exact: true })
    .click();
  await page
    .getByText("Please try again or email homeimprovementclub.co@gmail.com")
    .waitFor();
  assert.equal(
    await page.evaluate(
      () =>
        window.dataLayer.filter((e) => e.form_location === "lead_popup").length,
    ),
    0,
  );
  await page.unroute("https://formspree.io/f/**");
  await page.route("https://formspree.io/f/**", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: '{"ok":true}',
    }),
  );
  await page
    .getByRole("button", { name: "Request my consultation", exact: true })
    .click();
  await page
    .getByText("We’ll be in touch to discuss your renovation.")
    .waitFor();
  assert.equal(
    await page.evaluate(
      () =>
        window.dataLayer.filter(
          (e) =>
            e.event === "generate_lead" && e.form_location === "lead_popup",
        ).length,
    ),
    1,
  );
  await page
    .getByRole("button", { name: "Close", exact: true })
    .first()
    .click();
  // Cancel link default actions while exercising real React click handlers.
  await page.evaluate(() =>
    document.addEventListener("click", (e) => {
      if (e.target.closest('a[href^="tel:"],a[href*="wa.me"]'))
        e.preventDefault();
    }),
  );
  await page.locator('a[href^="tel:"]').first().click();
  await page.locator('a[href*="wa.me"]').first().click();
  assert.equal(
    await page.evaluate(
      () => window.dataLayer.filter((e) => e.event === "phone_click").length,
    ),
    1,
  );
  assert.equal(
    await page.evaluate(
      () => window.dataLayer.filter((e) => e.event === "whatsapp_click").length,
    ),
    1,
  );
  assert.equal(errors.length, 0, errors.join("\n"));
  await writeFile(
    "artifacts/redesign/qa-results.json",
    JSON.stringify(
      {
        origin,
        routes: reports,
        checks: [
          "mobile menu and Escape",
          "service preselection",
          "route scroll reset",
          "invalid form: no lead",
          "failed contact and popup: no lead",
          "successful contact and popup: exactly one lead",
          "second submission: new lead",
          "phone click",
          "WhatsApp click",
          "no runtime errors",
          "lighting layer selector",
          "city enquiry preselection",
        ],
        mockedContactSubmissions: submissions,
      },
      null,
      2,
    ),
  );
  console.log(
    `PASS: ${reports.length} route/viewport checks; navigation, forms and conversion events. No external test submissions.`,
  );
} finally {
  await browser.close();
}
