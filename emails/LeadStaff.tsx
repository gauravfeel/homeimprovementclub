import React from "react";
import { Button, Hr, Link, Section, Text } from "@react-email/components";
import { HicLayout } from "./HicLayout";
import type { LeadEmailData } from "./types";

function formatBudget(value?: string) {
  if (!value) return "Not provided";
  const amount = Number(value.replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(amount)) return value;
  return new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <Section className="border-0 border-b border-solid border-line py-[12px]">
      <Text className="m-0 mb-[3px] font-sans text-[11px] font-semibold uppercase leading-[16px] tracking-[0.08em] text-sage-muted">
        {label}
      </Text>
      <Text className="m-0 font-sans text-[15px] leading-[22px] text-ink">
        {children}
      </Text>
    </Section>
  );
}

export function LeadStaffEmail(lead: LeadEmailData) {
  const name = [lead.firstName, lead.lastName].filter(Boolean).join(" ");
  const mailHref = `mailto:${lead.email}`;
  const telHref = lead.phone ? `tel:${lead.phone.replace(/[^\d+]/g, "")}` : "";
  const project = lead.projectType || "Project enquiry";
  const place = lead.city || lead.propertyAddress || "Location not provided";
  const source = lead.source === "lead_popup" ? "Website popup" : "Contact page";

  return (
    <HicLayout preview={`${project} lead from ${name || lead.email} in ${place}`}>
      <Text className="m-0 mb-[10px] font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-sage-muted">
        New website lead
      </Text>
      <Text className="font-serif m-0 mb-[10px] text-[32px] leading-[1.16] text-ink">
        {project} in {lead.city || "your service area"}
      </Text>
      <Text className="m-0 mb-[22px] font-sans text-[16px] leading-[25px] text-ink-muted">
        {name || "A prospect"} wants to discuss a project. Best time to reach them: {lead.bestContactTime || "not specified"}.
      </Text>
      <Section className="rounded-[7px] border border-solid border-line bg-stone px-[18px] py-[4px]">
        <Detail label="Prospect">{name || "Name not provided"}</Detail>
        <Detail label="Contact">
          <Link href={mailHref} className="text-forest no-underline">{lead.email}</Link>
          {lead.phone ? <><br /><Link href={telHref} className="text-forest no-underline">{lead.phone}</Link></> : null}
        </Detail>
        <Detail label="Property">{[lead.propertyAddress, lead.city].filter(Boolean).join(", ") || "Not provided"}</Detail>
        <Detail label="Project & budget">{project}<br />{formatBudget(lead.budget)}</Detail>
        <Detail label="Preferred contact time">{lead.bestContactTime || "Not provided"}</Detail>
        {lead.message ? <Detail label="Project notes">{lead.message}</Detail> : null}
      </Section>
      <Button
        href={mailHref}
        className="mt-[24px] box-border rounded-[5px] bg-forest px-[22px] py-[13px] text-center font-sans text-[15px] font-semibold text-on-forest no-underline"
      >
        Email {lead.firstName || "this prospect"}
      </Button>
      <Hr className="my-[22px] border-line" />
      <Text className="m-0 font-sans text-[12px] leading-[18px] text-ink-muted">
        Submitted through {source}. Replying to this email sends your response directly to {lead.email}.
      </Text>
    </HicLayout>
  );
}

LeadStaffEmail.PreviewProps = {
  source: "contact_page",
  firstName: "Alex",
  lastName: "Chen",
  email: "alex@example.com",
  phone: "+1 604-555-0142",
  propertyAddress: "123 Main Street",
  city: "Vancouver",
  bestContactTime: "Morning",
  projectType: "Kitchen",
  budget: "45000",
  message: "Looking to redo the kitchen and open the wall to the dining room.",
} satisfies LeadEmailData;

export default LeadStaffEmail;
