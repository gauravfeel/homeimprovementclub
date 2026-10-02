import { cn } from "@/lib/utils";

export const controlClassName = cn(
  "flex min-h-12 w-full rounded-none border border-border bg-background px-3 py-2",
  "font-[family-name:var(--font-body)] text-base leading-normal text-foreground",
  "outline-none transition-[border-color] duration-200",
  "placeholder:text-muted-foreground hover:border-[var(--line-strong)]",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus-ring)]",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "aria-[invalid=true]:border-destructive",
);
