import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
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
  children: React.ReactNode;
}) {
  return (
    <Link className="solid-link" to={`/contact?service=${service.slug}`}>
      {children}
      <ArrowUpRight size={18} />
    </Link>
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
}: {
  items: { question: string; answer: string }[];
}) {
  return (
    <div className="faq-list">
      {items.map((q) => (
        <details key={q.question}>
          <summary>
            {q.question}
            <span aria-hidden="true">+</span>
          </summary>
          <p>{q.answer}</p>
        </details>
      ))}
    </div>
  );
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
