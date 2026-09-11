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
import residentialExterior from "@/assets/lux-exterior.jpg";
import lighting from "@/assets/lux-lighting.jpg";
import ProjectGallery from "@/components/ProjectGallery";
import Reveal from "@/components/Reveal";
export default function Index() {
  return (
    <Layout>
      <SEO
        title="Custom Home Builder & Multiplex Expert | Home Improvement Club"
        description="HIC builds custom homes, brings multiplex expertise to residential projects, and delivers renovations across Greater Vancouver and the Fraser Valley."
        canonical="/"
      />
      <section className="home-hero">
        <div className="hero-copy">
          <p className="eyebrow">Custom homes · Multiplex · Renovations</p>
          <h1>
            Build what comes
            <br />
            <em>next.</em>
          </h1>
          <p className="hero-description">
            Custom home builder and multiplex expert.
            <br className="desktop-break" /> Renovations for the home you
            already have.
          </p>
          <div className="hero-actions">
            <Link className="solid-link" to="/contact">
              Discuss your project <ArrowUpRight size={18} />
            </Link>
            <a className="text-link" href="#services">
              Explore services <ArrowDown size={16} />
            </a>
          </div>
          <div className="hero-note">
            <span aria-hidden="true" /> Build new. Add homes. Renovate well.
          </div>
        </div>
        <figure className="hero-image">
          <img
            src={residentialExterior}
            alt="Contemporary residential exterior used as custom-home design inspiration"
            width="1920"
            height="1080"
            fetchPriority="high"
          />
          <figcaption>
            <span>Built around the property and the people within it.</span>
            <span>Design inspiration</span>
          </figcaption>
        </figure>
      </section>
      <section className="intro-section editorial-section">
        <p className="eyebrow">Home Improvement Club</p>
        <div>
          <Reveal variant="heading">
            <h2>
              One builder.
              <br />
              <em>More ways to move forward.</em>
            </h2>
          </Reveal>
          <div className="intro-bottom">
            <p>
              HIC builds custom homes, brings multiplex expertise to residential
              projects and continues to deliver renovations. Start with the
              property, the home you want, or the rooms ready to change.
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
            <p className="eyebrow">Build new · Add homes · Renovate</p>
            <h2>
              Start with the
              <br />
              <em>right project path.</em>
            </h2>
          </div>
          <p className="section-copy">
            Plan a custom home or multiplex. Improve one room or the whole home.
            <br />
            Explore the work HIC can help you move forward.
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
