/** Display format for UI */
export const CONTACT_PHONE_DISPLAY = "+1 236-380-4423";

/** E.164 without spaces for tel: and wa.me */
export const CONTACT_PHONE_E164 = "12363804423";

export const WHATSAPP_PREFILL_MESSAGE = "Hi! I would like a quote for my home improvement project.";

export function getWhatsAppChatUrl(): string {
  const text = encodeURIComponent(WHATSAPP_PREFILL_MESSAGE);
  return `https://wa.me/${CONTACT_PHONE_E164}?text=${text}`;
}
