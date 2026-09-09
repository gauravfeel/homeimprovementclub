import { PROCESS, GENERAL_FAQS } from "@/data/renovation";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { SERVICES } from "@/data/services";
import { SERVICE_CITIES } from "@/lib/service-area";

export function ProcessSection() {
  return (
    <section className="editorial-section process-section" id="process">
      <div className="section-head">
        <p className="eyebrow">How it comes together</p>
        <h2>
          From an idea.
          <br />
          <em>To your everyday.</em>
        </h2>
        <Link className="text-link" to="/how-it-works">
          Explore the process <ArrowUpRight size={18} />
        </Link>
      </div>
      <ol className="process-list">
        {PROCESS.map((step, i) => (
          <li key={step.title}>
            <span className="step-number">0{i + 1}</span>
            <div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
export function AreaSection() {
  return (
    <section className="editorial-section area-section">
      <div>
        <p className="eyebrow">Close to home</p>
        <h2>
          Renovating across
          <br />
          <em>Greater Vancouver.</em>
        </h2>
        <p className="section-copy">
          From a kitchen in the city to an exterior on the North Shore. Tell us
          where you live and what you have in mind.
        </p>
        <Link className="text-link" to="/areas-we-serve">
          Our service area <ArrowUpRight size={18} />
        </Link>
      </div>
      <ul className="city-list">
        {SERVICE_CITIES.map((city) => (
          <li key={city}>
            {city}
            <span aria-hidden="true">↗</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FAQSection({
  items = GENERAL_FAQS,
  title = "A little clarity, before you begin.",
}: {
  items?: readonly {
    question: string;
    answer: string;
  }[];
  title?: string;
}) {
  return (
    <section className="editorial-section faq-section">
      <div>
        <p className="eyebrow">Good questions</p>
        <h2>{title}</h2>
        <Link className="text-link" to="/contact">
          Ask us about your home <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="faq-list">
        {items.map((faq) => (
          <details key={faq.question}>
            <summary>
              {faq.question}
              <span aria-hidden="true">+</span>
            </summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function ServiceCollection() {
  return (
    <div className="service-collection">
      <div className="featured-services">
        {SERVICES.slice(0, 2).map((s, i) => (
          <Link
            className="feature-service"
            key={s.slug}
            to={`/services/${s.slug}`}
          >
            <div className="service-photo">
              <img
                src={s.image}
                alt={`${s.label} design inspiration`}
                loading="lazy"
                width="1920"
                height="1080"
              />
              <span className="image-label">Design inspiration</span>
            </div>
            <div className="service-caption">
              <span className="index-label">0{i + 1}</span>
              <div>
                <h3>{s.label}</h3>
                <p>{s.short}</p>
              </div>
              <ArrowUpRight aria-hidden="true" />
            </div>
          </Link>
        ))}
      </div>
      <div className="other-services">
        {SERVICES.slice(2).map((s, i) => (
          <Link key={s.slug} to={`/services/${s.slug}`}>
            <span className="index-label">0{i + 3}</span>
            <h3>{s.label}</h3>
            <ArrowUpRight size={20} />
            <p>{s.short}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
