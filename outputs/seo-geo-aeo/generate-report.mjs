import fs from "fs";
import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  Header,
  Footer,
  AlignmentType,
  WidthType,
  BorderStyle,
  ShadingType,
  PageNumber,
  VerticalAlign,
} from "docx";

const NAVY = "1B365D";
const BLUE = "2E5A88";
const GREEN = "1F7A4D";
const AMBER = "B7791F";
const RED = "9B2C2C";
const GRAY = "F3F4F6";
const WHITE = "FFFFFF";

const scores = { seo: 6, geo: 4, aeo: 5 };
const combined = Math.round(((6 + 4 + 5) / 3) * 10) / 10;

function scoreColor(n) {
  if (n >= 8) return GREEN;
  if (n >= 6) return AMBER;
  return RED;
}

function status(n) {
  if (n >= 8) return "Strong";
  if (n >= 6) return "On Track";
  return "Needs Work";
}

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 160, before: opts.before ?? 0 },
    alignment: opts.align,
    children: [
      new TextRun({
        text,
        font: "Arial",
        size: opts.size ?? 22,
        color: opts.color ?? "222222",
        bold: opts.bold,
        italics: opts.italics,
      }),
    ],
  });
}

function h(text, level) {
  const sizes = { 1: 36, 2: 28, 3: 24 };
  return new Paragraph({
    heading: `Heading${level}`,
    spacing: { before: 240, after: 120 },
    children: [
      new TextRun({
        text,
        font: "Arial",
        size: sizes[level],
        bold: true,
        color: NAVY,
      }),
    ],
  });
}

function cell(text, opts = {}) {
  return new TableCell({
    width: { size: opts.w ?? 2000, type: WidthType.DXA },
    shading: { type: ShadingType.CLEAR, fill: opts.fill ?? WHITE },
    verticalAlign: VerticalAlign.CENTER,
    margins: { top: 60, bottom: 60, left: 80, right: 80 },
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            font: "Arial",
            size: opts.size ?? 18,
            bold: opts.bold,
            color: opts.color ?? "222222",
          }),
        ],
      }),
    ],
  });
}

function table(headers, rows, widths) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: widths,
    rows: [
      new TableRow({
        children: headers.map((h, i) =>
          cell(h, { fill: NAVY, color: WHITE, bold: true, w: widths[i] }),
        ),
      }),
      ...rows.map(
        (r, idx) =>
          new TableRow({
            children: r.map((c, i) =>
              cell(String(c), {
                fill: idx % 2 ? GRAY : WHITE,
                w: widths[i],
                bold: i === 0,
              }),
            ),
          }),
      ),
    ],
  });
}

const borders = {
  top: { style: BorderStyle.NONE, size: 0, color: WHITE },
  bottom: { style: BorderStyle.NONE, size: 0, color: WHITE },
  left: { style: BorderStyle.NONE, size: 0, color: WHITE },
  right: { style: BorderStyle.NONE, size: 0, color: WHITE },
};

const coverScore = (label, n) =>
  new TableCell({
    width: { size: 2800, type: WidthType.DXA },
    borders,
    shading: { type: ShadingType.CLEAR, fill: scoreColor(n) },
    margins: { top: 200, bottom: 200, left: 160, right: 160 },
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: label, font: "Arial", size: 20, color: WHITE }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: `${n}/10`,
            font: "Arial",
            size: 40,
            bold: true,
            color: WHITE,
          }),
        ],
      }),
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({
            text: status(n),
            font: "Arial",
            size: 18,
            color: WHITE,
          }),
        ],
      }),
    ],
  });

