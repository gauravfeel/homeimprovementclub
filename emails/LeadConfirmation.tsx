import React from "react";
import { Button, Hr, Link, Section, Text } from "@react-email/components";
import { HicLayout } from "./HicLayout";
import { siteUrl } from "./theme";
import {
  CALENDLY_CONSULT_URL,
  CONSULT_HOURS,
  CONTACT_PHONE_DISPLAY,
} from "../src/lib/contact";

type LeadConfirmationProps = {
  firstName: string;
  projectType?: string;
};

export function LeadConfirmationEmail({
  firstName,
  projectType,
}: LeadConfirmationProps) {
  const site = siteUrl();
  const project = projectType ? projectType.toLowerCase() : "home project";
  return (
    <HicLayout preview="Your details are with HIC—choose a convenient time to talk">
      <Text className="m-0 mb-[10px] font-sans text-[12px] font-semibold uppercase tracking-[0.1em] text-sage-muted">
        Your enquiry is in
      </Text>
      <Text className="font-serif m-0 mb-[14px] text-[34px] leading-[1.14] text-ink">
        Let’s talk about your {project}.
      </Text>
      <Text className="m-0 mb-[18px] font-sans text-[16px] leading-[26px] text-ink">
        Hi {firstName}, thanks for reaching out to Home Improvement Club. Your project details have reached our team.
      </Text>
      <Text className="m-0 mb-[24px] font-sans text-[16px] leading-[26px] text-ink-muted">
        Choose a convenient time below for a 30-minute consultation. We’ll use the call to understand your goals, property and next steps.
      </Text>
      <Button
        href={CALENDLY_CONSULT_URL}
        className="box-border rounded-[5px] bg-forest px-[24px] py-[14px] text-center font-sans text-[15px] font-semibold text-on-forest no-underline"
      >
        Choose a consultation time
      </Button>
      <Text className="m-0 mt-[12px] font-sans text-[12px] leading-[18px] text-ink-muted">
        Booking times are available between {CONSULT_HOURS}.
      </Text>
      <Hr className="my-[26px] border-line" />
      <Section>
        <Text className="m-0 mb-[8px] font-serif text-[21px] leading-[28px] text-ink">Prefer to speak sooner?</Text>
        <Text className="m-0 font-sans text-[14px] leading-[22px] text-ink-muted">
          Call <Link href="tel:+12363804423" className="font-semibold text-forest no-underline">{CONTACT_PHONE_DISPLAY}</Link>, reply to this email, or visit <Link href={site} className="text-forest no-underline">our website</Link>.
        </Text>
      </Section>
    </HicLayout>
  );
}

LeadConfirmationEmail.PreviewProps = {
  firstName: "Alex",
  projectType: "Kitchen",
} satisfies LeadConfirmationProps;

export default LeadConfirmationEmail;
