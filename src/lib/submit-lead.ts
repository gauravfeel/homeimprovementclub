export type LeadSource = "contact_page" | "lead_popup";

export type LeadPayload = {
  source: LeadSource;
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  propertyAddress?: string;
  city?: string;
  bestContactTime?: string;
  projectType?: string;
  budget?: string;
  message?: string;
  company?: string;
};

export async function submitLead(payload: LeadPayload) {
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error("Lead submit failed");
  }
}
