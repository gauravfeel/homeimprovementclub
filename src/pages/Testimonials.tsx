import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
export default function Testimonials() {
  return (
    <Layout>
      <SEO
        title="Client Stories | Home Improvement Club"
        description="Homeowner stories at Home Improvement Club. Explore service details and renovation planning information while this collection is being prepared."
        canonical="/testimonials"
      />
      <section className="editorial-section stories-opening">
        <p className="eyebrow">Client stories</p>
        <h1>
          The homeowner’s
          <br />
          <em>point of view.</em>
        </h1>
        <p>
          We are preparing this space for homeowner stories. There are no
          published client stories in this collection yet.
        </p>
        <div className="stories-next">
          <article>
            <span className="eyebrow">Understand the work</span>
            <h2>Explore your renovation.</h2>
            <p>
              Read the planning considerations for the room or project you have
              in mind.
            </p>
            <Link className="text-link" to="/services">
              Browse renovation services ↗
            </Link>
          </article>
          <article>
            <span className="eyebrow">Understand the steps</span>
            <h2>Know what to discuss.</h2>
            <p>
              See how the conversation develops from the first enquiry to the
              final walkthrough.
            </p>
            <Link className="text-link" to="/how-it-works">
              Read about the process ↗
            </Link>
          </article>
        </div>
        <Link className="text-link" to="/contact">
          Have a question for HIC? ↗
        </Link>
      </section>
    </Layout>
  );
}
