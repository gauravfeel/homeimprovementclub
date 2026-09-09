import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { ContactInfo } from "@/components/ContactInfo";
interface CTASectionProps {
  title?: string;
  description?: string;
  cta?: string;
  to?: string;
}
export default function CTASection({
  title = "Your next chapter starts at home.",
  description = "Tell us what you have in mind. Let’s talk through the possibilities with a free renovation consultation.",
  cta = "Book a free consultation",
  to = "/contact",
}: CTASectionProps) {
  return (
    <section className="consultation-section">
      <div>
        <p className="eyebrow">Let’s make room for it</p>
        <h2>{title}</h2>
      </div>
      <div>
        <p>{description}</p>
        <Link className="solid-link light" to={to}>
          {cta}
          <ArrowUpRight size={18} />
        </Link>
        <div className="cta-phone">
          <span>Prefer a conversation?</span>
          <ContactInfo linkClassName="text-white" iconClassName="text-white" />
        </div>
      </div>
    </section>
  );
}
