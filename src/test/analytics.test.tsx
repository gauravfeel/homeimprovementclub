import { afterEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render } from "@testing-library/react";
import { trackEvent } from "@/lib/analytics";
import { ContactInfo } from "@/components/ContactInfo";
import { WhatsAppButton } from "@/components/WhatsAppButton";
afterEach(() => {
  cleanup();
  delete window.dataLayer;
});
describe("conversion event contract", () => {
  it("preserves existing Google queue entries", () => {
    window.dataLayer = [{ event: "gtm.js" }];
    const queue = window.dataLayer;
    trackEvent({ event: "generate_lead", form_location: "contact_page" });
    expect(window.dataLayer).toBe(queue);
    expect(queue).toEqual([
      { event: "gtm.js" },
      { event: "generate_lead", form_location: "contact_page" },
    ]);
  });
  it("tracks a phone click with the existing payload", () => {
    const { getByRole } = render(<ContactInfo />);
    const phone = getByRole("link");
    phone.addEventListener("click", (e) => e.preventDefault());
    expect(phone).toHaveAttribute("href", "tel:+12363804423");
    fireEvent.click(phone);
    expect(window.dataLayer).toEqual([
      {
        event: "phone_click",
        lead_type: "phone",
        link_location: "contact_info",
      },
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
      {
        event: "whatsapp_click",
        lead_type: "whatsapp",
        link_location: location,
      },
    ]);
  });
});
