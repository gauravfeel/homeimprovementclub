import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
const resources = [
  {
    title: "Better Homes BC",
    text: "Explore provincial home energy upgrade programs, contractor requirements and support.",
    url: "https://betterhomesbc.ca/",
  },
  {
    title: "BC Hydro",
    text: "Find current residential renovation rebates and energy-saving programs.",
    url: "https://www.bchydro.com/powersmart/residential/rebates-programs.html",
  },
  {
    title: "FortisBC",
    text: "Check current offers and the requirements for your home and utility service.",
    url: "https://www.fortisbc.com/rebates-and-energy-savings/rebates-and-offers",
  },
];
export default function Rebates() {
  return (
    <Layout>
      <SEO
        title="BC Renovation Rebate Resources | Home Improvement Club"
        description="Official BC home energy rebate resources from Better Homes BC, BC Hydro and FortisBC. Check current requirements directly with program administrators."
        canonical="/rebates"
      />
      <section className="editorial-section page-intro">
        <p className="eyebrow">Useful starting points</p>
        <h1>
          Planning an
          <br />
          <em>energy upgrade?</em>
        </h1>
        <p>
          Check the official sources before choosing equipment or scheduling
          work. Programs, eligibility and funding can change; HIC does not
          approve or guarantee rebates.
        </p>
        <div className="resource-list">
          {resources.map((r) => (
            <article key={r.title}>
              <h2>{r.title}</h2>
              <p>{r.text}</p>
              <a
                className="text-link"
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit official resource <ArrowUpRight size={18} />
              </a>
            </article>
          ))}
        </div>
        <p>
          Confirm any pre-approval, product and contractor requirements with the
          program administrator before making a purchase.
        </p>
      </section>
      <section className="editorial-section directory-help">
        <h2>
          Put the upgrade
          <br />
          <em>in context.</em>
        </h2>
        <div>
          <p>
            If heating, cooling or electrical changes form part of your
            renovation, read about the planning considerations before choosing
            equipment.
          </p>
          <Link className="text-link" to="/services/hvac-electrical">
            HVAC & electrical upgrades ↗
          </Link>
        </div>
      </section>
    </Layout>
  );
}
