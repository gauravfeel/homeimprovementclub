import { Phone } from "lucide-react";
import { CONTACT_PHONE_DISPLAY, CONTACT_PHONE_E164 } from "@/lib/contact";
import { cn } from "@/lib/utils";

export type ContactInfoProps = {
  className?: string;
  /** Classes applied to the phone link (e.g. footer vs header colors) */
  linkClassName?: string;
  iconClassName?: string;
  showIcon?: boolean;
  /** Smaller text for dense headers */
  compact?: boolean;
};

export function ContactInfo({
  className,
  linkClassName,
  iconClassName,
  showIcon = true,
  compact = false,
}: ContactInfoProps) {
  const telHref = `tel:+${CONTACT_PHONE_E164}`;

  return (
    <div className={cn("flex items-center gap-2 min-w-0", className)}>
      {showIcon && (
        <Phone
          className={cn(
            "shrink-0 text-primary",
            compact ? "h-[1em] w-[1em]" : "h-4 w-4",
            iconClassName
          )}
          aria-hidden
        />
      )}
      <a
        href={telHref}
        className={cn(
          "tabular-nums tracking-tight font-medium underline-offset-2 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 rounded-sm",
          compact ? "text-xs sm:text-sm" : "text-sm",
          linkClassName
        )}
        aria-label={`Call ${CONTACT_PHONE_DISPLAY}`}
      >
        {CONTACT_PHONE_DISPLAY}
      </a>
    </div>
  );
}
