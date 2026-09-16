import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import {
  GALLERY_SECTIONS,
  galleryProjectsByCategory,
} from "@/data/projects";

export default function Gallery() {
  const sections = GALLERY_SECTIONS.map((section) => ({
    ...section,
    projects: galleryProjectsByCategory(section.label),
  })).filter((section) => section.projects.length);

  return (
    <Layout>
      <SEO
        title="Project Gallery | Home Improvement Club"
        description="Custom homes, multiplex work and renovations across the Fraser Valley and Greater Vancouver. Explore HIC portfolio projects."
        canonical="/gallery"
      />
      <section className="editorial-section gallery-opening">
        <Reveal>
          <p className="eyebrow">Selected work</p>
          <h1>
            Built work,
            <br />
            <em>in place.</em>
          </h1>
          <p className="gallery-opening-lede">
            Custom homes and building design across the Fraser Valley and Greater
            Vancouver. Open a project for the cover, overview, and scope.
          </p>
          {sections.length > 1 ? (
            <nav className="gallery-jump" aria-label="Gallery sections">
              {sections.map((section) => (
                <a key={section.id} href={`#gallery-${section.id}`}>
                  {section.label}
                </a>
              ))}
            </nav>
          ) : null}
        </Reveal>
      </section>

      {sections.map((section) => (
        <section
          key={section.id}
          className="gallery-band"
          aria-labelledby={`gallery-${section.id}`}
        >
          <div className="gallery-band-head editorial-section">
            <p className="eyebrow" id={`gallery-${section.id}`}>
              {section.label}
            </p>
            <p className="gallery-band-count">
              {String(section.projects.length).padStart(2, "0")}
            </p>
          </div>
          <ul className="gallery-mosaic">
            {section.projects.map((project, index) => (
              <li
                key={project.slug}
                className={
                  index === 0 && section.projects.length > 2
                    ? "is-featured"
                    : undefined
                }
              >
                <Reveal>
                  <Link
                    className={`gallery-tile${project.comingSoon ? " is-upcoming" : ""}${project.placeholderImage ? " is-placeholder" : ""}`}
                    to={`/gallery/${project.slug}`}
                  >
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      loading={index < 2 ? "eager" : "lazy"}
                      width={1200}
                      height={900}
                      className={
                        project.placeholderImage
                          ? "is-logo-placeholder"
                          : undefined
                      }
                    />
                    {project.comingSoon ? (
                      <span className="gallery-badge">Upcoming</span>
                    ) : null}
                    <span className="gallery-tile-meta">
                      <span>{project.location}</span>
                      <strong>{project.title}</strong>
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </section>
      ))}

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
