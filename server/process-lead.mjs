const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value, max = 500) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function json(status, body) {
  return { status, body };
}

export async function processLead(raw) {
  if (clean(raw.company, 80)) {
    return json(200, { ok: true });
  }

  const lead = {
    source: clean(raw.source, 40) || "contact_page",
    firstName: clean(raw.firstName, 100),
    lastName: clean(raw.lastName, 100),
    email: clean(raw.email, 255).toLowerCase(),
    phone: clean(raw.phone, 20),
    propertyAddress: clean(raw.propertyAddress, 200),
    city: clean(raw.city, 100),
    bestContactTime: clean(raw.bestContactTime, 40),
    projectType: clean(raw.projectType, 120),
    budget: clean(raw.budget, 40),
    message: clean(raw.message, 1000),
  };

  if (!lead.firstName || !EMAIL_RE.test(lead.email)) {
    return json(400, { ok: false, error: "Name and a valid email are required." });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const notifyTo = process.env.LEAD_NOTIFY_TO || "homeimprovementclub.co@gmail.com";
  const from =
    process.env.RESEND_FROM ||
    "Home Improvement Club <onboarding@resend.dev>";
  const sheetWebhook = process.env.GOOGLE_SHEETS_WEBHOOK;

  if (!resendKey) {
    return json(503, { ok: false, error: "Lead email is not configured." });
  }

  const when = new Date().toISOString();
  const subject =
    lead.source === "lead_popup"
      ? "New HIC lead (popup)"
      : "New HIC consultation request";
  const lines = [
    `Source: ${lead.source}`,
    `Time: ${when}`,
    `Name: ${lead.firstName} ${lead.lastName}`.trim(),
    `Email: ${lead.email}`,
    `Phone: ${lead.phone || "—"}`,
    `Address: ${lead.propertyAddress || "—"}`,
    `City: ${lead.city || "—"}`,
    `Best time: ${lead.bestContactTime || "—"}`,
    `Project: ${lead.projectType || "—"}`,
    `Budget: ${lead.budget || "—"}`,
    "",
    lead.message || "(no message)",
  ];
  const text = lines.join("\n");

  const mail = {
    from,
    to: [notifyTo],
    reply_to: lead.email,
    subject,
    text,
    html: `<pre style="font:14px/1.5 ui-sans-serif,system-ui">${text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")}</pre>`,
  };

  const mailRes = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(mail),
  });
  if (!mailRes.ok) {
    const detail = await mailRes.text();
    console.error("Resend failed", mailRes.status, detail);
    return json(502, { ok: false, error: "Could not send the notification email." });
  }

  if (sheetWebhook) {
    const sheetRes = await fetch(sheetWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...lead,
        receivedAt: when,
      }),
      redirect: "follow",
    });
    if (!sheetRes.ok) {
      console.error("Sheets webhook failed", sheetRes.status, await sheetRes.text());
    }
  }

  return json(200, { ok: true });
}
