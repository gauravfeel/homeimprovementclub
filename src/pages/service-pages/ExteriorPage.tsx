import type { Service } from "@/data/services";
import {
  EnquiryLink,
  ServiceBreadcrumb,
  ServiceImage,
  QuestionList,
} from "@/components/ServicePrimitives";
import Reveal from "@/components/Reveal";
import outdoor from "@/assets/outdoor-living.jpg";
export default function ExteriorPage({ service }: { service: Service }) {
  return (
    <>
      <section className="editorial-section exterior-opening">
        <ServiceBreadcrumb label="Exteriors" />
        <div>
          <p className="eyebrow">Exterior renovations · Greater Vancouver</p>
          <h1>
            Consider your home
            <br />
            <em>from the outside.</em>
          </h1>
          <div>
            <p>
              Exterior finishes, entrances and outdoor spaces shape the way you
              arrive home. Start with the building’s condition, then work
              through the changes you want to make.
            </p>
            <EnquiryLink service={service}>Plan my exterior</EnquiryLink>
          </div>
        </div>
      </section>
      <Reveal variant="clip" className="exterior-panorama">
        <ServiceImage
          className="exterior-panorama"
          src={service.image}
          alt="Contemporary house exterior with timber, dark siding and stone finishes"
          caption="Cladding, colour and entrance details"
          eager
        />
      </Reveal>
      <section className="editorial-section exterior-scope">
        <div>
          <p className="eyebrow">Read the building first</p>
          <h2>
            What stays.
            <br />
            What changes.
            <br />
            <em>What needs attention.</em>
          </h2>
          <p>
            Tell us about the surfaces you want to refresh and any areas of
            concern. The condition of existing materials, exposure and access
            can affect the scope and sequence.
          </p>
        </div>
        <div className="exterior-scope-rows">
          <article>
            <span>01</span>
            <div>
              <h3>Facade & finishes</h3>
              <p>
                Exterior paint, siding and cladding options, with colour and
                material changes considered together.
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>Edges & openings</h3>
              <p>
                Soffit, fascia, gutters, windows and doors where they form part
                of the proposed renovation.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>Arrival & outdoor space</h3>
              <p>
                Entrances, decks, patios and railings, and the way they connect
                the inside of your home to the outdoors.
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className="exterior-outdoor">
        <div>
          <p className="eyebrow">Beyond the front door</p>
          <h2>
            Make the connection
            <br />
            <em>to outside.</em>
          </h2>
          <p>
            Think about how you move from the house to the deck or patio, where
            people gather and how the space feels in the evening. Include
            outdoor lighting in the conversation if it is part of the change you
            want.
          </p>
          <EnquiryLink service={service}>Discuss my outdoor space</EnquiryLink>
        </div>
        <ServiceImage
          src={outdoor}
          alt="Covered timber deck with seating and warm evening lighting"
          caption="An outdoor space connected to the home"
        />
      </section>
      <section className="editorial-section exterior-questions">
        <div>
          <p className="eyebrow">Planning for the setting</p>
          <h2>
            Exposure, access
            <br />
            <em>and timing.</em>
          </h2>
          <p>
            Greater Vancouver homes sit in different settings. Share the parts
            of your exterior that concern you and any access constraints, so the
            project conversation starts with the actual site.
          </p>
        </div>
        <QuestionList
          items={[
            {
              question: "Can an exterior renovation be staged?",
              answer:
                "Discuss the changes you want to prioritise. The relationship between cladding, openings, drainage details and finishes will help determine a sensible sequence.",
            },
            {
              question: "What affects when the work can happen?",
              answer:
                "The chosen materials, site access, weather conditions and project scope all need to be considered when planning exterior work. Confirm the proposed schedule for your project.",
            },
            {
              question: "Can lighting be part of the exterior plan?",
              answer:
                "HIC offers exterior lighting upgrades. Include entrances, pathways and outdoor living areas in your enquiry so the lighting and renovation can be discussed together.",
            },
          ]}
        />
      </section>
    </>
  );
}
