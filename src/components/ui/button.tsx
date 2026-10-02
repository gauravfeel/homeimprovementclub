import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "relative inline-flex items-center rounded-none font-[family-name:var(--font-body)] text-[length:var(--type-small)] font-medium tracking-normal transition-[background-color,color,border-color,transform] duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[5px] focus-visible:outline-[var(--focus-ring)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "min-h-[54px] justify-between gap-7 bg-primary px-[23px] py-4 text-primary-foreground hover:bg-[var(--forest-dark)] active:translate-y-px [&_svg]:transition-transform hover:[&_svg]:translate-x-[3px] hover:[&_svg]:-translate-y-0.5",
        primary:
          "min-h-[54px] justify-between gap-7 bg-primary px-[23px] py-4 text-primary-foreground hover:bg-[var(--forest-dark)] active:translate-y-px [&_svg]:transition-transform hover:[&_svg]:translate-x-[3px] hover:[&_svg]:-translate-y-0.5",
        hero:
          "min-h-[54px] justify-between gap-7 bg-primary px-[23px] py-4 text-primary-foreground hover:bg-[var(--forest-dark)] active:translate-y-px [&_svg]:transition-transform hover:[&_svg]:translate-x-[3px] hover:[&_svg]:-translate-y-0.5",
        secondary:
          "min-h-[54px] justify-between gap-7 bg-background px-[23px] py-4 text-foreground hover:bg-[var(--stone-deep)] active:translate-y-px [&_svg]:transition-transform hover:[&_svg]:translate-x-[3px] hover:[&_svg]:-translate-y-0.5",
        light:
          "min-h-[54px] justify-between gap-7 bg-background px-[23px] py-4 text-foreground hover:bg-[var(--stone-deep)] active:translate-y-px [&_svg]:transition-transform hover:[&_svg]:translate-x-[3px] hover:[&_svg]:-translate-y-0.5",
        outline:
          "min-h-[54px] justify-center gap-3 border border-[var(--line-strong)] bg-transparent px-[23px] py-4 text-foreground hover:bg-muted",
        ghost: "min-h-11 justify-center gap-3 bg-transparent px-3 py-2 text-foreground hover:text-[var(--sage)]",
        destructive:
          "min-h-[54px] justify-center gap-3 bg-destructive px-[23px] py-4 text-destructive-foreground hover:bg-[var(--ink-warm)] hover:text-[var(--ivory-bright)]",
        link: "w-fit min-h-11 justify-between gap-5 border-b border-[var(--line-strong)] bg-transparent py-2 text-foreground hover:text-[var(--sage)]",
        "hero-outline":
          "w-fit min-h-11 justify-between gap-5 border-b border-[var(--line-strong)] bg-transparent py-2 text-foreground hover:text-[var(--sage)]",
      },
      size: {
        default: "",
        sm: "min-h-11 gap-4 px-4 py-[11px]",
        md: "",
        lg: "w-full justify-between",
        xl: "w-full justify-between",
        icon: "h-11 w-11 min-h-11 justify-center gap-0 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    const isDisabled = disabled || loading;

    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        disabled={asChild ? undefined : isDisabled}
        aria-busy={loading || undefined}
        aria-disabled={asChild && isDisabled ? true : undefined}
        {...props}
      >
        {loading && !asChild ? (
          <>
            <span className="invisible inline-flex w-full items-center justify-between gap-7">{children}</span>
            <Loader2
              className="pointer-events-none absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 animate-spin"
              aria-hidden="true"
            />
          </>
        ) : (
          children
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
