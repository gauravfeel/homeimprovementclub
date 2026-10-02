import { PROCESS, GENERAL_FAQS } from "@/data/renovation";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ServiceFeatureCard } from "@/components/sections/service-feature-card";
import { ServiceListCard } from "@/components/ServiceCard";
import { SERVICES } from "@/data/services";
import { SERVICE_CITIES } from "@/lib/service-area";
import { FaqList } from "@/components/FaqList";
import { Button } from "@/components/ui/button";
import { editorialFrame, editorialWidth } from "@/lib/editorial-frame";
import { cn } from "@/lib/utils";

export function ProcessSection() {
  return (
    <section
      className={cn(
        editorialWidth,
        "grid grid-cols-1 gap-[100px] py-[120px] max-[1190px]:gap-[50px] max-[900px]:gap-[45px] max-sm:gap-[35px] max-sm:py-[65px] min-[641px]:grid-cols-[1fr_1.05fr]",
      )}
      id="process"
    >
      <div>
        <p className="eyebrow">How it comes together</p>
        <h2>
          From an idea.
          <br />
          <em>To your everyday.</em>
        </h2>
        <Button variant="link" className="mt-[35px] max-sm:mt-6" asChild>
          <Link to="/how-it-works">
            Explore the process <ArrowUpRight size={18} />
          </Link>
        </Button>
      </div>
      <ol className="list-none">
        {PROCESS.map((step, i) => (
          <li
            key={step.title}
            className="grid grid-cols-[45px_1fr] gap-[26px] border-t border-border py-[25px] max-sm:grid-cols-[36px_1fr] max-sm:gap-[15px] max-sm:py-[22px]"
          >
            <span className="font-display text-2xl tabular-nums text-[var(--sage-muted)]">0{i + 1}</span>
            <div>
              <h3 className="mb-3">{step.title}</h3>
              <p className="max-w-[415px] text-[length:var(--type-ui)] text-muted-foreground">{step.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
export function AreaSection() {
  return (
    <section
      className={cn(
        editorialWidth,
        "relative isolate grid grid-cols-1 gap-[90px] border-y border-border py-[82px] max-[1190px]:gap-[50px] max-[900px]:gap-[35px] max-sm:gap-[25px] min-[901px]:grid-cols-2",
      )}
    >
      <div>
        <p className="eyebrow">Close to home</p>
        <h2>
          Building and renovating across
          <br />
          <em>the Fraser Valley and Greater Vancouver.</em>
        </h2>
        <p className="mt-6 max-w-[440px] text-[length:var(--type-body)] leading-[1.8] text-muted-foreground">
          From custom homes and multiplex projects to kitchens and bathrooms.
          Tell us where the property is and what you have in mind.
        </p>
        <Button variant="link" className="mt-[23px]" asChild>
          <Link to="/areas-we-serve">
            Our service area <ArrowUpRight size={18} />
          </Link>
        </Button>
      </div>
      <ul className="grid grid-cols-2 gap-x-8 self-center max-sm:gap-x-[25px]">
        {SERVICE_CITIES.map((city) => (
          <li
            key={city}
            className="flex items-center justify-between border-b border-border py-[22px] text-[length:var(--type-ui)] max-sm:py-[17px] max-sm:text-[length:var(--type-small)]"
          >
            {city}
            <span aria-hidden="true" className="text-[var(--sage-muted)]">
              ↗
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function FAQSection({
  items = GENERAL_FAQS,
  title = "A little clarity, before you begin.",
}: {
  items?: readonly {
    question: string;
    answer: string;
  }[];
  title?: string;
}) {
  return (
    <section
      className={cn(
        editorialFrame,
        "relative isolate grid grid-cols-1 gap-[100px] before:pointer-events-none before:absolute before:inset-0 before:left-1/2 before:z-[-1] before:ml-[-50vw] before:w-screen before:bg-[var(--stone)] max-[1190px]:gap-[50px] max-[900px]:gap-[45px] max-sm:gap-[35px] min-[641px]:grid-cols-[1fr_1.15fr]",
      )}
    >
      <div>
        <p className="eyebrow">Good questions</p>
        <h2 className="max-w-[440px]">{title}</h2>
        <Button variant="link" className="mt-7" asChild>
          <Link to="/contact">
            Ask us about your home <ArrowUpRight size={18} />
          </Link>
        </Button>
      </div>
      <FaqList items={items} />
    </section>
  );
}
export function ServiceCollection() {
  return (
    <div>
      <div className="grid grid-cols-1 items-start gap-10 min-[641px]:grid-cols-[1.15fr_1fr] max-sm:gap-9">
        {SERVICES.slice(0, 2).map((s, i) => (
          <ServiceFeatureCard
            key={s.slug}
            href={`/services/${s.slug}`}
            image={s.image}
            label={s.label}
            description={s.short}
            index={`0${i + 1}`}
            offset={i === 1}
          />
        ))}
      </div>
      <div className="mt-[60px] grid grid-cols-2 gap-7 max-[900px]:gap-[30px] min-[901px]:grid-cols-4 max-sm:mt-[42px] max-sm:gap-x-5 max-sm:gap-y-7">
        {SERVICES.slice(2).map((s, i) => (
          <ServiceListCard
            key={s.slug}
            href={`/services/${s.slug}`}
            label={s.label}
            description={s.short}
            index={`0${i + 3}`}
          />
        ))}
      </div>
    </div>
  );
}
