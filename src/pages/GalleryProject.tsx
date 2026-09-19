import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import Reveal from "@/components/Reveal";
import { getGalleryProject, youtubeEmbedUrl } from "@/data/projects";
import { SITE_ORIGIN } from "@/lib/geo-schema";

export default function GalleryProject() {
  const { slug } = useParams();
  const project = slug ? getGalleryProject(slug) : undefined;

  if (!project) {
    return <Navigate to="/gallery" replace />;
  }

  const embed = project.youtubeUrl ? youtubeEmbedUrl(project.youtubeUrl) : null;
  const highlights = project.workCompleted?.length
    ? project.workCompleted
    : (project.upcomingWork ?? []);
  const highlightLabel = project.workCompleted?.length
    ? "Key Highlights"
    : project.upcomingWork?.length
      ? "Upcoming Projects"
      : null;

  return (
    <Layout>
      <SEO
        title={`${project.title} | Portfolio | Home Improvement Club`}
        description={project.teaser}
        canonical={`/gallery/${project.slug}`}
        ogImage={project.placeholderImage ? undefined : project.image}
        schema={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: project.title,
          description: project.teaser,
          url: `${SITE_ORIGIN}/gallery/${project.slug}`,
          image: project.placeholderImage
            ? undefined
            : project.image.startsWith("http")
              ? project.image
              : `${SITE_ORIGIN}${project.image.startsWith("/") ? "" : "/"}${project.image}`,
          contentLocation: project.location,
          dateCreated: project.year,
          about: project.category,
          creator: {
            "@type": "HomeAndConstructionBusiness",
            name: "Home Improvement Club",
            url: `${SITE_ORIGIN}/`,
          },
        }}
      />

      <section className="gallery-project-hero editorial-section">
        <div className="gallery-project-copy">
          <Link className="gallery-back" to="/gallery">
            <ArrowLeft size={16} aria-hidden="true" /> Back to Portfolio
          </Link>
          <p className="eyebrow">{project.category}</p>
          <h1>{project.title}</h1>
          <p className="gallery-project-facts">
            <span>
              <MapPin size={15} aria-hidden="true" />
              {project.location}
            </span>
            {project.year ? (
              <span>
                <CalendarDays size={15} aria-hidden="true" />
                {project.year}
              </span>
            ) : null}
          </p>
          {project.comingSoon ? (
            <p className="gallery-coming-soon-note">Upcoming project</p>
          ) : null}
        </div>
        <figure
          className={`gallery-project-photo${project.placeholderImage ? " is-placeholder" : ""}`}
        >
          <img
            src={project.image}
            alt={project.imageAlt}
            width={1600}
            height={2000}
            className={
              project.placeholderImage ? "is-logo-placeholder" : undefined
            }
          />
        </figure>
        <div className="gallery-project-body">
          {project.overview[0] ? (
            <p className="gallery-project-lede">{project.overview[0]}</p>
          ) : (
            <p className="gallery-project-lede">{project.teaser}</p>
          )}
          {highlights.length > 0 && highlightLabel ? (
            <>
              <p className="eyebrow gallery-project-highlights-label">
                {highlightLabel}
              </p>
              <ul className="gallery-project-highlights">
                {highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
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

      <section className="editorial-section gallery-help">
        <Reveal>
          <div className="gallery-help-grid">
            <h2>
              Planning similar work?
              <br />
              <em>Tell us the property.</em>
            </h2>
            <div>
              <p>
                Custom home, multiplex, finishing, or renovation. Bring the
                address, intended use, and budget context.
              </p>
              <Link
                className="solid-link"
                to={`/contact?service=${project.serviceSlug}`}
              >
                Book a consultation <ArrowUpRight size={18} />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
}
