import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";
import {
  AreaSection,
  FAQSection,
  ProcessSection,
  ServiceCollection,
} from "@/components/RenovationSections";
import kitchen from "@/assets/lux-kitchen.jpg";
import lighting from "@/assets/lux-lighting.jpg";
import ProjectGallery from "@/components/ProjectGallery";
import Reveal from "@/components/Reveal";
export default function Index() {
  return (
    <Layout>
      <SEO
        title="Home Renovations in Greater Vancouver | Home Improvement Club"
        description="Kitchen, bathroom and home renovations across Greater Vancouver. Explore your options with Home Improvement Club. Book a free renovation consultation."
        canonical="/"
      />
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">Home renovations · Greater Vancouver, BC</p>
          <h1>
            A home that feels
            <br />
            <em>more like you.</em>
          </h1>
          <p className="hero-description">
            Thoughtful renovations for the way you live.
            <br className="desktop-break" /> Kitchens, bathrooms and the spaces
            in between.
          </p>
          <div className="hero-actions">
            <Link className="solid-link" to="/contact">
              Book a free consultation <ArrowUpRight size={18} />
            </Link>
            <a className="text-link" href="#services">
              Explore services <ArrowDown size={16} />
            </a>
          </div>
          <div className="hero-note">
            <span aria-hidden="true" /> Your home. Your next chapter.
          </div>
        </div>
        <figure className="hero-image">
          <img
            src={kitchen}
            alt="Kitchen design inspiration with pale wood cabinetry, stone island and brass pendants"
            width="1920"
            height="1080"
            fetchPriority="high"
          />
          <figcaption>
            <span>Spaces to gather. Details to live with.</span>
            <span>Design inspiration</span>
          </figcaption>
        </figure>
      </section>
      <section className="intro-section editorial-section">
        <p className="eyebrow">Home Improvement Club</p>
        <div>
          <Reveal variant="heading">
            <h2>
              Keep what you love.
              <br />
              <em>Rethink what could be.</em>
            </h2>
          </Reveal>
          <div className="intro-bottom">
            <p>
              A home evolves with the people in it. HIC brings kitchen, bathroom
              and home renovation services together, helping you think through
              the work as a whole—from the layout to the finishing details.
            </p>
            <Link className="text-link" to="/about">
              Meet HIC <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="editorial-section services-section" id="services">
        <div className="section-heading-row">
          <div>
            <p className="eyebrow">Room for something better</p>
            <h2>
              The spaces that
              <br />
              <em>make a home.</em>
            </h2>
          </div>
          <p className="section-copy">
            Start with one room. Think about the whole home.
            <br />
            Explore the work we can help you plan.
          </p>
        </div>
        <ServiceCollection />
      </section>
      <section className="detail-story">
        <figure>
          <img
            src={lighting}
            alt="Living room lighting inspiration with warm architectural light and natural materials"
            loading="lazy"
            width="1920"
            height="1080"
          />
          <figcaption>
            Design inspiration · Light, texture and proportion
          </figcaption>
        </figure>
        <div>
          <p className="eyebrow">The details matter</p>
          <h2>
            Beautiful is how it looks.
            <br />
            <em>Better is how it lives.</em>
          </h2>
          <p>
            A place for the things you use. Light where you need it. Materials
            that suit your routine. The most useful renovation conversations
            start with your everyday life.
          </p>
          <Link className="text-link" to="/contact">
            Tell us what matters to you <ArrowUpRight size={18} />
          </Link>
        </div>
      </section>
      <ProcessSection />
      <ProjectGallery />
      <AreaSection />
      <FAQSection />
      <CTASection />
    </Layout>
  );
}
