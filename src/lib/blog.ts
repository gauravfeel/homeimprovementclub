import { marked } from "marked";

export type BlogPostFields = {
  slug: string;
  title: string;
  date: string;
  category: string;
  author: string;
  excerpt: string;
  draft: boolean;
  body: string;
};

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

marked.setOptions({ gfm: true, breaks: false });

export function parseBlogMarkdown(slug: string, raw: string): BlogPostFields {
  const match = raw.match(FRONTMATTER);
  if (!match) {
    throw new Error(`Blog post ${slug} needs YAML frontmatter between --- fences.`);
  }
  const fields = Object.fromEntries(
    match[1]
      .split(/\r?\n/)
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const colon = line.indexOf(":");
        if (colon < 1) return ["", ""];
        return [
          line.slice(0, colon).trim(),
          line.slice(colon + 1).trim().replace(/^["']|["']$/g, ""),
        ];
      })
      .filter(([key]) => key),
  );
  return {
    slug,
    title: fields.title ?? slug,
    date: fields.date ?? "",
    category: fields.category ?? "Notes",
    author: fields.author ?? "Home Improvement Club",
    excerpt: fields.excerpt ?? "",
    draft: fields.draft === "true",
    body: match[2].trim(),
  };
}

export function blogHtml(body: string) {
  return marked.parse(body, { async: false }) as string;
}

export function formatBlogDate(iso: string) {
  const date = new Date(`${iso}T12:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat("en-CA", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function slugFromTitle(title: string) {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
