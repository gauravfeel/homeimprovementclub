import * as React from "react";

import { controlClassName } from "@/lib/control-class";
import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(controlClassName, "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground", className)}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
