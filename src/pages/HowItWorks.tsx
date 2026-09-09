import { Link } from "react-router-dom";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
const stages = [
  {
    title: "Describe the change.",
    body: "Start with a free consultation. Talk about the existing space, the work you have in mind and the things that matter most to your household.",
    input:
      "Your location, priorities and any photos or ideas you already have.",
    decision: "The areas of the home and the scope to explore.",
  },
  {
    title: "Work through the details.",
    body: "Consider layout, materials, budget and proposed timing together. Discuss the work needed behind the finishes and the decisions required before it can begin.",
    input: "Your preferences, budget context and household constraints.",
    decision:
      "An agreed scope, selections and a proposed sequence for the work.",
  },
  {
    title: "Coordinate the renovation.",
    body: "The agreed plan moves into the home. Confirm access arrangements, responsibilities and how questions or changes will be handled during the work.",
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
        title="Planning Your Renovation | HIC Process"
        description="Understand HIC’s renovation process, the decisions to discuss and what to bring to your free consultation."
        canonical="/how-it-works"
      />
      <section className="editorial-section process-opening">
        <p className="eyebrow">From enquiry to walkthrough</p>
        <h1>
          A renovation involves
          <br />
          <em>more than the work.</em>
        </h1>
        <p>
          There are decisions about your home, your time and how you will live
          around the project. Here is where those conversations fit.
        </p>
      </section>
      <section
        className="editorial-section detailed-timeline"
        aria-label="Renovation stages"
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
              <span>01</span>Your city and the rooms involved
            </li>
            <li>
              <span>02</span>What currently gets in the way
            </li>
            <li>
              <span>03</span>What you would like to keep
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
