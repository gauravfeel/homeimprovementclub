import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
export default function NotFound() {
  return (
    <Layout>
      <Helmet>
        <title>Page Not Found | Home Improvement Club</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <section className="editorial-section page-intro">
        <p className="eyebrow">404 · Page not found</p>
        <h1>
          Let’s get you
          <br />
          <em>back home.</em>
        </h1>
        <p>
          This page is not available. Explore our renovation services or start a
          conversation about your home.
        </p>
        <div className="hero-actions">
          <Link className="solid-link" to="/">
            Return home ↗
          </Link>
          <Link className="text-link" to="/services">
            Explore services ↗
          </Link>
        </div>
      </section>
    </Layout>
  );
}
