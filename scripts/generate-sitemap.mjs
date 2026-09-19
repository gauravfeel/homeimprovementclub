import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

async function writeFileRetry(path, xml) {
  let lastError;
  for (let attempt = 0; attempt < 8; attempt += 1) {
    try {
      writeFileSync(path, xml, "utf8");
      return;
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }
  throw lastError;
}

const ROOT = process.cwd();
const SITE = "https://homeimprovementclub.co";
const API_VERSION = "2024-01-01";

function loadEnv(key) {
  if (process.env[key]) return process.env[key].trim();
  for (const name of [".env"]) {
    const path = join(ROOT, name);
    if (!existsSync(path)) continue;
    for (const line of readFileSync(path, "utf8").split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq < 1) continue;
      const found = trimmed.slice(0, eq).trim();
      if (found !== key) continue;
      let value = trimmed.slice(eq + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      return value;
    }
  }
  return "";
}

const STATIC = [
  { path: "/", priority: "1.0", lastmod: "2026-08-25" },
  { path: "/services", priority: "0.9", lastmod: "2026-09-11" },
  { path: "/services/custom-homes-multiplex", priority: "0.9", lastmod: "2026-09-11" },
  { path: "/areas-we-serve", priority: "0.8", lastmod: "2026-08-25" },
  { path: "/services/kitchen-cabinets", priority: "0.9", lastmod: "2026-08-25" },
  { path: "/services/bathrooms", priority: "0.9", lastmod: "2026-08-25" },
  { path: "/services/lighting", priority: "0.9", lastmod: "2026-08-25" },
  { path: "/services/flooring", priority: "0.9", lastmod: "2026-08-25" },
  { path: "/services/hvac-electrical", priority: "0.9", lastmod: "2026-08-25" },
  { path: "/services/exterior", priority: "0.9", lastmod: "2026-08-25" },
  { path: "/how-it-works", priority: "0.8", lastmod: "2026-08-25" },
  { path: "/rebates", priority: "0.8", lastmod: "2026-08-25" },
  { path: "/about", priority: "0.7", lastmod: "2026-08-25" },
  { path: "/contact", priority: "0.8", lastmod: "2026-08-25" },
  { path: "/testimonials", priority: "0.6", lastmod: "2026-08-25" },
  { path: "/investment-partnerships", priority: "0.8", lastmod: "2026-09-14" },
  { path: "/estimator", priority: "0.7", lastmod: "2026-09-15" },
  { path: "/gallery", priority: "0.7", lastmod: "2026-09-15" },
  { path: "/gallery/broadway-alma", priority: "0.6", lastmod: "2026-09-15" },
  { path: "/gallery/joyce-2", priority: "0.6", lastmod: "2026-09-15" },
  { path: "/gallery/m4-building", priority: "0.6", lastmod: "2026-09-15" },
  { path: "/gallery/the-grand", priority: "0.6", lastmod: "2026-09-15" },
  { path: "/gallery/the-grand-lion", priority: "0.6", lastmod: "2026-09-15" },
  { path: "/gallery/the-butterfly", priority: "0.6", lastmod: "2026-09-15" },
  { path: "/gallery/custom-home-burnaby", priority: "0.6", lastmod: "2026-09-16" },
  { path: "/gallery/custom-home-project-stevenson", priority: "0.6", lastmod: "2026-09-16" },
  { path: "/gallery/custom-home-delta", priority: "0.6", lastmod: "2026-09-16" },
  { path: "/gallery/project-cloverdale", priority: "0.6", lastmod: "2026-09-16" },
  { path: "/gallery/skyview", priority: "0.5", lastmod: "2026-09-15" },
  { path: "/gallery/satori", priority: "0.5", lastmod: "2026-09-15" },
  { path: "/gallery/photon-control", priority: "0.5", lastmod: "2026-09-15" },
  { path: "/blog", priority: "0.7", lastmod: new Date().toISOString().slice(0, 10) },
];

const BLOG_FALLBACK = [
  { slug: "fraser-valley-custom-home-budget", lastmod: "2026-09-16" },
  { slug: "top-5-high-roi-renovations-for-bc-properties", lastmod: "2026-09-16" },
];

function urlEntry(loc, lastmod, priority) {
  return `  <url><loc>${loc}</loc><lastmod>${lastmod}</lastmod><priority>${priority}</priority></url>`;
}

function formatDay(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return new Date().toISOString().slice(0, 10);
  return date.toISOString().slice(0, 10);
}

async function fetchBlogEntries(projectId, dataset, token) {
  const groq = encodeURIComponent(
    `*[_type == "post" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()]{ "slug": slug.current, "lastmod": coalesce(_updatedAt, publishedAt) }`,
  );
  const url = `https://${projectId}.api.sanity.io/v${API_VERSION}/data/query/${dataset}?query=${groq}`;
  const headers = token ? { Authorization: `Bearer ${token}` } : {};
  try {
    const response = await fetch(url, { headers });
    if (!response.ok) {
      console.warn("Sanity sitemap query failed:", response.status, await response.text());
      return [];
    }
    const json = await response.json();
    return json.result ?? [];
  } catch (error) {
    console.warn("Sanity sitemap query failed:", error?.message || error);
    return [];
  }
}

async function main() {
  const projectId = loadEnv("VITE_SANITY_PROJECT_ID") || loadEnv("SANITY_STUDIO_PROJECT_ID");
  const dataset = loadEnv("VITE_SANITY_DATASET") || loadEnv("SANITY_STUDIO_DATASET") || "production";
  const token = loadEnv("SANITY_API_READ_TOKEN");
  let blogPosts = [];
  if (projectId) {
    blogPosts = await fetchBlogEntries(projectId, dataset, token);
  } else {
    console.warn("No VITE_SANITY_PROJECT_ID; sitemap will use fallback blog URLs.");
  }

  const seen = new Set(blogPosts.map((post) => post.slug));
  for (const fallback of BLOG_FALLBACK) {
    if (!seen.has(fallback.slug)) blogPosts.push(fallback);
  }

  const blogLastmod =
    blogPosts.length > 0
      ? formatDay(
          blogPosts
            .map((p) => p.lastmod)
            .sort()
            .at(-1),
        )
      : STATIC.find((r) => r.path === "/blog")?.lastmod;

  const staticRows = STATIC.map((row) =>
    row.path === "/blog" && blogLastmod ? { ...row, lastmod: blogLastmod } : row,
  );

  const rows = [
    ...staticRows.map((row) =>
      urlEntry(`${SITE}${row.path}`, row.lastmod, row.priority),
    ),
    ...blogPosts.map((post) =>
      urlEntry(`${SITE}/blog/${post.slug}`, formatDay(post.lastmod), "0.6"),
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${rows.join("\n")}\n</urlset>\n`;

  const outPublic = join(ROOT, "public", "sitemap.xml");
  await writeFileRetry(outPublic, xml);
  console.log(`Wrote ${outPublic} (${rows.length} URLs, ${blogPosts.length} blog posts).`);

  const dist = join(ROOT, "dist", "sitemap.xml");
  if (existsSync(join(ROOT, "dist"))) {
    await writeFileRetry(dist, xml);
    console.log(`Wrote ${dist}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
