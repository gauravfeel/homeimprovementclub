import type { Service } from "@/data/services";
import { Link } from "react-router-dom";
import { ContactInfo } from "@/components/ContactInfo";
import CTASection from "@/components/CTASection";
import {
  EnquiryLink,
  ServiceBreadcrumb,
  ServiceImage,
  QuestionList,
  RelatedLinks,
} from "@/components/ServicePrimitives";
import Reveal from "@/components/Reveal";
import detailImage from "@/assets/kitchen-upgrade.jpg";
export default function KitchenPage({ service }: { service: Service }) {
  return (
    <>
      <section className="service-hero">
        <div className="service-hero-copy">
          <ServiceBreadcrumb label="Kitchens & cabinetry" />
          <p className="eyebrow">Kitchen & cabinet renovations</p>
          <h1>
            Kitchen renovations
            <br />
            <em>in Vancouver.</em>
          </h1>
          <p>
            A kitchen has to do more than look good. It needs room to cook,
            storage that makes sense and a layout that works when everyone is
            home.
          </p>
          <EnquiryLink service={service}>Plan my kitchen</EnquiryLink>
          <div className="service-hero-contact">
            <span>Free consultation · Greater Vancouver</span>
            <ContactInfo />
          </div>
        </div>
        <Reveal variant="clip" className="kitchen-photo">
          <ServiceImage
            src={service.image}
            alt="Pale cabinetry and a stone kitchen island"
            caption="Cabinetry, light and gathering space"
            eager
          />
        </Reveal>
      </section>
      <section className="editorial-section kitchen-planning">
        <div>
          <p className="eyebrow">Start with the way it works</p>
          <h2>
            What would make
            <br />
            <em>your kitchen easier?</em>
          </h2>
          <p>
            Too little counter space. Cupboards you cannot reach into. An island
            that gets in the way. These are useful starting points for a
            renovation—not details to work around later.
          </p>
          <ul className="plain-checklist">
            <li>Where do you prepare, cook and clean up?</li>
            <li>What needs a permanent home behind a cabinet door?</li>
            <li>How many people use the kitchen at the same time?</li>
            <li>Which appliances are staying, and which are changing?</li>
          </ul>
        </div>
        <aside className="planning-note">
          <p className="eyebrow">Two different starting points</p>
          <h3>Keep the layout.</h3>
          <p>
            If the room already flows well, focus the conversation on cabinetry,
            worktops, backsplash, flooring and light.
          </p>
          <hr />
          <h3>Rethink the layout.</h3>
          <p>
            If circulation or storage is the problem, discuss the position of
            the island, appliances and working areas before selecting finishes.
          </p>
          <span className="small-note">
            The existing space and proposed changes determine the scope.
          </span>
        </aside>
      </section>
      <section className="kitchen-detail-band">
        <Reveal variant="clip">
          <ServiceImage
            src={detailImage}
            alt="Kitchen cabinetry with timber shelving, integrated appliances and pendant lights"
            caption="Storage and surfaces, considered together"
          />
        </Reveal>
        <div>
          <p className="eyebrow">Cabinetry is the starting point</p>
          <h2>
            A place for the things
            <br />
            <em>you actually use.</em>
          </h2>
          <p>
            Drawers, cupboard access, appliance clearances and the space around
            the sink all influence the finished kitchen. Plan these alongside
            the worktop and backsplash, so the room reads as one considered
            space.
          </p>
          <dl className="detail-definitions">
            <div>
              <dt>Cabinetry</dt>
              <dd>Storage layout, door finishes and practical access.</dd>
            </div>
            <div>
              <dt>Surfaces</dt>
              <dd>Countertops, backsplash, flooring and the way they meet.</dd>
            </div>
            <div>
              <dt>Light</dt>
              <dd>
                Task lighting at work surfaces, general light and pendants where
                they belong.
              </dd>
            </div>
          </dl>
        </div>
      </section>
      <section className="editorial-section kitchen-questions">
        <div>
          <p className="eyebrow">Planning the disruption</p>
          <h2>
            Think beyond
            <br />
            <em>the finished room.</em>
          </h2>
          <p>
            Before work starts, discuss access to water, cooking and food
            storage, as well as the order in which cabinetry, appliances and
            finishes will arrive. Your household arrangements belong in the
            plan.
          </p>
          <Link className="text-link" to="/how-it-works">
            How renovation planning works ↗
          </Link>
        </div>
        <QuestionList
          items={[
            {
              question: "Do I need to choose cabinets before contacting HIC?",
              answer:
                "No. Bring your priorities and any ideas you already have. The layout and scope can help narrow the cabinetry and finish decisions.",
            },
            {
              question: "Can I update cabinets without moving the kitchen?",
              answer:
                "A renovation can focus on cabinetry and surfaces while keeping the main layout. The condition of the existing room and your storage needs should guide what stays.",
            },
            {
              question: "What affects the scope of a kitchen renovation?",
              answer:
                "Layout changes, cabinetry, surface selections, appliances and electrical or plumbing work all matter. Discuss them together before settling on a budget and schedule.",
            },
            {
              question: "Can flooring and lighting be included?",
              answer:
                "HIC offers both flooring and lighting upgrades. Include them in your kitchen enquiry so the transitions, fixture positions and installation sequence can be considered together.",
            },
          ]}
        />
      </section>
      <div className="editorial-section compact-connections">
        <p>
          Kitchen renovations across Vancouver, the North Shore, Burnaby, New
          Westminster, Coquitlam, Richmond and Surrey.
        </p>
        <RelatedLinks slugs={["lighting", "flooring", "hvac-electrical"]} />
      </div>
      <CTASection
        title="Let’s make your kitchen work for you."
        description="Tell us what is missing from your current kitchen. Start with a free consultation about layout, cabinetry and the scope that makes sense for your home."
        cta="Plan my kitchen"
        to="/contact?service=kitchen-cabinets"
      />
    </>
  );
}
