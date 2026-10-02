import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 flex items-end justify-between gap-10 max-sm:mb-8 max-sm:block",
        className,
      )}
    >
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
      </div>
      {description || action ? (
        <div>
          {description ? (
            <p className="mt-6 max-w-[440px] text-[length:var(--type-ui)] leading-[1.8] text-muted-foreground max-sm:mt-6">
              {description}
            </p>
          ) : null}
          {action}
        </div>
      ) : null}
    </div>
  );
}
