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
        title="About Home Improvement Club | Greater Vancouver Renovations"
        description="Home Improvement Club brings kitchen, bathroom and home renovation services together for Greater Vancouver homeowners. Learn about HIC’s focus."
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
          <span className="editorial-signature">HIC / Greater Vancouver</span>
          <p>
            Home Improvement Club is a home-renovation business serving Greater
            Vancouver. Our focus is the home you already have: the rooms you use
            every day, the details that no longer work and the changes worth
            thinking through.
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
            A new kitchen affects the lighting around it. A bathroom renovation
            raises questions about tile, ventilation and storage. Exterior
            changes can connect to the way you use your outdoor space.
          </p>
          <p>
            HIC brings these renovation services together. The starting point is
            a conversation about what you need from the space, followed by the
            scope and decisions involved in making those changes.
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
            Tell us what is not working.
            <br />
            <em>And what you would like to keep.</em>
          </h2>
          <p>
            You do not need to arrive with every finish selected. A clear
            account of daily life in your home—where it feels cramped, what you
            cannot store, which rooms you avoid—is a useful brief.
          </p>
          <p>
            From there, discuss your priorities, budget and preferred timing.
            The right scope starts with understanding the existing home, rather
            than assuming every part of it needs to change.
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
                Kitchens, bathrooms, lighting, tile and flooring, HVAC and
                electrical upgrades, and exteriors.
              </dd>
            </div>
            <div>
              <dt>Our area</dt>
              <dd>
                Greater Vancouver, including the North Shore, Burnaby, New
                Westminster, Coquitlam, Richmond and Surrey.
              </dd>
            </div>
            <div>
              <dt>Your starting point</dt>
              <dd>
                A free renovation consultation about your home and the work you
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
