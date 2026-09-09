import type { Service } from "@/data/services";
import { Link } from "react-router-dom";
import {
  EnquiryLink,
  ServiceBreadcrumb,
  ServiceImage,
} from "@/components/ServicePrimitives";
export default function SystemsPage({ service }: { service: Service }) {
  return (
    <>
      <section className="editorial-section systems-opening">
        <ServiceBreadcrumb label="HVAC & electrical" />
        <div>
          <p className="eyebrow">Planned home upgrades · Greater Vancouver</p>
          <h1>
            Plan the systems.
            <br />
            <em>Then the finishes.</em>
          </h1>
          <p>
            Heating, cooling and electrical upgrades belong in the renovation
            conversation early. Consider the demands of your new layout,
            appliances and fixtures before walls and surfaces are finished.
          </p>
          <EnquiryLink service={service}>Discuss my upgrade</EnquiryLink>
        </div>
        <aside className="systems-brief">
          <p className="eyebrow">For your renovation enquiry</p>
          <h2>
            What is changing
            <br />
            in your home?
          </h2>
          <ul>
            <li>A kitchen with different appliances?</li>
            <li>Rooms with heating or cooling concerns?</li>
            <li>New lighting, outlets or controls?</li>
            <li>A planned equipment or panel upgrade?</li>
          </ul>
          <p>Tell us what you are planning and what is already in place.</p>
        </aside>
      </section>
      <section className="systems-workstreams">
        <div className="editorial-section">
          <article>
            <span className="index-label">Heating & cooling</span>
            <h2>
              Comfort and
              <br />
              <em>equipment.</em>
            </h2>
            <p>
              Discuss existing heating, the rooms affected and any heat pump
              options you want to explore. Equipment placement, access and the
              wider renovation scope need to be considered together.
            </p>
            <ul className="plain-checklist">
              <li>Current heating and cooling setup</li>
              <li>Rooms and comfort priorities</li>
              <li>Equipment and control locations</li>
            </ul>
          </article>
          <article>
            <span className="index-label">Electrical</span>
            <h2>
              Capacity and
              <br />
              <em>connections.</em>
            </h2>
            <p>
              New appliances and fixtures can change what your home needs.
              Include electrical capacity, panel considerations and outlet
              placement in the plan, alongside the room layout.
            </p>
            <ul className="plain-checklist">
              <li>Planned appliances and fixtures</li>
              <li>Electrical capacity and panel review</li>
              <li>Switch, outlet and lighting positions</li>
            </ul>
          </article>
        </div>
      </section>
      <section className="editorial-section systems-coordination">
        <ServiceImage
          src={service.image}
          alt="Home mechanical equipment and heating system inspiration"
          caption="Equipment belongs in the wider renovation plan"
        />
        <div>
          <p className="eyebrow">Coordinate before closing up</p>
          <h2>
            Decisions that affect
            <br />
            <em>the rest of the work.</em>
          </h2>
          <p>
            Agree the intended upgrades, required assessments and approval
            responsibilities before scheduling the work. Confirm equipment
            selections and installation requirements before cabinetry or
            finishes limit access.
          </p>
          <Link className="text-link" to="/how-it-works">
            Explore renovation planning ↗
          </Link>
          <div className="rebate-note">
            <h3>Considering an energy rebate?</h3>
            <p>
              Check official program requirements, eligible equipment and any
              pre-approval before making a purchase.
            </p>
            <Link className="text-link" to="/rebates">
              Official rebate resources ↗
            </Link>
          </div>
        </div>
      </section>
      <section className="editorial-section systems-action">
        <div>
          <p className="eyebrow">Start with the planned work</p>
          <h2>
            Tell us about
            <br />
            <em>your upgrade.</em>
          </h2>
          <p>
            Include your city, the rooms involved and your existing equipment if
            you know it. A free consultation is a place to discuss the next
            steps.
          </p>
        </div>
        <EnquiryLink service={service}>Discuss my upgrade</EnquiryLink>
      </section>
    </>
  );
}
