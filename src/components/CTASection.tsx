import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ContactInfo } from "@/components/ContactInfo";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  title?: string;
  description?: string;
  cta?: string;
  to?: string;
}
export default function CTASection({
  title = "Your next chapter starts at home.",
  description = "Tell us what you have in mind. Let’s talk through the property, scope and next useful step.",
  cta = "Book a free consultation",
  to = "/contact",
}: CTASectionProps) {
  return (
    <section className="grid grid-cols-1 gap-[100px] bg-primary px-6 py-[85px] text-primary-foreground max-[1190px]:gap-[55px] max-[1190px]:px-10 max-[900px]:gap-[35px] max-sm:gap-7 max-sm:px-6 max-sm:py-[55px] min-[641px]:grid-cols-[1.2fr_1fr] min-[641px]:px-[max(3.5rem,calc((100vw-81rem)/2))]">
      <div>
        <p className="eyebrow text-[var(--on-forest-muted)]">Let’s make room for it</p>
        <h2 className="max-w-[570px] max-sm:max-w-[350px]">{title}</h2>
      </div>
      <div>
        <p className="mb-[25px] max-w-[390px] text-[length:var(--type-body)] leading-[1.9] text-[var(--on-forest-muted)]">
          {description}
        </p>
        <Button variant="light" asChild>
          <Link to={to}>
            {cta}
            <ArrowUpRight size={18} />
          </Link>
        </Button>
        <div className="mt-[25px] flex flex-wrap items-center gap-x-5 gap-y-3 text-[length:var(--type-meta)] text-[var(--on-forest-muted)] max-sm:gap-x-[15px]">
          <span>Prefer a conversation?</span>
          <ContactInfo linkClassName="text-white min-h-11 inline-flex items-center" iconClassName="text-white" />
        </div>
      </div>
    </section>
  );
}
