import type { Service } from "@/data/services";
import {
  EnquiryLink,
  ServiceBreadcrumb,
  ServiceImage,
  QuestionList,
  RelatedLinks,
} from "@/components/ServicePrimitives";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
export default function BathroomPage({ service }: { service: Service }) {
  return (
    <>
      <section className="editorial-section bathroom-opening">
        <ServiceBreadcrumb label="Bathrooms" />
        <div className="bathroom-title-row">
          <div>
            <p className="eyebrow">Full bathroom renovations</p>
            <h1>
              Bathroom renovations
              <br />
              <em>in Vancouver.</em>
            </h1>
          </div>
          <div>
            <p>
              A better morning starts with a room that works. Make space for the
              shower, storage and light you need—with the wet-area details
              considered from the beginning.
            </p>
            <EnquiryLink service={service}>Plan my bathroom</EnquiryLink>
            <p className="small-note">Free consultation · Greater Vancouver</p>
          </div>
        </div>
      </section>
      <div className="bathroom-panorama">
        <Reveal variant="clip">
          <ServiceImage
            src={service.image}
            alt="Bathroom with walk-in glass shower, stone tub and timber vanity"
            caption="A full room, from shower to vanity"
            eager
          />
        </Reveal>
      </div>
      <section className="editorial-section bathroom-layers">
        <div className="bathroom-layer-heading">
          <p className="eyebrow">Two sides of the same renovation</p>
          <h2>
            What you see.
            <br />
            <em>What makes it work.</em>
          </h2>
        </div>
        <article>
          <span className="index-label">01 / The room you use</span>
          <h3>Layout, fixtures and finishes.</h3>
          <p>
            Think through shower access, the space around the vanity, towel
            storage and how the door opens. Tile, mirrors, lighting and fittings
            should support that layout.
          </p>
          <ul>
            <li>Shower or bath configuration</li>
            <li>Vanity size and storage</li>
            <li>Tile, grout and fixture selections</li>
            <li>Mirror and lighting positions</li>
          </ul>
        </article>
        <article className="wet-area-note">
          <span className="index-label">02 / Behind the surfaces</span>
          <h3>Wet-area planning.</h3>
          <p>
            Waterproofing, drainage, plumbing connections and ventilation need
            to be part of the scope. Discuss the proposed system and the
            condition of the existing room before finishes are installed.
          </p>
          <p className="small-note">
            Requirements depend on your home and the proposed work. Confirm the
            details during planning.
          </p>
        </article>
      </section>
      <section className="bathroom-household editorial-section">
        <div>
          <p className="eyebrow">While the room is out of use</p>
          <h2>
            Plan around
            <br />
            <em>your household.</em>
          </h2>
        </div>
        <div>
          <p>
            Is this your only bathroom? Will the work affect an adjoining
            bedroom? Are there access or mobility needs to account for? Raise
            these questions early, alongside the design decisions.
          </p>
          <div className="household-prompts">
            <span>Alternative facilities</span>
            <span>Access to the work area</span>
            <span>Dust and room protection</span>
            <span>Delivery and installation timing</span>
          </div>
        </div>
      </section>
      <section className="editorial-section bathroom-questions">
        <p className="eyebrow">Before you choose the tile</p>
        <h2>Bathroom planning questions.</h2>
        <QuestionList
          items={[
            {
              question: "Can a bathtub become a walk-in shower?",
              answer:
                "This is a scope to explore at consultation. The room dimensions, drainage, waterproofing and household needs should inform the proposed shower layout.",
            },
            {
              question: "Can a small bathroom have better storage?",
              answer:
                "Vanity proportions, drawer access, mirror storage and the use of wall space are useful things to review. Bring a list of what you need to store so storage is planned around your routine.",
            },
            {
              question: "Should ventilation be included in the renovation?",
              answer:
                "Include the existing ventilation and any moisture concerns in your enquiry. Ventilation requirements should be considered alongside the shower layout and finishes.",
            },
            {
              question: "How is the schedule decided?",
              answer:
                "The scope, fixture and tile selections, availability and the condition of the existing room affect the schedule. Discuss the sequence and household arrangements before work begins.",
            },
          ]}
        />
        <RelatedLinks slugs={["flooring", "lighting"]} />
      </section>
      <CTASection
        title="A better bathroom starts with a clear brief."
        description="Tell us about the bathroom you have, the changes you need and how your household uses it."
        cta="Plan my bathroom"
        to="/contact?service=bathrooms"
      />
    </>
  );
}
