import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { SERVICES } from "@/data/services";
export default function Services() {
  return (
    <Layout>
      <SEO
        title="Custom Homes, Multiplex & Renovations | HIC"
        description="Explore HIC custom home construction, multiplex expertise and renovation services across the Fraser Valley and Greater Vancouver."
        canonical="/services"
      />
      <section className="editorial-section directory-opening">
        <p className="eyebrow">Custom homes · Multiplex · Renovations</p>
        <div>
          <h1>
            Find your
            <br />
            <em>starting point.</em>
          </h1>
          <p>
            Build new, explore a multiplex project or improve the home you have.
            Each service page explains what to consider before setting scope.
          </p>
        </div>
        <nav aria-label="Service directory" className="directory-index">
          {SERVICES.map((s) => (
            <a key={s.slug} href={`#${s.slug}`}>
              {s.label}
            </a>
          ))}
        </nav>
      </section>
      <div className="editorial-section service-directory">
        {SERVICES.map((s, i) => (
          <article key={s.slug} id={s.slug}>
            <Link className="directory-image" to={`/services/${s.slug}`}>
              <img
                src={s.image}
                alt={`${s.label} design inspiration`}
                loading={i === 0 ? "eager" : "lazy"}
                width="1920"
                height="1080"
              />
              <span className="image-label">Design inspiration</span>
            </Link>
            <div>
              <span className="index-label">
                0{i + 1} / {s.title}
              </span>
              <h2>{s.label}</h2>
              <p>{s.short}</p>
              <ul>
                {s.sub.slice(0, 3).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link className="text-link" to={`/services/${s.slug}`}>
                Explore {s.label.toLowerCase()} ↗
              </Link>
            </div>
          </article>
        ))}
      </div>
      <section className="editorial-section directory-help">
        <h2>
          More than one
          <br />
          <em>part of the home?</em>
        </h2>
        <div>
          <p>
            Tell us about the whole project. Property, layout, flooring,
            lighting, cabinetry and systems are easier to discuss as one brief.
          </p>
          <Link className="solid-link" to="/contact">
            Discuss the whole scope ↗
          </Link>
        </div>
      </section>
    </Layout>
  );
}
