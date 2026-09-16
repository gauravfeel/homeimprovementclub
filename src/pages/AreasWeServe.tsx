import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { SERVICE_AREA, SERVICE_CITIES, SERVICE_CITIES_PROSE } from "@/lib/service-area";
import { ContactInfo } from "@/components/ContactInfo";
export default function AreasWeServe() {
  return (
    <Layout>
      <SEO
        title={`${SERVICE_AREA} Building & Renovation Area | HIC`}
        description={`HIC custom home, multiplex and renovation enquiries serve ${SERVICE_CITIES_PROSE}.`}
        canonical="/areas-we-serve"
      />
      <section className="editorial-section geography-opening">
        <div>
          <p className="eyebrow">Our service area</p>
          <h1>
            Fraser Valley and Greater Vancouver.
            <br />
            <em>Your neighbourhood.</em>
          </h1>
          <p>
            Custom home, multiplex and renovation enquiries across these cities.
            Include the property location and intended work so HIC can discuss
            availability.
          </p>
        </div>
        <span className="region-stamp">
          HIC
          <br />
          <span>British Columbia</span>
        </span>
      </section>
      <section className="editorial-section geographic-directory">
        <div>
          <p className="eyebrow">Where we work</p>
          <h2>
            Close to
            <br />
            <em>your next chapter.</em>
          </h2>
          <p>
            Custom homes, multiplex projects and focused or whole-home
            renovation enquiries.
          </p>
          <Link className="text-link" to="/services">
            Explore the services ↗
          </Link>
        </div>
        <ol>
          {SERVICE_CITIES.map((city, i) => (
            <li key={city}>
              <span className="index-label">{String(i + 1).padStart(2, "0")}</span>
              <span>{city}</span>
              <Link
                to={`/contact?city=${encodeURIComponent(city)}`}
                aria-label={`Discuss a building or renovation project in ${city}`}
              >
                Enquire ↗
              </Link>
            </li>
          ))}
        </ol>
      </section>
      <section className="editorial-section location-enquiry">
        <h2>
          Tell us about
          <br />
          <em>the property.</em>
        </h2>
        <div>
          <p>
            Your city is the starting point. The type of home, the rooms
            involved and any access constraints help make the first conversation
            more useful.
          </p>
          <p>
            If your location is outside the listed cities, contact HIC to ask
            about availability for your project.
          </p>
          <div className="contact-methods">
            <Link className="solid-link" to="/contact">
              Enquire about my location ↗
            </Link>
            <ContactInfo />
          </div>
        </div>
      </section>
    </Layout>
  );
}
