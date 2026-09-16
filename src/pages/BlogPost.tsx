import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import CTASection from "@/components/CTASection";
import BlogPortableText from "@/components/BlogPortableText";
import NotFound from "@/pages/NotFound";
import { blogCoverFor } from "@/lib/blog-covers";
import { formatBlogDate } from "@/lib/blog";
import { fetchPostBySlug, type SanityPost } from "@/lib/sanity";

const SITE = "https://homeimprovementclub.co";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<SanityPost | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) {
      setPost(null);
      return;
    }
    let cancelled = false;
    fetchPostBySlug(slug)
      .then((row) => {
        if (!cancelled) setPost(row);
      })
      .catch(() => {
        if (!cancelled) setPost(null);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  if (post === undefined) {
    return (
      <Layout>
        <div className="blog-skeleton-hero" aria-label="Loading article" />
      </Layout>
    );
  }

  if (post === null) return <NotFound />;

  const cover = post.featuredImageUrl || blogCoverFor(post.category ?? "Notes");
  const coverAlt = post.featuredImageAlt || "";
  const metaTitle = post.seoTitle || `${post.title} | Home Improvement Club`;
  const metaDescription = post.seoDescription || post.excerpt;
  const ogImage = post.ogImageUrl || post.featuredImageUrl || `${SITE}/hic-social.jpg`;
  const dateLabel = post.date ? formatBlogDate(post.date.slice(0, 10)) : "";

  return (
    <Layout>
      <SEO
        title={metaTitle}
        description={metaDescription}
        canonical={`/blog/${post.slug}`}
        ogImage={ogImage.startsWith("http") ? ogImage : `${SITE}${ogImage}`}
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          datePublished: post.date,
          author: {
            "@type": "Organization",
            name: post.author ?? "Home Improvement Club",
          },
          description: post.excerpt,
          image: ogImage,
          timeRequired: post.readingTimeMinutes
            ? `PT${post.readingTimeMinutes}M`
            : undefined,
        }}
      />

      <section className="blog-stage">
        <figure className="blog-stage-media">
          <img src={cover} alt={coverAlt} width={1920} height={1080} loading="eager" />
        </figure>
        <div className="blog-stage-copy">
          <Link className="gallery-back" to="/blog">
            Journal
          </Link>
          <p className="eyebrow">{post.category ?? "Article"}</p>
          <h1>{post.title}</h1>
          {post.excerpt ? <p className="blog-stage-lede">{post.excerpt}</p> : null}
        </div>
      </section>

      <article className="editorial-section blog-dossier">
        <aside className="blog-dossier-meta">
          <dl>
            <div>
              <dt>Published</dt>
              <dd>{dateLabel}</dd>
            </div>
            {post.readingTimeMinutes ? (
              <div>
                <dt>Reading</dt>
                <dd>{post.readingTimeMinutes} min</dd>
              </div>
            ) : null}
            <div>
              <dt>Author</dt>
              <dd>{post.author ?? "Home Improvement Club"}</dd>
            </div>
          </dl>
          <Link className="text-link" to="/blog">
            All notes
          </Link>
        </aside>
        <div className="blog-body">
          <BlogPortableText value={post.body} />
        </div>
      </article>

      <CTASection
        title="Bring the property into the conversation."
        description="An address, a direction and a budget range are enough to start. Drawings help; they are not required."
      />
    </Layout>
  );
}
