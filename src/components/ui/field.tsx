import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const Field = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => <div ref={ref} className={cn("grid gap-2", className)} {...props} />,
);
Field.displayName = "Field";

const FieldLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label> & { required?: boolean }
>(({ className, required, children, ...props }, ref) => (
  <Label ref={ref} className={cn("text-[length:var(--type-ui)] font-semibold", className)} {...props}>
    {children}
    {required ? <span aria-hidden="true"> *</span> : null}
  </Label>
));
FieldLabel.displayName = "FieldLabel";

const FieldDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn("text-[length:var(--type-small)] text-muted-foreground", className)} {...props} />
  ),
);
FieldDescription.displayName = "FieldDescription";

const FieldError = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} role="alert" className={cn("text-[length:var(--type-small)] font-medium text-destructive", className)} {...props} />
  ),
);
FieldError.displayName = "FieldError";

export {
  Field,
  Field as FormField,
  FieldLabel,
  FieldLabel as FormLabel,
  FieldDescription,
  FieldDescription as FormDescription,
  FieldError,
  FieldError as FormMessage,
};
