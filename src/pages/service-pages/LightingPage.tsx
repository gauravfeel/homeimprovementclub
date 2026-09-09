import { useState } from "react";
import type { Service } from "@/data/services";
import {
  EnquiryLink,
  ServiceBreadcrumb,
  ServiceImage,
  RelatedLinks,
} from "@/components/ServicePrimitives";
const layers = [
  {
    name: "Ambient",
    title: "The room’s starting point.",
    text: "General light gives the room its overall level of brightness. Consider where it falls, how evenly it reaches the space and how it feels in the evening.",
    examples: "Ceiling fixtures · Recessed light · Cove lighting",
  },
  {
    name: "Task",
    title: "Light where life happens.",
    text: "Preparing food, reading and getting ready need light in the right place. Plan the fixture position around the task so your body or cabinetry does not block it.",
    examples: "Under-cabinet light · Reading light · Vanity lighting",
  },
  {
    name: "Accent",
    title: "Give the room another dimension.",
    text: "Use a more focused layer to bring attention to a surface, an architectural detail or a feature. Consider it with the general lighting, rather than adding it as an afterthought.",
    examples: "Wall accents · Feature fixtures · Architectural details",
  },
];
export default function LightingPage({ service }: { service: Service }) {
  const [active, setActive] = useState(0);
  return (
    <>
      <section className="editorial-section lighting-opening">
        <ServiceBreadcrumb label="Lighting" />
        <p className="eyebrow">
          Interior & exterior lighting · Greater Vancouver
        </p>
        <h1>
          Light changes
          <br />
          <em>how a room feels.</em>
        </h1>
        <div className="lighting-intro-line">
          <p>
            From a clear work surface to a softer evening. Plan ambient, task
            and accent lighting around the way you use your home.
          </p>
          <EnquiryLink service={service}>Discuss my lighting</EnquiryLink>
        </div>
      </section>
      <section className="lighting-studio">
        <ServiceImage
          src={service.image}
          alt="Living room with layered architectural lighting"
          caption="Light, shadow and architectural detail"
          eager
        />
        <div className="lighting-selector">
          <p className="eyebrow">Explore the layers</p>
          <div
            className="layer-buttons"
            role="group"
            aria-label="Lighting layers"
          >
            {layers.map((layer, i) => (
              <button
                key={layer.name}
                aria-pressed={active === i}
                onClick={() => setActive(i)}
              >
                {layer.name}
              </button>
            ))}
          </div>
          <div className="layer-copy" aria-live="polite">
            <span className="index-label">0{active + 1}</span>
            <h2>{layers[active].title}</h2>
            <p>{layers[active].text}</p>
            <span className="small-note">{layers[active].examples}</span>
          </div>
        </div>
      </section>
      <section className="editorial-section lighting-contexts">
        <article>
          <p className="eyebrow">Inside</p>
          <h2>
            Think in rooms.
            <br />
            <em>Then in moments.</em>
          </h2>
          <p>
            A kitchen needs practical light for preparation and a different
            atmosphere when the work is done. A bathroom needs useful mirror
            lighting as well as general light. Describe the different ways you
            use each room.
          </p>
          <RelatedLinks slugs={["kitchen-cabinets", "bathrooms"]} />
        </article>
        <article>
          <p className="eyebrow">Outside</p>
          <h2>
            A considered
            <br />
            <em>arrival home.</em>
          </h2>
          <p>
            Include the entrance, steps, pathways and outdoor living areas in
            the conversation. Think about where light is useful, which features
            you want to highlight and how it reaches neighbouring spaces.
          </p>
          <RelatedLinks slugs={["exterior"]} />
        </article>
      </section>
      <section className="editorial-section lighting-brief">
        <div>
          <p className="eyebrow">Bring us the room, not a fixture list</p>
          <h2>
            What does your light
            <br />
            <em>need to do?</em>
          </h2>
        </div>
        <div>
          <p>
            Tell us which rooms feel too dim, where you work or read, and what
            you would like the space to feel like after dark. Existing wiring,
            controls and fixture positions can then be considered together.
          </p>
          <EnquiryLink service={service}>Start my lighting brief</EnquiryLink>
          <span className="small-note">
            Free renovation consultation across Greater Vancouver.
          </span>
        </div>
      </section>
    </>
  );
}
