import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import { GALLERY_PROJECTS } from "@/data/projects";

export default function Gallery() {
  return (
    <Layout>
      <SEO
        title="Portfolio | Home Improvement Club"
        description="Custom homes, multiplex work and renovations across the Fraser Valley and Greater Vancouver. Explore HIC portfolio projects."
        canonical="/gallery"
      />
      <section className="editorial-section gallery-opening">
        <Reveal>
          <p className="eyebrow">Portfolio</p>
          <h1>
            Built work,
            <br />
            <em>in place.</em>
          </h1>
          <p className="gallery-opening-lede">
            Custom homes and finishing & carpentry across the Fraser Valley and Greater
            Vancouver. Open a project for the cover, overview, and scope.
          </p>
        </Reveal>
      </section>

      <section className="gallery-band editorial-section" aria-label="Portfolio projects">
        <ul className="gallery-grid">
          {GALLERY_PROJECTS.map((project, index) => (
            <li key={project.slug}>
              <Link
                className={`gallery-card${project.comingSoon ? " is-upcoming" : ""}${project.placeholderImage ? " is-placeholder" : ""}`}
                to={`/gallery/${project.slug}`}
              >
                <span className="gallery-card-media">
                  <img
                    src={project.image}
                    alt={project.imageAlt}
                    loading={index < 3 ? "eager" : "lazy"}
                    width={1200}
                    height={900}
                    className={
                      project.placeholderImage
                        ? "is-logo-placeholder"
                        : undefined
                    }
                  />
                  <span className="gallery-badge">{project.category}</span>
                  <span className="gallery-card-meta">
                    <span>{project.location}</span>
                    <strong>{project.title}</strong>
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="editorial-section gallery-help">
        <Reveal>
          <p className="eyebrow">Planning yours</p>
          <div className="gallery-help-grid">
            <h2>
              Bring the property.
              <br />
              <em>We map the path.</em>
            </h2>
            <div>
              <p>
                Custom home, multiplex, or renovation. Start with the address,
                intended use, and budget context.
              </p>
              <Link className="solid-link" to="/contact">
                Book a consultation <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
}
