import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function EstimatorCta({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <aside className={cn("estimator-cta", compact && "is-compact", className)}>
      <div>
        <p className="eyebrow">Project estimator</p>
        <h2>
          Planning a build?
          <br />
          <em>Estimate your cost.</em>
        </h2>
      </div>
      <div>
        <p>
          Test floor area against a rate from $150 to $700 per sq ft. A planning
          figure, not a quote.
        </p>
        <Button asChild>
          <Link to="/estimator">
            Open estimator <ArrowUpRight size={17} />
          </Link>
        </Button>
      </div>
    </aside>
  );
}
