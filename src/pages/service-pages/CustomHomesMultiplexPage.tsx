import type { Service } from "@/data/services";
import { Link } from "react-router-dom";
import CTASection from "@/components/CTASection";
import Reveal from "@/components/Reveal";
import {
  EnquiryLink,
  QuestionList,
  ServiceBreadcrumb,
  ServiceImage,
} from "@/components/ServicePrimitives";
import detailImage from "@/assets/lux-exterior.jpg";
import customHomeImage from "@/assets/custom-home.jpg";
import multiplexImage from "@/assets/multiplex-homes.jpg";

export const CUSTOM_HOME_FAQS = [
  {
    question: "Does HIC build both custom homes and multiplex projects?",
    answer:
      "Yes. HIC is positioned for custom home construction and multiplex projects, while continuing to offer renovation services. The right starting scope depends on the property, intended use and local requirements.",
  },
  {
    question: "Can HIC confirm what can be built on my property?",
    answer:
      "Bring the property address and any available surveys or drawings to the first conversation. Zoning, approvals and consultant requirements are property- and municipality-specific and must be confirmed during feasibility work.",
  },
  {
    question: "Do I need finished drawings before contacting HIC?",
    answer:
      "No. Early ideas, priorities and budget context are enough to begin. If plans already exist, include them so the conversation can start from the work completed so far.",
  },
];

const questions = CUSTOM_HOME_FAQS;

export default function CustomHomesMultiplexPage({
  service,
}: {
  service: Service;
}) {
  return (
    <>
      <section className="build-hero editorial-section">
        <div>
          {/* <ServiceBreadcrumb label="Custom homes & multiplex" /> */}
          <p className="eyebrow">Custom home builder · Multiplex expert</p>
          <h1>
            Build for the life,
            <br />
            <em>and property, ahead.</em>
          </h1>
          <p className="build-lead">
            HIC plans and builds custom homes and multiplex projects across its
            approved Fraser Valley and Greater Vancouver service area.
          </p>
          <EnquiryLink service={service}>Discuss the property</EnquiryLink>
        </div>
        <Reveal variant="clip">
          <figure className="editorial-photo build-hero-video">
            <iframe
              src="https://www.youtube-nocookie.com/embed/CuLh6_YciqM?rel=0"
              title="Home Improvement Club custom homes and multiplex project video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              loading="eager"
              referrerPolicy="strict-origin-when-cross-origin"
            />
            {/* <figcaption>Project video · Custom homes and multiplex</figcaption> */}
          </figure>
        </Reveal>
      </section>

      <section className="editorial-section build-paths">
        <div>
          <p className="eyebrow">Two project paths</p>
          <h2>
            One property.
            <br />
            <em>A clear direction.</em>
          </h2>
        </div>
        <div className="build-path-list">
          <article>
            <figure className="editorial-photo build-path-photo">
              <img
                src={customHomeImage}
                alt="Custom home design inspiration"
                width="1920"
                height="1080"
              />
            </figure>
            <span className="index-label">01 / Custom homes</span>
            <h3>A home shaped around its people.</h3>
            <p>
              Start with how you want to live, how the site works and which
              decisions must be resolved before construction.
            </p>
          </article>
          <article>
            <figure className="editorial-photo build-path-photo">
              <img
                src={multiplexImage}
                alt="Multiplex residential design inspiration"
                width="1920"
                height="1080"
              />
            </figure>
            <span className="index-label">02 / Multiplex</span>
            <h3>More homes, carefully coordinated.</h3>
            <p>
              Bring together property goals, intended occupants, approvals,
              consultants and construction requirements in one project brief.
            </p>
          </article>
        </div>
      </section>

      <section className="build-sequence">
        <Reveal variant="clip">
          <ServiceImage
            src={detailImage}
            alt="Contemporary residential exterior used as multiplex design inspiration"
            caption="Residential form and exterior material inspiration"
          />
        </Reveal>
        <div>
          <p className="eyebrow">Before construction</p>
          <h2>
            Feasibility first.
            <br />
            <em>Then a buildable plan.</em>
          </h2>
          <ol>
            <li>
              <span>01</span>Property and project goals
            </li>
            <li>
              <span>02</span>Feasibility and approval requirements
            </li>
            <li>
              <span>03</span>Design and consultant coordination
            </li>
            <li>
              <span>04</span>Construction scope and sequencing
            </li>
            <li>
              <span>05</span>Build coordination and handover
            </li>
          </ol>
          <Link className="text-link" to="/estimator">
            Open the project estimator ↗
          </Link>
          <Link className="text-link" to="/how-it-works">
            See how projects move forward ↗
          </Link>
        </div>
      </section>

      <section className="editorial-section build-questions">
        <div>
          <p className="eyebrow">Start with what you know</p>
          <h2>
            Bring the address.
            <br />
            <em>Build the brief together.</em>
          </h2>
          <p>
            Property address, intended use, timing, budget context and any
            existing documents make the first conversation more useful.
          </p>
        </div>
        <QuestionList items={questions} />
      </section>

      <CTASection
        title="A custom home or multiplex starts with the property."
        description="Tell HIC what you hope to build and where. Start with a focused project conversation."
        cta="Discuss my project"
        to="/contact?service=custom-homes-multiplex"
      />
    </>
  );
}
