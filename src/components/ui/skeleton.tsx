import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-none bg-[var(--stone)]", className)}
      aria-hidden="true"
      {...props}
    />
  );
}

export { Skeleton };
