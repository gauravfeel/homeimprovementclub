import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { GALLERY_PROJECTS } from "@/data/projects";

export default function ProjectGallery() {
  const featured = GALLERY_PROJECTS.filter((project) => !project.comingSoon).slice(0, 2);
  if (!featured.length) return null;

  return (
    <section className="editorial-section">
      <p className="eyebrow">Selected work</p>
      <h2>Homes, reconsidered.</h2>
      <div className="gallery-home-teaser">
        {featured.map((project) => (
          <article key={project.slug} className="gallery-home-card">
            <Link className="gallery-home-media" to={`/gallery/${project.slug}`}>
              <img loading="lazy" src={project.image} alt={project.imageAlt} />
            </Link>
            <div>
              <span className="index-label">{project.category}</span>
              <h3>
                <Link to={`/gallery/${project.slug}`}>{project.title}</Link>
              </h3>
              <p>{project.teaser}</p>
              <Link className="text-link" to={`/gallery/${project.slug}`}>
                View project <ArrowUpRight size={16} />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <Link className="text-link gallery-home-all" to="/gallery">
        View full gallery <ArrowUpRight size={18} />
      </Link>
    </section>
  );
}
