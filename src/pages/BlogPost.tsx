import { useEffect, useRef, useState, type RefObject } from "react";
import { Link, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import CTASection from "@/components/CTASection";
import EstimatorCta from "@/components/EstimatorCta";
import BlogPortableText, {
  extractHeadings,
  type ArticleHeading,
} from "@/components/BlogPortableText";
import NotFound from "@/pages/NotFound";
import { blogCoverFor } from "@/lib/blog-covers";
import { formatBlogDate } from "@/lib/blog";
import {
  fetchPostBySlug,
  fetchPublishedPosts,
  type SanityPost,
  type SanityPostListItem,
} from "@/lib/sanity";
import { ArrowLeft } from "lucide-react";

const SITE = "https://homeimprovementclub.co";

function ReadingProgress({
  targetRef,
}: {
  targetRef: RefObject<HTMLElement | null>;
}) {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = targetRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight * 0.6;
      const done = Math.min(
        Math.max(-rect.top + window.innerHeight * 0.2, 0),
        Math.max(total, 0),
      );
      setPct(total > 0 ? (done / total) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetRef]);
  return (
    <div className="article-progress" aria-hidden="true">
      <span style={{ transform: `scaleX(${pct / 100})` }} />
    </div>
  );
}

function ArticleToc({ headings }: { headings: ArticleHeading[] }) {
  const [active, setActive] = useState(headings[0]?.id ?? "");
  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((e) => e.isIntersecting);
        if (hit) setActive(hit.target.id);
      },
      { rootMargin: "-15% 0px -70% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [headings]);
  if (headings.length < 3) return null;
  return (
    <nav className="article-toc" aria-label="In this article">
      <p className="article-toc-title">In this article</p>
      <ol>
        {headings.map((h, i) => (
          <li key={h.id} className={active === h.id ? "is-active" : undefined}>
            <a href={`#${h.id}`}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<SanityPost | null | undefined>(undefined);
  const [more, setMore] = useState<SanityPostListItem[]>([]);
  const articleRef = useRef<HTMLElement>(null);

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

  useEffect(() => {
    let cancelled = false;
    fetchPublishedPosts().then((rows) => {
      if (!cancelled) setMore(rows.filter((r) => r.slug !== slug).slice(0, 3));
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
  const authorName =
    !post.author || post.author.trim().toLowerCase() === "developer"
      ? "Home Improvement Club"
      : post.author.trim();
  const metaTitle = post.seoTitle || `${post.title} | Home Improvement Club`;
  const metaDescription = post.seoDescription || post.excerpt;
  const ogImage =
    post.ogImageUrl || post.featuredImageUrl || `${SITE}/hic-social.jpg`;
  const dateLabel = post.date ? formatBlogDate(post.date.slice(0, 10)) : "";
  const headings = extractHeadings(post.body);
  const readMins = post.readingTimeMinutes
    ? Math.max(1, post.readingTimeMinutes)
    : null;

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
            name: authorName,
          },
          publisher: {
            "@type": "Organization",
            name: "Home Improvement Club",
            url: SITE,
            logo: `${SITE}/hic-logo.png`,
          },
          mainEntityOfPage: `${SITE}/blog/${post.slug}`,
          description: post.excerpt,
          image: ogImage,
          timeRequired: post.readingTimeMinutes
            ? `PT${post.readingTimeMinutes}M`
            : undefined,
        }}
      />

      <ReadingProgress targetRef={articleRef} />

      <section className="editorial-section article-masthead">
        <p className="eyebrow">{post.category ?? "Article"}</p>
        <div className="article-masthead-grid">
          <h1>{post.title}</h1>
          {post.excerpt ? <p className="article-lede">{post.excerpt}</p> : null}
        </div>
      </section>

      <figure className="article-cover">
        <img
          src={cover}
          alt={coverAlt}
          width={1920}
          height={1080}
          loading="eager"
        />
      </figure>

      <article className="editorial-section article-layout" ref={articleRef}>
        <aside className="article-rail">
          <dl>
            <div>
              <dt>Published</dt>
              <dd>{dateLabel}</dd>
            </div>
            {readMins ? (
              <div>
                <dt>Reading</dt>
                <dd>{readMins} min</dd>
              </div>
            ) : null}
          </dl>
          <ArticleToc headings={headings} />
          <Link className="text-link" to="/blog">
            <ArrowLeft className="w-3.5 h-3.5" />
            All Blog
          </Link>
        </aside>
        <div className="article-body blog-body">
          <BlogPortableText value={post.body} />
        </div>
      </article>

      {post.slug === "multiplex-planning-fraser-valley" ||
      post.slug === "custom-home-or-major-renovation" ? (
        <section className="editorial-section">
          <EstimatorCta />
        </section>
      ) : null}

      {more.length ? (
        <section className="editorial-section article-more">
          <p className="eyebrow">Keep reading</p>
          <div className="article-more-grid">
            {more.map((m, i) => (
              <Link
                key={m._id}
                to={`/blog/${m.slug}`}
                className="article-more-card"
              >
                <span className="article-more-media">
                  <img
                    src={
                      m.featuredImageUrl || blogCoverFor(m.category ?? "Notes")
                    }
                    alt=""
                    loading="lazy"
                  />
                </span>
                <span className="article-more-meta">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <em>{m.category}</em>
                </span>
                <strong>{m.title}</strong>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      <CTASection
        title="Bring the property into the conversation."
        description="An address, a direction and a budget range are enough to start. Drawings help; they are not required."
      />
    </Layout>
  );
}
