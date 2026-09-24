import { Phone } from "lucide-react";
import {
  CONTACT_PHONE_DISPLAY,
  CONTACT_PHONE_E164,
  CONTACT_PHONES,
} from "@/lib/contact";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

export type ContactInfoProps = {
  className?: string;
  /** Classes applied to the phone link (e.g. footer vs header colors) */
  linkClassName?: string;
  iconClassName?: string;
  showIcon?: boolean;
  /** Smaller text for dense headers */
  compact?: boolean;
  /** Footer and contact page show both published numbers */
  showAllPhones?: boolean;
};

export function ContactInfo({
  className,
  linkClassName,
  iconClassName,
  showIcon = true,
  compact = false,
  showAllPhones = false,
}: ContactInfoProps) {
  const phones = showAllPhones
    ? CONTACT_PHONES
    : [{ display: CONTACT_PHONE_DISPLAY, e164: CONTACT_PHONE_E164 }];

  return (
    <div
      className={cn(
        "flex min-w-0",
        showAllPhones ? "flex-col items-start gap-2" : "items-center gap-2",
        className,
      )}
    >
      {phones.map((phone) => (
        <div key={phone.e164} className="flex items-center gap-2">
          {showIcon && (
            <Phone
              className={cn(
                "shrink-0 text-primary",
                compact ? "h-[1em] w-[1em]" : "h-4 w-4",
                iconClassName,
              )}
              aria-hidden
            />
          )}
          <a
            href={`tel:+${phone.e164}`}
            onClick={() =>
              trackEvent({
                event: "phone_click",
                lead_type: "phone",
                link_location: "contact_info",
              })
            }
            className={cn(
              "tabular-nums tracking-tight font-medium underline-offset-2 hover:underline transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 rounded-sm",
              compact ? "text-xs sm:text-sm" : "text-sm",
              linkClassName,
            )}
            aria-label={`Call ${phone.display}`}
          >
            {phone.display}
          </a>
        </div>
      ))}
    </div>
  );
}
