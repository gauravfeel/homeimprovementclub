import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import CTASection from "@/components/CTASection";
import SEO from "@/components/SEO";
import {
  AreaSection,
  FAQSection,
  ProcessSection,
  ServiceCollection,
} from "@/components/RenovationSections";
import residentialExterior from "@/assets/lux-exterior.jpg";
import lighting from "@/assets/lux-lighting.jpg";
import ProjectGallery from "@/components/ProjectGallery";
import Reveal from "@/components/Reveal";
import { SectionHeader } from "@/components/sections/section-header";
import { editorialFrame } from "@/lib/editorial-frame";
import {
  FAQ_PAGE_SCHEMA,
  HOME_BUSINESS_SCHEMA,
  SERVICE_DIRECTORY_SCHEMA,
} from "@/lib/geo-schema";
import { SITE_POSITIONING, SERVICE_AREA } from "@/lib/service-area";
import { cn } from "@/lib/utils";

export default function Index() {
  return (
    <Layout>
      <SEO
        title={`${SITE_POSITIONING} | Home Improvement Club`}
        description={`${SITE_POSITIONING}. Custom homes, multiplex, and renovations across ${SERVICE_AREA}.`}
        canonical="/"
        schema={[
          HOME_BUSINESS_SCHEMA,
          FAQ_PAGE_SCHEMA,
          SERVICE_DIRECTORY_SCHEMA,
        ]}
      />
      <section className="mx-auto grid min-h-[650px] max-w-[1600px] grid-cols-1 max-[900px]:min-h-[580px] min-[641px]:grid-cols-2 min-[1600px]:border-x min-[1600px]:border-border">
        <div className="flex flex-col items-start justify-center px-6 pb-9 pt-12 max-[900px]:px-[25px] max-[900px]:py-[60px] max-[1190px]:px-8 max-[1190px]:pb-11 max-[1190px]:pt-[75px] min-[641px]:px-10 min-[641px]:pb-[52px] min-[641px]:pt-[100px] min-[641px]:pl-[max(3.5rem,calc((100vw-81rem)/2))] min-[1600px]:pl-[100px]">
          <p className="eyebrow mb-8 text-[length:var(--type-caption)] max-sm:mb-[23px]">
            Fraser Valley · Greater Vancouver
          </p>
          <h1 className="mb-7 text-[length:var(--type-display)] tracking-[-0.02em] max-sm:mb-[22px] max-[760px]:[&_br]:hidden max-[760px]:[&_em]:block">
            Fraser Valley's Premier
            <br />
            <em>Custom Home Builder.</em>
          </h1>
          <p className="max-w-[410px] text-[length:var(--type-large)] leading-[1.6] text-muted-foreground max-sm:text-[length:var(--type-ui)] max-sm:leading-[1.8]">
            Custom homes, multiplex, and renovations
            <br className="max-sm:hidden" /> across the Fraser Valley and Greater Vancouver.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-[22px] max-[1190px]:gap-3 max-[900px]:flex-col max-[900px]:items-start max-sm:mt-[25px] max-sm:w-full max-sm:flex-row max-sm:items-center max-sm:gap-2.5 max-[760px]:flex-wrap">
            <Button asChild>
              <Link to="/contact">
                Discuss your project <ArrowUpRight size={18} />
              </Link>
            </Button>
            <Button variant="link" className="border-0 text-[length:var(--type-meta)]" asChild>
              <a href="#services">
                Explore services <ArrowDown size={16} />
              </a>
            </Button>
          </div>
          <div className="mt-[62px] flex items-center gap-2.5 text-[length:var(--type-meta)] text-muted-foreground max-[900px]:mt-9 max-sm:hidden">
            <span aria-hidden="true" className="h-px w-6 bg-[var(--sage-muted)]" /> Build new. Add homes. Renovate well.
          </div>
        </div>
        <figure className="hero-image relative min-h-[650px] max-[900px]:min-h-[580px] max-sm:min-h-[330px]">
          <img
            src={residentialExterior}
            alt="Contemporary residential exterior used as custom-home design inspiration"
            width="1920"
            height="1080"
            fetchPriority="high"
            className="absolute h-full w-full object-cover object-[56%]"
          />
          <figcaption className="absolute inset-x-0 bottom-0 flex justify-between gap-2.5 bg-[color-mix(in_srgb,var(--forest-hover)_95%,transparent)] px-6 py-4 text-[length:var(--type-caption)] text-primary-foreground max-sm:px-[15px] max-sm:py-[13px] max-[760px]:flex-wrap">
            <span>Built around the property and the people within it.</span>
            <span>Design inspiration</span>
          </figcaption>
        </figure>
      </section>
      <section className={cn(editorialFrame, "grid grid-cols-1 gap-10 pb-[110px] min-[641px]:grid-cols-[1fr_2fr] max-[900px]:gap-[30px] max-sm:block")}>
          <p className="eyebrow max-sm:mb-[25px] min-[641px]:pt-2.5">Home Improvement Club</p>
        <div>
          <Reveal variant="heading">
            <h2>
              One builder.
              <br />
              <em>More ways to move forward.</em>
            </h2>
          </Reveal>
          <div className="mt-[30px] grid grid-cols-1 items-end gap-[60px] min-[901px]:grid-cols-[1fr_auto] max-[900px]:gap-5 max-sm:mt-[25px] max-sm:gap-[18px]">
            <p className="max-w-[520px] text-[length:var(--type-body)] text-muted-foreground">
              HIC builds custom homes, brings multiplex expertise to residential
              projects and continues to deliver renovations. Start with the
              property, the home you want, or the rooms ready to change.
            </p>
            <Button variant="link" asChild>
              <Link to="/about">
                Meet HIC <ArrowUpRight size={18} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <section
        className={cn(editorialFrame, "relative isolate border-t border-border pt-[74px]")}
        id="services"
      >
        <SectionHeader
          eyebrow="Build new · Add homes · Renovate"
          title={
            <>
              Start with the
              <br />
              <em>right project path.</em>
            </>
          }
          description={
            <>
              Plan a custom home or multiplex. Improve one room or the whole home.
              <br />
              Explore the work HIC can help you move forward.
            </>
          }
        />
        <ServiceCollection />
      </section>
      <section className="mx-auto mt-5 grid max-w-[1600px] grid-cols-1 bg-[var(--stone)] min-[641px]:grid-cols-2 max-sm:mt-0">
        <figure className="relative min-h-[580px] max-[900px]:min-h-[500px] max-sm:min-h-[340px]">
          <img
            src={lighting}
            alt="Living room lighting inspiration with warm architectural light and natural materials"
            loading="lazy"
            width="1920"
            height="1080"
            className="absolute h-full w-full object-cover"
          />
          <figcaption className="absolute bottom-3.5 left-[18px] bg-[color-mix(in_srgb,var(--forest-hover)_91%,transparent)] px-2.5 py-1.5 text-[length:var(--type-caption)] text-white">
            Design inspiration · Light, texture and proportion
          </figcaption>
        </figure>
        <div className="self-center px-[60px] py-[90px] max-[1190px]:px-10 max-[1190px]:py-16 max-sm:px-6 max-sm:pb-[60px] max-sm:pt-[50px]">
          <p className="eyebrow">The details matter</p>
          <h2>
            Beautiful is how it looks.
            <br />
            <em>Better is how it lives.</em>
          </h2>
          <p className="my-7 max-w-[410px] text-[length:var(--type-body)] text-muted-foreground max-sm:my-[25px]">
            A place for the things you use. Light where you need it. Materials
            that suit your routine. The most useful renovation conversations
            start with your everyday life.
          </p>
          <Button variant="link" asChild>
            <Link to="/contact">
              Tell us what matters to you <ArrowUpRight size={18} />
            </Link>
          </Button>
        </div>
      </section>
      <ProcessSection />
      <ProjectGallery />
      <AreaSection />
      <FAQSection />
      <CTASection />
    </Layout>
  );
}
