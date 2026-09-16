import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import {
  getGalleryProject,
  GALLERY_PROJECTS,
  youtubeEmbedUrl,
} from "@/data/projects";
import { SERVICES } from "@/data/services";

export default function GalleryProject() {
  const { slug } = useParams();
  const project = slug ? getGalleryProject(slug) : undefined;

  if (!project) {
    return <Navigate to="/gallery" replace />;
  }

  const service = SERVICES.find((item) => item.slug === project.serviceSlug);
  const sameCategory = GALLERY_PROJECTS.filter(
    (item) => item.slug !== project.slug && item.category === project.category,
  );
  const related = (
    sameCategory.length
      ? sameCategory
      : GALLERY_PROJECTS.filter((item) => item.slug !== project.slug)
  ).slice(0, 3);
  const embed = project.youtubeUrl
    ? youtubeEmbedUrl(project.youtubeUrl)
    : null;

  return (
    <Layout>
      <SEO
        title={`${project.title} | Project Gallery | Home Improvement Club`}
        description={project.teaser}
        canonical={`/gallery/${project.slug}`}
        ogImage={project.placeholderImage ? undefined : project.image}
      />

      <section className="gallery-project-stage">
        <figure
          className={`gallery-project-stage-media${project.placeholderImage ? " is-placeholder" : ""}`}
        >
          <img
            src={project.image}
            alt={project.imageAlt}
            width={1920}
            height={1080}
            className={project.placeholderImage ? "is-logo-placeholder" : undefined}
          />
        </figure>
        <div className="gallery-project-stage-copy">
          <Link className="gallery-back" to="/gallery">
            Gallery
          </Link>
          <p className="eyebrow">{project.category}</p>
          <h1>{project.title}</h1>
          <p className="gallery-project-location">{project.location}</p>
          {project.comingSoon ? (
            <p className="gallery-coming-soon-note">Upcoming project</p>
          ) : null}
        </div>
      </section>

      <section className="editorial-section gallery-project-dossier">
        <Reveal>
          <div className="gallery-project-dossier-grid">
            <div>
              <h2>Overview</h2>
              {project.overview.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
              {project.beforeImage ? (
                <figure className="gallery-before">
                  <img
                    src={project.beforeImage}
                    alt={project.beforeAlt || `${project.title} before`}
                    loading="lazy"
                  />
                  <figcaption>Before</figcaption>
                </figure>
              ) : null}
            </div>
            <dl className="gallery-spec">
              <div>
                <dt>Scope</dt>
                <dd>{project.scope}</dd>
              </div>
              {project.year ? (
                <div>
                  <dt>Year</dt>
                  <dd>{project.year}</dd>
                </div>
              ) : null}
              {project.workCompleted?.length ? (
                <div>
                  <dt>Work completed</dt>
                  <dd>
                    <ul>
                      {project.workCompleted.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ) : null}
              {project.upcomingWork?.length ? (
                <div>
                  <dt>Upcoming work</dt>
                  <dd>
                    <ul>
                      {project.upcomingWork.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ) : null}
              {service ? (
                <div>
                  <dt>Related service</dt>
                  <dd>
                    <Link className="text-link" to={`/services/${service.slug}`}>
                      {service.label} <ArrowUpRight size={16} />
                    </Link>
                  </dd>
                </div>
              ) : null}
              <div>
                <dt>Next</dt>
                <dd>
                  <Link
                    className="solid-link"
                    to={`/contact?service=${project.serviceSlug}`}
                  >
                    Discuss your project <ArrowUpRight size={16} />
                  </Link>
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </section>

      {embed ? (
        <section className="gallery-project-film">
          <Reveal>
            <div className="gallery-project-video">
              <iframe
                src={embed}
                title={`${project.title} project video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </Reveal>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="editorial-section gallery-related">
          <Reveal>
            <p className="eyebrow">More work</p>
            <ul className="gallery-related-grid">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link
                    className="gallery-related-card"
                    to={`/gallery/${item.slug}`}
                  >
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      loading="lazy"
                      className={
                        item.placeholderImage ? "is-logo-placeholder" : undefined
                      }
                    />
                    <span>{item.category}</span>
                    <strong>{item.title}</strong>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      ) : null}
    </Layout>
  );
}
