import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ImageCardProps {
  href: string;
  image: string;
  imageAlt: string;
  kicker?: string;
  title: string;
  description: string;
  cta?: string;
}

export function ImageCard({
  href,
  image,
  imageAlt,
  kicker,
  title,
  description,
  cta = "View project",
}: ImageCardProps) {
  return (
    <article className="grid gap-5">
      <Link className="block aspect-[4/3] overflow-hidden" to={href}>
        <img
          loading="lazy"
          src={image}
          alt={imageAlt}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
        />
      </Link>
      <div>
        {kicker ? <span className="index-label">{kicker}</span> : null}
        <h3 className="mb-3 mt-2 text-[length:clamp(1.35rem,1.1rem+0.6vw,1.75rem)]">
          <Link to={href}>{title}</Link>
        </h3>
        <p>{description}</p>
        <Button variant="link" asChild>
          <Link to={href}>
            {cta} <ArrowUpRight size={16} />
          </Link>
        </Button>
      </div>
    </article>
  );
}
