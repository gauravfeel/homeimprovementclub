import type { Service } from "@/data/services";
import {
  EnquiryLink,
  ServiceBreadcrumb,
  ServiceImage,
  QuestionList,
  RelatedLinks,
} from "@/components/ServicePrimitives";
export default function FlooringPage({ service }: { service: Service }) {
  return (
    <>
      <section className="flooring-opening">
        <div className="flooring-title">
          <ServiceBreadcrumb label="Tile & flooring" />
          <p className="eyebrow">
            Tile & flooring replacement · Greater Vancouver
          </p>
          <h1>
            The surface that
            <br />
            <em>connects it all.</em>
          </h1>
          <p>
            One room or a run of adjoining spaces. Look at the material, the
            transitions and the installation context together.
          </p>
          <EnquiryLink service={service}>Plan my flooring</EnquiryLink>
        </div>
        <ServiceImage
          src={service.image}
          alt="Transition between patterned timber flooring and large stone-look tiles"
          caption="Material, pattern and room-to-room transitions"
          eager
        />
      </section>
      <section className="editorial-section flooring-materials">
        <div>
          <p className="eyebrow">Choose for the room</p>
          <h2>
            Start with use.
            <br />
            <em>Then choose the finish.</em>
          </h2>
        </div>
        <dl>
          <div>
            <dt>Tile & porcelain</dt>
            <dd>
              Discuss format, slip considerations, grout, cleaning and the
              conditions in kitchens, bathrooms and entries.
            </dd>
          </div>
          <div>
            <dt>Wood flooring</dt>
            <dd>
              Consider the character of the grain, plank direction, maintenance
              and how the material suits each room.
            </dd>
          </div>
          <div>
            <dt>Stone surfaces</dt>
            <dd>
              Ask about finish, care and sealing requirements for the specific
              material under consideration.
            </dd>
          </div>
        </dl>
      </section>
      <section className="flooring-transition">
        <div className="editorial-section">
          <p className="eyebrow">At the threshold</p>
          <h2>
            A floor does not
            <br />
            <em>stop at the sample.</em>
          </h2>
          <p>
            Floor heights, door clearance, stair edges and the meeting of
            different materials all affect the result. Plan the transitions
            before you commit to a finish—especially when flooring connects a
            new kitchen or bathroom to the rest of the home.
          </p>
          <RelatedLinks slugs={["kitchen-cabinets", "bathrooms"]} />
        </div>
      </section>
      <section className="editorial-section flooring-sequence">
        <div>
          <p className="eyebrow">The work underneath</p>
          <h2>
            Before the new
            <br />
            <em>floor goes down.</em>
          </h2>
          <ol>
            <li>
              <strong>Review the existing surface.</strong>
              <p>
                Identify the rooms, the material being removed and any visible
                concerns.
              </p>
            </li>
            <li>
              <strong>Discuss preparation.</strong>
              <p>
                The condition of the subfloor and the selected material inform
                the preparation needed.
              </p>
            </li>
            <li>
              <strong>Coordinate the installation.</strong>
              <p>
                Allow for cabinetry, appliances, thresholds and access between
                rooms.
              </p>
            </li>
          </ol>
        </div>
        <aside>
          <h3>A few practical questions.</h3>
          <QuestionList
            items={[
              {
                question: "Can different materials work together?",
                answer:
                  "Yes. Discuss where each material belongs, how their heights meet and whether a transition detail is needed. Samples are most useful when considered alongside adjacent finishes.",
              },
              {
                question: "Do all rooms need to be replaced at once?",
                answer:
                  "Discuss the rooms you want to prioritise. Material continuity, access and the installation sequence will help determine whether a staged approach makes sense.",
              },
              {
                question: "What should I include in an enquiry?",
                answer:
                  "Tell us which rooms are involved, what is currently installed and whether the work is part of a kitchen, bathroom or broader renovation.",
              },
            ]}
          />
          <EnquiryLink service={service}>Discuss my surfaces</EnquiryLink>
        </aside>
      </section>
    </>
  );
}
