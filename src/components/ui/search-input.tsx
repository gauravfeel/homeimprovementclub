import * as React from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const SearchInput = React.forwardRef<HTMLInputElement, React.ComponentProps<typeof Input>>(
  ({ className, ...props }, ref) => (
    <div className="relative">
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--forest)]"
      />
      <Input ref={ref} type="search" className={cn("pl-10", className)} {...props} />
    </div>
  ),
);
SearchInput.displayName = "SearchInput";

export { SearchInput };
