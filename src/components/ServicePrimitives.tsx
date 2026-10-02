import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FaqList } from "@/components/FaqList";
import type { Service } from "@/data/services";
import { SERVICES } from "@/data/services";
export function ServiceBreadcrumb({ label }: { label: string }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      <span>/</span>
      <Link to="/services">Services</Link>
      <span>/</span>
      <span>{label}</span>
    </nav>
  );
}
export function EnquiryLink({
  service,
  children,
}: {
  service: Service;
  children: ReactNode;
}) {
  return (
    <Button asChild>
      <Link to={`/contact?service=${service.slug}`}>
        {children}
        <ArrowUpRight size={18} />
      </Link>
    </Button>
  );
}
export function ServiceImage({
  src,
  alt,
  caption,
  eager = false,
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  eager?: boolean;
  className?: string;
}) {
  return (
    <figure className={`editorial-photo ${className}`}>
      <img
        src={src}
        alt={alt}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : undefined}
        width="1920"
        height="1080"
      />
      <figcaption>Design inspiration · {caption}</figcaption>
    </figure>
  );
}
export function QuestionList({
  items,
  className,
}: {
  items: { question: string; answer: string }[];
  className?: string;
}) {
  return <FaqList items={items} className={className} />;
}
export function RelatedLinks({ slugs }: { slugs: string[] }) {
  return (
    <div className="related-links">
      {slugs.map((slug) => {
        const s = SERVICES.find((s) => s.slug === slug);
        return s ? (
        <Link className="text-link" key={slug} to={`/services/${slug}`}>
            {s.label}
            <ArrowUpRight size={18} />
          </Link>
        ) : null;
      })}
    </div>
  );
}
