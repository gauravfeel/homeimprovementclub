import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

interface ServiceFeatureCardProps {
  href: string;
  image: string;
  label: string;
  description: string;
  index: string;
  offset?: boolean;
}

export function ServiceFeatureCard({
  href,
  image,
  label,
  description,
  index,
  offset = false,
}: ServiceFeatureCardProps) {
  return (
    <Link className={cn("group block", offset && "mt-[85px] max-sm:mt-0")} to={href}>
      <div
        className={cn(
          "relative overflow-hidden",
          offset ? "aspect-[1.13] max-sm:aspect-[1.2]" : "aspect-[1.35] max-sm:aspect-[1.2]",
        )}
      >
        <img
          src={image}
          alt={`${label} design inspiration`}
          loading="lazy"
          width="1920"
          height="1080"
          className="h-full w-full object-cover transition-transform [transition-duration:650ms] group-hover:scale-[1.025]"
        />
        <span className="absolute bottom-3 left-[15px] bg-[color-mix(in_srgb,var(--ivory)_91%,transparent)] px-1.5 py-1 text-[length:var(--type-caption)] text-foreground">
          Design inspiration
        </span>
      </div>
      <div className="grid grid-cols-[20px_1fr_24px] items-start gap-[15px] pt-[22px] max-sm:gap-3 max-sm:pt-[19px]">
        <span className="index-label pt-1">{index}</span>
        <div>
          <h3 className="mb-2.5">{label}</h3>
          <p className="max-w-[360px] text-[length:var(--type-ui)] text-muted-foreground max-sm:text-[length:var(--type-small)]">
            {description}
          </p>
        </div>
        <ArrowUpRight aria-hidden="true" />
      </div>
    </Link>
  );
}
