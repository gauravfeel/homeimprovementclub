import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { ServiceImage } from "@/components/ServicePrimitives";
import Reveal from "@/components/Reveal";
import interior from "@/assets/lux-lighting.jpg";
export default function About() {
  return (
    <Layout>
      <SEO
        title="About HIC | Custom Homes, Multiplex & Renovations"
        description="Home Improvement Club is a custom home builder and multiplex expert that also delivers renovations across Greater Vancouver and the Fraser Valley."
        canonical="/about"
      />
      <section className="editorial-section about-opening">
        <p className="eyebrow">About Home Improvement Club</p>
        <Reveal variant="heading">
          <h1>
            A home is personal.
            <br />
            <em>So is the starting point.</em>
          </h1>
        </Reveal>
        <Reveal variant="copy" className="about-lead">
          <span className="editorial-signature">HIC / Greater Vancouver · Fraser Valley</span>
          <p>
            Home Improvement Club is a custom home builder and multiplex expert
            serving Greater Vancouver and the Fraser Valley. HIC also renovates
            existing homes, from focused rooms to connected whole-home work.
          </p>
        </Reveal>
      </section>
      <section className="about-editorial">
        <Reveal variant="clip">
          <ServiceImage
            src={interior}
            alt="Interior design inspiration with timber, natural stone and considered lighting"
            caption="A home considered beyond a single room"
            eager
          />
        </Reveal>
        <div>
          <p className="eyebrow">The work we focus on</p>
          <h2>
            Separate decisions.
            <br />
            <em>One home.</em>
          </h2>
          <p>
            A custom home begins with the property and the way people want to
            live. A multiplex adds questions about multiple homes, approvals and
            coordination. A renovation begins with what works and what must change.
          </p>
          <p>
            HIC brings those paths together under one residential construction
            focus. The starting point is a conversation about the property,
            intended outcome, scope and decisions needed to move forward.
          </p>
          <Link className="text-link" to="/services">
            See the work we offer ↗
          </Link>
        </div>
      </section>
      <section className="editorial-section about-perspective">
        <aside>
          <p className="eyebrow">A useful conversation</p>
          <span className="large-editorial-mark" aria-hidden="true">
            “
          </span>
        </aside>
        <div>
          <h2>
            Tell us what you want to build.
            <br />
            <em>Or what needs to change.</em>
          </h2>
          <p>
            You do not need to arrive with every finish selected. For a new
            build, bring the property and intended use. For a renovation, bring
            what is not working and what you want to keep.
          </p>
          <p>
            From there, discuss your priorities, budget and preferred timing.
            The right scope starts with understanding the property, desired
            outcome and decisions already made.
          </p>
        </div>
      </section>
      <section className="editorial-section about-facts">
        <div>
          <p className="eyebrow">At a glance</p>
          <dl>
            <div>
              <dt>Our work</dt>
              <dd>
                Custom homes, multiplex projects, kitchens, bathrooms, lighting,
                flooring, HVAC and electrical upgrades, and exteriors.
              </dd>
            </div>
            <div>
              <dt>Our area</dt>
              <dd>
                Greater Vancouver and the Fraser Valley, including Vancouver,
                the North Shore, Burnaby, New Westminster, Coquitlam,
                Richmond, Surrey, Maple Ridge, Abbotsford and Chilliwack.
              </dd>
            </div>
            <div>
              <dt>Your starting point</dt>
              <dd>
                A project conversation about the property, home and work you
                are considering.
              </dd>
            </div>
          </dl>
        </div>
        <div>
          <h2>
            Let’s start
            <br />
            <em>with your home.</em>
          </h2>
          <p>Tell us where you live and what you would like to change.</p>
          <Link className="solid-link" to="/contact">
            Talk to HIC ↗
          </Link>
        </div>
      </section>
    </Layout>
  );
}
