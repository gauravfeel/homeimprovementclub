/** Display format for UI */
export const CONTACT_PHONE_DISPLAY = "+1 236-380-4423";

/** E.164 without spaces for tel: and wa.me */
export const CONTACT_PHONE_E164 = "12363804423";

export const CONTACT_PHONE_SECONDARY_DISPLAY = "+1 (778) 999-8471";
export const CONTACT_PHONE_SECONDARY_E164 = "17789998471";

export const CONTACT_PHONES = [
  { display: CONTACT_PHONE_DISPLAY, e164: CONTACT_PHONE_E164 },
  {
    display: CONTACT_PHONE_SECONDARY_DISPLAY,
    e164: CONTACT_PHONE_SECONDARY_E164,
  },
] as const;

export const WHATSAPP_PREFILL_MESSAGE = "Hi! I would like a quote for my home improvement project.";

export const CALENDLY_CONSULT_URL = "https://calendly.com/homeimprovementclub-co/30min";

export const CONSULT_HOURS = "9 am–6 pm";

export function getWhatsAppChatUrl(): string {
  const text = encodeURIComponent(WHATSAPP_PREFILL_MESSAGE);
  return `https://wa.me/${CONTACT_PHONE_E164}?text=${text}`;
}
