import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { trackEvent, trackGoogleAdsLead } from "@/lib/analytics";
import { ContactInfo } from "@/components/ContactInfo";
import { WhatsAppButton } from "@/components/WhatsAppButton";
afterEach(() => {
  cleanup();
  delete window.dataLayer;
  delete window.gtag;
});
describe("conversion event contract", () => {
  it("queues a GA4 event before gtag is ready", () => {
    window.dataLayer = [{ event: "gtm.js" }];
    const queue = window.dataLayer;
    trackEvent({ event: "generate_lead", form_location: "contact_page" });
    expect(window.dataLayer).toBe(queue);
    expect(queue).toEqual([
      { event: "gtm.js" },
      ["event", "generate_lead", { form_location: "contact_page" }],
    ]);
  });

  it("sends generate_lead directly through the configured Google tag", () => {
    const gtag = vi.fn();
    window.gtag = gtag;
    trackEvent({
      event: "generate_lead",
      lead_type: "consultation_form",
      form_location: "contact_page",
    });
    expect(gtag).toHaveBeenCalledWith("event", "generate_lead", {
      lead_type: "consultation_form",
      form_location: "contact_page",
    });
  });

  it("sends successful leads to the native Google Ads conversion", () => {
    const gtag = vi.fn();
    window.gtag = gtag;

    trackGoogleAdsLead();

    expect(gtag).toHaveBeenCalledWith("event", "conversion", {
      send_to: "AW-18102151992/OKm5CL_S8qgcELjW47dD",
      value: 1,
      currency: "CAD",
    });
  });
  it("tracks a phone click with the existing payload", () => {
    const { getByRole } = render(<ContactInfo />);
    const phone = getByRole("link");
    phone.addEventListener("click", (e) => e.preventDefault());
    expect(phone).toHaveAttribute("href", "tel:+12363804423");
    fireEvent.click(phone);
    expect(window.dataLayer).toEqual([
      ["event", "phone_click", {
        lead_type: "phone",
        link_location: "contact_info",
      }],
    ]);
  });
  it.each([
    ["floating", "floating_button"],
    ["footer", "footer"],
  ] as const)("tracks WhatsApp %s", (variant, location) => {
    const { getByRole } = render(<WhatsAppButton variant={variant} />);
    const link = getByRole("link");
    link.addEventListener("click", (e) => e.preventDefault());
    expect(link.getAttribute("href")).toContain(
      "https://wa.me/12363804423?text=",
    );
    fireEvent.click(link);
    expect(window.dataLayer).toEqual([
      ["event", "whatsapp_click", {
        lead_type: "whatsapp",
        link_location: location,
      }],
    ]);
  });
});
