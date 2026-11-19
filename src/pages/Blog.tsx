import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import { blogCoverFor } from "@/lib/blog-covers";
import {
  fetchPublishedPosts,
  sanityConfigured,
  type SanityPostListItem,
} from "@/lib/sanity";
import { Button } from "@/components/ui/button";

function BlogIndexSeo() {
  return (
    <SEO
      title="Blog | Home Improvement Club"
      description="Articles on custom homes, multiplex planning, permits and renovations in the Fraser Valley."
      canonical="/blog"
    />
  );
}

export default function Blog() {
  const [posts, setPosts] = useState<SanityPostListItem[] | undefined>(
    undefined,
  );
  const [filter, setFilter] = useState("All");

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

  if (posts === undefined) {
    return (
      <Layout>
        <BlogIndexSeo />
        <section className="editorial-section blog-masthead journal-masthead">
          <p className="eyebrow">Blog</p>
          <div className="blog-masthead-grid">
            <h1>
              Field notes
              <br />
              <em>for better building decisions.</em>
            </h1>
            <div className="blog-skeleton-copy" aria-hidden />
          </div>
        </section>
        <div
          className="editorial-section journal-loading"
          aria-label="Loading articles"
        >
          {[0, 1, 2].map((item) => (
            <div
              className="journal-card-skeleton"
              key={item}
              aria-hidden="true"
            >
              <div />
              <span />
              <span />
              <span />
            </div>
          ))}
        </div>
      </Layout>
    );
  }

  const categories = Array.from(
    new Set(posts.map((p) => p.category).filter(Boolean)),
  );
  const activeFilter =
    filter === "All" || categories.includes(filter) ? filter : "All";
  const visible =
    activeFilter === "All"
      ? posts
      : posts.filter((p) => p.category === activeFilter);

  return (
    <Layout>
      <BlogIndexSeo />
      <section className="editorial-section blog-masthead journal-masthead">
        <p className="eyebrow">Blog</p>
        <div className="blog-masthead-grid">
          <Reveal variant="heading">
            <h1>
              Field notes
              <br />
              <em>for better building decisions.</em>
            </h1>
          </Reveal>
          <Reveal variant="copy">
            <p>
              Practical articles on custom homes, multiplex projects, and
              permits across the Fraser Valley. Ask sharper questions before
              scope hardens.
            </p>
          </Reveal>
        </div>
      </section>

      {categories.length > 1 ? (
        <nav
          className="editorial-section journal-filters"
          aria-label="Filter articles by topic"
        >
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              className={c === activeFilter ? "is-active" : undefined}
              aria-pressed={c === activeFilter}
              onClick={() => setFilter(c)}
            >
              {c}
              <span>
                {c === "All"
                  ? posts.length
                  : posts.filter((p) => p.category === c).length}
              </span>
            </button>
          ))}
        </nav>
      ) : null}

      {visible.length > 0 ? (
        <section className="editorial-section journal-grid">
          {visible.map((post) => (
            <article key={post._id} className="journal-card">
              <Link className="journal-card-link" to={`/blog/${post.slug}`}>
                <span className="journal-card-media">
                  <img
                    src={post.featuredImageUrl || blogCoverFor(post.category)}
                    alt={
                      post.featuredImageUrl
                        ? post.featuredImageAlt || post.title
                        : ""
                    }
                    width={900}
                    height={600}
                    loading="lazy"
                  />
                </span>
                <h2>{post.title}</h2>
                {post.excerpt ? (
                  <p className="journal-excerpt">{post.excerpt}</p>
                ) : null}
              </Link>
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

      <section className="editorial-section blog-help journal-help">
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
          <Button asChild>
            <Link to="/estimator">
              Open estimator <ArrowUpRight size={17} />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
