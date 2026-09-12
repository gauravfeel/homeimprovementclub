import React from "react";
import { render } from "@react-email/render";
import { LeadConfirmationEmail } from "./LeadConfirmation";
import { LeadStaffEmail } from "./LeadStaff";
import type { LeadEmailData } from "./types";

export async function renderStaffLeadHtml(lead: LeadEmailData) {
  return render(<LeadStaffEmail {...lead} />);
}

export async function renderProspectHtml(lead: LeadEmailData) {
  return render(
    <LeadConfirmationEmail
      firstName={lead.firstName}
      projectType={lead.projectType}
    />,
  );
}
