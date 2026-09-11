import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
const stages = [
  {
    title: "Describe the project.",
    body: "Start with a conversation about the property, what you want to build or change and what matters most to the people who will use it.",
    input:
      "Your property location, priorities and any photos, surveys, plans or ideas you already have.",
    decision: "The project path, feasibility questions and scope to explore.",
  },
  {
    title: "Work through the details.",
    body: "Consider feasibility, layout, materials, budget and timing together. Discuss design, consultant or approval requirements before construction.",
    input: "Your preferences, budget context and household constraints.",
    decision:
      "An agreed scope, selections and a proposed sequence for the work.",
  },
  {
    title: "Coordinate the build.",
    body: "The agreed plan moves into construction. Confirm access, responsibilities, sequencing and how questions or changes will be handled.",
    input:
      "Access to the agreed work areas and decisions when they are needed.",
    decision: "How the work is coordinated and how changes are discussed.",
  },
  {
    title: "Review the finished work.",
    body: "Walk through the completed work together. Discuss any remaining items and the care information relevant to the installed materials and equipment.",
    input: "Your questions about the completed space.",
    decision: "Remaining items and any relevant handover information.",
  },
];
export default function HowItWorks() {
  return (
    <Layout>
      <SEO
        title="Custom Home, Multiplex & Renovation Process | HIC"
        description="Understand how HIC moves custom home, multiplex and renovation conversations from early scope through construction and handover."
        canonical="/how-it-works"
      />
      <section className="editorial-section process-opening">
        <p className="eyebrow">From enquiry to walkthrough</p>
        <h1>
          A residential project involves
          <br />
          <em>more than the work.</em>
        </h1>
        <p>
          Custom homes, multiplex projects and renovations begin differently,
          but each needs a clear brief, coordinated decisions and a buildable plan.
        </p>
      </section>
      <section
        className="editorial-section detailed-timeline"
        aria-label="Residential project stages"
      >
        {stages.map((s, i) => (
          <article key={s.title}>
            <div className="timeline-number">0{i + 1}</div>
            <div>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
              <dl>
                <div>
                  <dt>Your part</dt>
                  <dd>{s.input}</dd>
                </div>
                <div>
                  <dt>Discuss together</dt>
                  <dd>{s.decision}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </section>
      <section className="consultation-prep">
        <div className="editorial-section">
          <div>
            <p className="eyebrow">Before we talk</p>
            <h2>
              No finished design
              <br />
              <em>required.</em>
            </h2>
            <p>
              A few notes are enough to start. Bring what you know, and use the
              consultation to discuss the rest.
            </p>
            <Link className="solid-link" to="/contact">
              Arrange a free consultation ↗
            </Link>
          </div>
          <ul>
            <li>
              <span>01</span>The property address and intended project
            </li>
            <li>
              <span>02</span>What currently gets in the way
            </li>
            <li>
              <span>03</span>What you hope to build or keep
            </li>
            <li>
              <span>04</span>Budget and timing, if you know them
            </li>
            <li>
              <span>05</span>Photos, measurements or inspiration you have
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}
