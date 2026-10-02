import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
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
        <div className="mt-8 flex flex-wrap items-center gap-[22px]">
          <Button asChild>
            <Link to="/">
              Return home <ArrowUpRight size={18} />
            </Link>
          </Button>
          <Button variant="link" asChild>
            <Link to="/services">
              Explore services <ArrowUpRight size={18} />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
