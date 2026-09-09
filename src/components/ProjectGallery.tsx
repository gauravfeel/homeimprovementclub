import { Link } from "react-router-dom";
import { VERIFIED_PROJECTS } from "@/data/projects";
export default function ProjectGallery() {
  if (!VERIFIED_PROJECTS.length) return null;
  return (
    <section className="editorial-section">
      <p className="eyebrow">Selected work</p>
      <h2>Homes, reconsidered.</h2>
      <div className="verified-projects">
        {VERIFIED_PROJECTS.filter((p) => p.verified).map((p) => (
          <article key={`${p.title}-${p.location}`}>
            <figure>
              <img loading="lazy" src={p.image} alt={p.imageAlt} />
              <figcaption>{p.location}</figcaption>
            </figure>
            <h3>{p.title}</h3>
            <p>{p.description}</p>
            <ul>
              {p.scope.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            {p.beforeImage && (
              <details>
                <summary>Before the renovation</summary>
                <img
                  loading="lazy"
                  src={p.beforeImage}
                  alt={p.beforeAlt || `${p.title} before renovation`}
                />
              </details>
            )}
            <Link className="text-link" to={`/services/${p.serviceSlug}`}>
              Explore this service ↗
            </Link>
            <Link
              className="text-link"
              to={`/contact?service=${p.serviceSlug}`}
            >
              Discuss your renovation ↗
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
