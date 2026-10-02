import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { ServiceFeatureCard } from "@/components/sections/service-feature-card";

interface ServiceCardProps {
  icon?: LucideIcon;
  title: string;
  desc: string;
  href: string;
  image: string;
  delay?: number;
  index?: string;
}

const ServiceCard = ({ title, desc, href, image, index = "01" }: ServiceCardProps) => (
  <ServiceFeatureCard
    href={href}
    image={image}
    label={title}
    description={desc}
    index={index}
  />
);

export function ServiceListCard({
  href,
  label,
  description,
  index,
}: {
  href: string;
  label: string;
  description: string;
  index: string;
}) {
  return (
    <Link
      to={href}
      className="grid grid-cols-[1fr_auto] gap-x-2 gap-y-[17px] border-t border-border pt-5"
    >
      <span className="index-label col-span-full">{index}</span>
      <h3 className="text-[length:clamp(1.375rem,1.1rem+0.6vw,1.75rem)]">{label}</h3>
      <ArrowUpRight size={20} />
      <p className="col-span-full max-w-[240px] text-[length:var(--type-small)] text-muted-foreground">
        {description}
      </p>
    </Link>
  );
}

export default ServiceCard;
