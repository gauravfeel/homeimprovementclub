import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import Reveal from "@/components/Reveal";
import SEO from "@/components/SEO";
import { ServiceImage } from "@/components/ServicePrimitives";
import exterior from "@/assets/lux-exterior.jpg";

const pathways = [
  {
    index: "01",
    title: "Property-owner collaboration",
    copy: "Explore what a residential property could support, from a custom home to a multiplex, before committing to a construction path.",
  },
  {
    index: "02",
    title: "Development partnerships",
    copy: "Discuss aligned opportunities with property owners, builders and project partners where HIC can contribute residential construction expertise.",
  },
  {
    index: "03",
    title: "Project feasibility",
    copy: "Start with the address, intended outcome and available project information so zoning, approvals, consultants and scope can be considered.",
  },
];

export default function InvestmentPartnerships() {
  return (
    <Layout>
      <SEO
        title="Investment & Development Partnerships | HIC BC"
        description="Explore property-owner and residential development partnership opportunities with Home Improvement Club across the Fraser Valley and Greater Vancouver."
        canonical="/investment-partnerships"
      />

      <section className="editorial-section investment-opening">
        <div>
          <p className="eyebrow">Investment & partnerships</p>
          <Reveal variant="heading">
            <h1>
              Build value from
              <br />
              <em>the right property.</em>
            </h1>
          </Reveal>
        </div>
        <Reveal variant="copy">
          <p>
            HIC welcomes conversations with property owners and development
            partners exploring custom homes, multiplex projects and residential
            opportunities across the Fraser Valley and Greater Vancouver.
          </p>
          <Link className="solid-link" to="/contact?service=investment-partnerships">
            Start a conversation <ArrowUpRight size={17} />
          </Link>
        </Reveal>
      </section>

      <section className="investment-feature">
        <Reveal variant="clip">
          <ServiceImage
            src={exterior}
            alt="Contemporary residential development exterior"
            caption="Residential development begins with property potential"
            eager
          />
        </Reveal>
        <div>
          <p className="eyebrow">A considered starting point</p>
          <h2>
            Feasibility before
            <br />
            <em>assumptions.</em>
          </h2>
          <p>
            Every opportunity begins with different land, municipal rules,
            ownership goals and timing. HIC starts by understanding those facts
            and identifying questions that need professional review.
          </p>
        </div>
      </section>

      <section className="editorial-section partnership-pathways">
        <div className="partnership-heading">
          <p className="eyebrow">Ways to explore</p>
          <h2>
            Bring the property.
            <br />
            <em>Shape the opportunity.</em>
          </h2>
        </div>
        <div className="partnership-list">
          {pathways.map((pathway) => (
            <article key={pathway.index}>
              <span className="index-label">{pathway.index}</span>
              <div>
                <h3>{pathway.title}</h3>
                <p>{pathway.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="investment-brief">
        <div className="editorial-section">
          <div>
            <p className="eyebrow">What to bring</p>
            <h2>
              Better information.
              <br />
              <em>Better first conversation.</em>
            </h2>
          </div>
          <ul>
            <li>Property address and current ownership context</li>
            <li>Intended project type and outcome</li>
            <li>Available surveys, plans or feasibility work</li>
            <li>Timing, budget or capital context</li>
            <li>Preferred role in the project</li>
          </ul>
        </div>
      </section>

      <section className="investment-contact">
        <div className="investment-contact-inner">
          <div className="investment-contact-heading">
            <p className="eyebrow">Explore fit</p>
            <span className="investment-contact-index" aria-hidden="true">
              04 / Begin
            </span>
            <h2>
              Have a property or
              <br />
              <em>partnership in mind?</em>
            </h2>
          </div>
          <div className="investment-contact-action">
            <p>
              Share the address, opportunity and role you have in mind. HIC
              will review the starting information before arranging a focused
              conversation.
            </p>
            <Link className="solid-link" to="/contact?service=investment-partnerships">
              Start the conversation <ArrowUpRight size={17} />
            </Link>
          </div>
          <aside className="investment-disclaimer">
            <span>Important note</span>
            <p>
              Initial conversations remain exploratory and subject to project,
              legal, financial and municipal review. This page is general
              information—not an offer of securities, financial advice or a
              promise of investment returns.
            </p>
          </aside>
        </div>
      </section>
    </Layout>
  );
}