const doc = new Document({
  creator: "SEO GEO AEO Audit",
  title: "SEO / GEO / AEO Audit — homeimprovementclub.co",
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
  },
  sections: [
    {
      properties: {
        page: { margin: { top: 720, bottom: 720, left: 720, right: 720 } },
      },
      children: [
        new Paragraph({
          spacing: { after: 200 },
          shading: { type: ShadingType.CLEAR, fill: NAVY },
          children: [
            new TextRun({
              text: "  SEO / GEO / AEO FULL AUDIT  ",
              font: "Arial",
              size: 22,
              color: WHITE,
              bold: true,
            }),
          ],
        }),
        p("Home Improvement Club", {
          size: 48,
          bold: true,
          color: NAVY,
          after: 80,
        }),
        p("homeimprovementclub.co", { size: 28, color: BLUE, after: 80 }),
        p("Full crawl · 18 September 2026", { size: 22, color: "555555" }),
        p(
          "Evidence from live rendered pages, raw HTML shell, robots.txt, repo sitemap, and source files in this workspace.",
          { after: 280 },
        ),
        new Table({
          width: { size: 8400, type: WidthType.DXA },
          columnWidths: [2800, 2800, 2800],
          rows: [
            new TableRow({
              children: [
                coverScore("SEO", scores.seo),
                coverScore("GEO", scores.geo),
                coverScore("AEO", scores.aeo),
              ],
            }),
          ],
        }),
        p(`Combined score: ${combined}/10 · Needs Work`, {
          size: 24,
          bold: true,
          after: 80,
          before: 280,
        }),
        p(
          "GEO is the weakest dimension. AI answer systems need a stable entity (who, where, proof) in HTML they can read without executing the SPA. HIC currently puts that identity on the homepage after JavaScript, while inner-route static HTML still ships the homepage title and no street address, sameAs profiles, named people, or FAQ/HowTo schema.",
        ),
      ],
    },
    {
      properties: {
        page: { margin: { top: 900, bottom: 900, left: 720, right: 720 } },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: "homeimprovementclub.co  ·  SEO / GEO / AEO Full Audit  ·  18 Sep 2026",
                  font: "Arial",
                  size: 16,
                  color: BLUE,
                }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: "Page ",
                  font: "Arial",
                  size: 16,
                  color: "666666",
                }),
                new TextRun({
                  children: [PageNumber.CURRENT],
                  font: "Arial",
                  size: 16,
                  color: "666666",
                }),
              ],
            }),
          ],
        }),
      },
      children: [
        h("1. Executive summary", 1),
        p(
          "Home Improvement Club has a clear brand line (“Fraser Valley's Premier Custom Home Builder”), a defined 11-city service area, phone NAP (+1 778-999-8471), unique per-route titles after client render, Service JSON-LD on service URLs, BlogPosting on articles, homepage FAQs, and a numbered process. That is a usable SEO foundation once JavaScript runs.",
        ),
        p(
          "The GEO gap is crawl and entity completeness. Non-JS fetch of inner URLs returned the homepage title only. Live /sitemap.xml returned HTTP 500 (repo public/sitemap.xml is valid and lists core URLs, not individual blog posts). Organization schema has no PostalAddress, geo, image, or sameAs. /about names no people or licenses in text. /testimonials states there are no published stories even though src/data/testimonials.ts holds quotes. One live article author is the Organization name “Developer”.",
        ),
        p(
          "AEO is half-built. Homepage FAQs answer real questions in <details>. Custom-homes page uses question-shaped copy. Process is an ordered list. None of that is marked FAQPage or HowTo. Many H1s are editorial (“A home is personal”) rather than answerable queries.",
        ),

        h("2. Pages audited", 1),
        table(
          ["URL", "Type", "Notes"],
          [
            [
              "https://homeimprovementclub.co/",
              "Home",
              "H1 + FAQs + process; business JSON-LD in index.html",
            ],
            ["/about", "About", "Identity copy; no team; no extra schema"],
            ["/services", "Hub", "Unique title after JS"],
            [
              "/services/custom-homes-multiplex",
              "Service",
              "Service + HomeAndConstructionBusiness JSON-LD; on-page Q&A",
            ],
            [
              "/services/kitchen-cabinets",
              "Service",
              "H1 says “in Vancouver” vs Fraser Valley positioning",
            ],
            ["/how-it-works", "Process", "Four stages; no HowTo schema"],
            [
              "/areas-we-serve",
              "Local",
              "Title starts with lowercase “the Fraser Valley…”",
            ],
            ["/contact", "Lead", "Phone + form; no street address in schema"],
            [
              "/testimonials",
              "Proof",
              "Empty collection; unused TESTIMONIALS data",
            ],
            [
              "/rebates",
              "Resource",
              "External citations to Better Homes BC, BC Hydro, FortisBC",
            ],
            ["/investment-partnerships", "B2B", "Partnership pathways"],
            ["/estimator", "Tool", "Planning figure $150–$700/sqft"],
            ["/gallery", "Portfolio", "Project grid"],
            ["/gallery/m4-building", "Case", "No Project/CreativeWork schema"],
            ["/blog", "Journal", "2 posts live; not listed as URLs in sitemap"],
            [
              "/blog/fraser-valley-custom-home-budget",
              "Article",
              "BlogPosting; author “Developer”",
            ],
            ["/robots.txt", "Technical", "Allow all; sitemap URL declared"],
            [
              "/sitemap.xml",
              "Technical",
              "Live 500; repo file lastmod up to 2026-09-19",
            ],
          ],
          [3600, 1400, 4360],
        ),
        p(
          "Skipped as low signal: /privacy, /admin/blog. /contractors gated by flag.",
          { before: 160 },
        ),

        h("3. SEO analysis", 1),
        h("3.1 Technical on-page", 2),
        p(
          "After JavaScript: unique titles, unique descriptions, canonicals matching the path, viewport, robots “index, follow, max-image-preview:large”, Open Graph + twitter:card summary_large_image. Homepage title is 67 characters (slightly long). Contact title is longer still.",
        ),
        p(
          "Raw HTML (index.html and live inner-route first paint): every path inherits homepage title, description, and canonical https://homeimprovementclub.co/ until Helmet runs. WebFetch of /about, /services, /blog, /gallery, /contact all returned that homepage title. Google may render JS; many GEO crawlers will not.",
        ),
        p(
          "Live sitemap.xml HTTP 500 observed 18 Sep 2026. robots.txt still points to it. Repo sitemap lists services, gallery projects, /blog index, not post slugs.",
        ),
        h("3.2 Content quality", 2),
        p(
          "Service and home copy is specific on geography and project types. Estimator states a rate band. Blog post “How to Read a Custom Home Budget in the Fraser Valley” has useful H2s (floor area, site work, finishes, contingency). Testimonials page is thin by design. Kitchen H1 localizes only Vancouver.",
        ),
        h("3.3 Structured data", 2),
        p(
          "Present: HomeAndConstructionBusiness (static in index.html: name, slogan, url, telephone, areaServed cities). Service on /services/:slug. BlogPosting on posts (headline, datePublished, author, description, image, timeRequired).",
        ),
        p(
          "Not observed: FAQPage, HowTo, BreadcrumbList, Review/AggregateRating, PostalAddress, sameAs, Person, Project/CreativeWork on gallery items. Speakable not present (appropriate to skip until FAQ schema exists).",
        ),

        h("4. GEO analysis", 1),
        p(
          "GEO here means whether Perplexity, ChatGPT Search, Gemini, and AI Overviews can cite HIC as a distinct Fraser Valley custom-home builder with verifiable facts.",
        ),
        h("4.1 E-E-A-T", 2),
        p(
          "Strength: consistent brand name Home Improvement Club / HIC; phone; footer logos alt text WBI Home Warranty, BC Housing, 2-5-10 Year Warranty; rebate page cites official programs.",
        ),
        p(
          "Gap: no named principals, bios, or license numbers in /about. Footer logos are images only. /testimonials: “There are no published client stories in this collection yet.” src/data/testimonials.ts is unused. Article author JSON-LD: Organization name “Developer” on the budget post. No sameAs (Google Business, Instagram, LinkedIn, YouTube). No PostalAddress or geo coordinates in schema.",
        ),
        h("4.2 AI synthesis readiness", 2),
        p(
          "Citable facts exist: 11 cities listed on homepage FAQ “Which cities does HIC serve?”; free consultation; estimator $150 to $700 per square foot as a planning figure not a quote; YouTube embed on custom-homes page. Brand slogan repeats often, which helps entity matching but reads promotional without third-party proof.",
        ),
        h("4.3 Technical GEO", 2),
        p(
          "HTTPS. robots Allow: * including Googlebot and Bingbot. Inner pages depend on client render. Sitemap 500 blocks discovery of new URLs. Blog posts exist but are not in the repo sitemap URL list.",
        ),

        h("5. AEO analysis", 1),
        h("5.1 Featured snippet readiness", 2),
        p(
          "Homepage FAQs use question summaries and direct answers (consultation is free; city list). Process is 01–04 numbered list. Custom-homes Q&A: “Does HIC build both custom homes and multiplex projects?” How-it-works uses stage titles, not “How does HIC build a custom home?”. Many H1s are not query-shaped.",
        ),
        h("5.2 Structured answer formats", 2),
        p(
          "FAQ markup is HTML <details>, not FAQPage JSON-LD. Process is <ol>/<article>, not HowTo. No Speakable. Breadcrumbs in UI on some services; no BreadcrumbList schema.",
        ),
        h("5.3 Voice / local intent", 2),
        p(
          "Strong local city list and “Fraser Valley and Greater Vancouver”. Weak who/where for “Who owns HIC?” and “Where is HIC’s office?” because no people and no street address on-page or in schema.",
        ),

        h("6. Priority recommendations", 1),
        table(
          ["P", "Issue", "Dim", "Effort", "Impact"],
          [
            [
              "1",
              "Fix live sitemap.xml 500; add blog post URLs",
              "SEO/GEO",
              "Low",
              "High",
            ],
            [
              "2",
              "Prerender unique title/description/canonical per route in HTML",
              "GEO",
              "Med",
              "High",
            ],
            [
              "3",
              "Expand HomeAndConstructionBusiness: address, geo, image, sameAs, hasCredential",
              "GEO",
              "Low",
              "High",
            ],
            [
              "4",
              "Add FAQPage on home + custom-homes; HowTo on /how-it-works",
              "AEO",
              "Low",
              "High",
            ],
            [
              "5",
              "Publish real reviews or remove empty /testimonials; never use author Developer",
              "GEO",
              "Med",
              "High",
            ],
            [
              "6",
              "Named leadership + license numbers on /about with Person schema",
              "GEO",
              "Med",
              "Med",
            ],
            [
              "7",
              "Fix kitchen H1 Vancouver-only; fix areas title “the Fraser Valley…”",
              "SEO",
              "Low",
              "Med",
            ],
            [
              "8",
              "Project JSON-LD on gallery items; keep facts (year, city, scope)",
              "GEO",
              "Med",
              "Med",
            ],
          ],
          [600, 4560, 1400, 1200, 1600],
        ),
        h("Recommendation detail", 2),
        p(
          "What: Serve a 200 sitemap that includes /blog/fraser-valley-custom-home-budget and /blog/top-5-high-roi-renovations-for-bc-properties. Where: production static file or generate-sitemap.mjs output path that DigitalOcean actually serves. Why: crawlers use robots Sitemap. Impact: discovery. Effort: Low.",
        ),
        p(
          "What: After prerender, /about HTML <title> must be “About HIC | Custom Homes, Multiplex & Renovations”, not the homepage title. Where: scripts/prerender.mjs + Helmet. Why: AI bots often do not wait for JS. Impact: GEO indexing of inner pages. Effort: Medium.",
        ),
        p(
          "What: Add PostalAddress (or areaServed-only if no public office—then say that in copy), sameAs URLs, logo image. Example FAQPage question: “Which cities does HIC serve?” with the existing answer text. Where: index.html JSON-LD + FAQSection. Effort: Low.",
        ),
        p(
          "What: Change Sanity author from Developer to a real person or “Home Improvement Club”. Where: Studio author field / BlogPost.tsx fallback. Effort: Low.",
        ),

        h("7. What is working", 1),
        p(
          "Positioning string is consistent in title, slogan, and About lead. City list matches SERVICE_CITIES in code and homepage FAQ. Phone is in header, footer, schema, and ContactInfo. Service pages emit Service schema with provider HomeAndConstructionBusiness. Rebates page links official BC sources. Custom-homes page includes real Q&A and a YouTube embed. Blog budget article uses definition-like H2s useful for snippets.",
        ),

        h("8. Limitations", 1),
        p(
          "Core Web Vitals: not measured. Use PageSpeed Insights / Lighthouse.",
        ),
        p(
          "Backlinks and domain authority: not measured. Use Ahrefs, Semrush, or Moz.",
        ),
        p(
          "Rankings and impressions: not measured. Use Google Search Console and Bing Webmaster Tools.",
        ),
        p(
          "Live sitemap 500 may be environment-specific; repo file is well-formed XML.",
        ),
        p(
          "Gallery project authenticity (M4 Building etc.) was not independently verified against third-party sources.",
        ),

        h("9. Glossary", 1),
        p(
          "SEO: ranking in classic Google/Bing results via titles, crawlability, links, and on-page relevance.",
        ),
        p(
          "GEO: being selected and cited by generative engines (AI Overviews, Perplexity, ChatGPT Search, Gemini). Needs extractable facts, entity schema, and HTML that does not require a browser.",
        ),
        p(
          "AEO: winning featured snippets, People Also Ask, and voice answers via direct-answer copy plus FAQPage/HowTo where the page actually has those formats.",
        ),
        p(
          "NAP: name, address, phone. HIC currently has name and phone; address is missing in schema and contact components.",
        ),
        p(
          "sameAs: schema property listing official profiles so engines merge the brand entity.",
        ),
        p(
          "E-E-A-T: experience, expertise, authoritativeness, trust. For a builder this is people, licenses, reviews, and consistent NAP.",
        ),
      ],
    },
  ],
});

const out = new URL(
  "./seo-geo-aeo-audit-homeimprovementclub-co-2026-09-18.docx",
  import.meta.url,
);
const buf = await Packer.toBuffer(doc);
fs.writeFileSync(out, buf);
console.log("Wrote", out.pathname);
