import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { SERVICES } from "@/data/services";
export default function Services() {
  return (
    <Layout>
      <SEO
        title="Renovation Services in Greater Vancouver | Home Improvement Club"
        description="Compare HIC kitchen, bathroom, lighting, flooring, HVAC and electrical, and exterior renovation services in Greater Vancouver."
        canonical="/services"
      />
      <section className="editorial-section directory-opening">
        <p className="eyebrow">Renovation services · Greater Vancouver</p>
        <div>
          <h1>
            Find your
            <br />
            <em>starting point.</em>
          </h1>
          <p>
            Choose the part of your home you want to work on. Each service page
            explains what to consider before deciding on the scope.
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
            Tell us about the work together. Connected decisions—flooring,
            lighting, cabinetry and systems—are easier to discuss as part of the
            same renovation brief.
          </p>
          <Link className="solid-link" to="/contact">
            Discuss the whole scope ↗
          </Link>
        </div>
      </section>
    </Layout>
  );
}
