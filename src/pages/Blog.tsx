import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import { blogCoverFor } from "@/lib/blog-covers";
import { formatBlogDate } from "@/lib/blog";
import {
  fetchPublishedPosts,
  sanityConfigured,
  type SanityPostListItem,
} from "@/lib/sanity";

function dateLabel(iso: string) {
  return formatBlogDate(iso.slice(0, 10));
}

function BlogIndexSeo() {
  return (
    <SEO
      title="Journal | Home Improvement Club"
      description="Notes on custom homes, multiplex planning, permits and renovations in the Fraser Valley."
      canonical="/blog"
    />
  );
}

export default function Blog() {
  const [posts, setPosts] = useState<SanityPostListItem[] | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    fetchPublishedPosts()
      .then((rows) => {
        if (!cancelled) setPosts(rows);
      })
      .catch(() => {
        if (!cancelled) setPosts([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const [featured, ...rest] = posts ?? [];

  if (posts === undefined) {
    return (
      <Layout>
        <BlogIndexSeo />
        <section className="editorial-section blog-masthead">
          <p className="eyebrow">Journal</p>
          <div className="blog-masthead-grid">
            <h1>
              Field notes
              <br />
              <em>before drawings lock.</em>
            </h1>
            <div className="blog-skeleton-copy" aria-hidden />
          </div>
        </section>
        <div className="blog-skeleton-hero" aria-hidden />
      </Layout>
    );
  }

  return (
    <Layout>
      <BlogIndexSeo />
      <section className="editorial-section blog-masthead">
        <p className="eyebrow">Journal</p>
        <div className="blog-masthead-grid">
          <Reveal variant="heading">
            <h1>
              Field notes
              <br />
              <em>before drawings lock.</em>
            </h1>
          </Reveal>
          <Reveal variant="copy">
            <p>
              Custom homes, multiplex work and permits across the Fraser Valley.
              Written so you can ask sharper questions before scope hardens.
            </p>
            {posts.length > 0 ? (
              <p className="blog-count">
                <span>{String(posts.length).padStart(2, "0")}</span>
                <em>published</em>
              </p>
            ) : null}
          </Reveal>
        </div>
      </section>

      {featured ? (
        <Link className="blog-hero" to={`/blog/${featured.slug}`}>
          <img
            src={featured.featuredImageUrl || blogCoverFor(featured.category)}
            alt=""
            width={1920}
            height={1080}
            loading="eager"
          />
          <div className="blog-hero-copy">
            <p className="eyebrow">{featured.category}</p>
            <h2>{featured.title}</h2>
            <p>
              {dateLabel(featured.date)}
              <span aria-hidden="true"> · </span>
              {featured.author}
            </p>
          </div>
        </Link>
      ) : null}

      {rest.length > 0 ? (
        <section className="editorial-section blog-ledger">
          {rest.map((post, i) => (
            <article
              key={post._id}
              className={`blog-row${i % 2 === 1 ? " is-flip" : ""}`}
            >
              <Link className="blog-row-media" to={`/blog/${post.slug}`}>
                <img
                  src={post.featuredImageUrl || blogCoverFor(post.category)}
                  alt=""
                  width={900}
                  height={720}
                  loading="lazy"
                />
              </Link>
              <div className="blog-row-copy">
                <span className="blog-row-index">{String(i + 2).padStart(2, "0")}</span>
                <p className="blog-row-kicker">
                  <em>{post.category}</em>
                  <span>{dateLabel(post.date)}</span>
                </p>
                <h2>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p>{post.excerpt}</p>
                <Link className="text-link" to={`/blog/${post.slug}`}>
                  Continue <ArrowUpRight size={18} />
                </Link>
              </div>
            </article>
          ))}
        </section>
      ) : null}

      {posts.length === 0 ? (
        <section className="editorial-section blog-empty">
          <h2>The first essay is still in drawings.</h2>
          <p>
            {sanityConfigured
              ? "Nothing is published yet. When a post goes live in Studio, it lands here."
              : "Connect Sanity in .env, then publish from /admin/blog."}
          </p>
        </section>
      ) : null}

      <section className="editorial-section blog-help">
        <h2>
          Numbers before
          <br />
          <em>drawings?</em>
        </h2>
        <div>
          <p>
            Use the estimator to test floor area against a rate band. Planning
            figure, not a quote.
          </p>
          <Link className="solid-link" to="/estimator">
            Open estimator <ArrowUpRight size={17} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
