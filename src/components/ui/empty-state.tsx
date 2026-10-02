import * as React from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: string;
  title: string;
  description: React.ReactNode;
  action?: React.ReactNode;
}

function EmptyState({ className, eyebrow, title, description, action, ...props }: EmptyStateProps) {
  return (
    <div className={cn("grid max-w-xl gap-4 py-6", className)} {...props}>
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="!text-[length:var(--type-h3)]">{title}</h2>
      <div className="text-[var(--ink-muted)]">{description}</div>
      {action ? <div className="ds-row">{action}</div> : null}
    </div>
  );
}

function EmptyStateAction(props: React.ComponentProps<typeof Button>) {
  return <Button {...props} />;
}

export { EmptyState, EmptyStateAction };
