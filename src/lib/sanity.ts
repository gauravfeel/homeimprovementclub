import { createClient, type SanityClient } from "@sanity/client";
import { createImageUrlBuilder, type SanityImageSource } from "@sanity/image-url";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID?.trim() ?? "";
const dataset = import.meta.env.VITE_SANITY_DATASET?.trim() || "production";
const apiVersion = "2024-01-01";

export const sanityConfigured = Boolean(projectId);

export const sanityClient: SanityClient | null = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
    })
  : null;

const builder = projectId ? createImageUrlBuilder({ projectId, dataset }) : null;

export function urlFor(source: SanityImageSource) {
  if (!builder) return "";
  return builder.image(source).auto("format").fit("max").url();
}

export type SanityPostListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  category: string;
  author: string;
  featuredImageUrl: string | null;
};

export type SanityPost = SanityPostListItem & {
  featuredImageAlt: string;
  seoTitle: string | null;
  seoDescription: string | null;
  ogImageUrl: string | null;
  readingTimeMinutes: number | null;
  body: unknown;
};

const LIST_QUERY = `*[_type == "post" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "date": publishedAt,
  "category": coalesce(category->title, "Notes"),
  "author": coalesce(author->name, "Home Improvement Club"),
  "featuredImageUrl": featuredImage.asset->url
}`;

const DETAIL_QUERY = `*[_type == "post" && slug.current == $slug && defined(publishedAt) && publishedAt <= now()][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "date": publishedAt,
  "category": coalesce(category->title, "Notes"),
  "author": coalesce(author->name, "Home Improvement Club"),
  "featuredImageUrl": featuredImage.asset->url,
  "featuredImageAlt": coalesce(featuredImage.alt, ""),
  seoTitle,
  seoDescription,
  "ogImageUrl": coalesce(ogImage.asset->url, featuredImage.asset->url),
  "readingTimeMinutes": round(length(pt::text(body)) / 900),
  body
}`;

export async function fetchPublishedPosts(): Promise<SanityPostListItem[]> {
  if (!sanityClient) return [];
  try {
    return await sanityClient.fetch(LIST_QUERY, {}, { timeout: 8000 });
  } catch {
    return [];
  }
}

export async function fetchPostBySlug(slug: string): Promise<SanityPost | null> {
  if (!sanityClient) return null;
  try {
    return await sanityClient.fetch(DETAIL_QUERY, { slug }, { timeout: 8000 });
  } catch {
    return null;
  }
}
