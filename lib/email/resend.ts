import { Resend } from "resend";

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  service?: string;
  message: string;
}

export async function sendContactEmail(payload: ContactPayload) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  // Day 1–3: no Resend credentials yet. Log to the console instead of
  // failing, so the contact form is testable before Day 4 wiring lands.
  if (!apiKey || !to || !from) {
    console.log("[contact form] Resend not configured. Submission:", payload);
    return;
  }

  const resend = new Resend(apiKey);

  await resend.emails.send({
    to,
    from,
    replyTo: payload.email,
    subject: `New inquiry from ${payload.name}${
      payload.company ? ` (${payload.company})` : ""
    }`,
    html: renderContactEmail(payload),
  });
}

function renderContactEmail(p: ContactPayload) {
  const row = (label: string, value?: string) =>
    value
      ? `<tr><td style="padding:4px 12px 4px 0;color:#3A5570;font-size:13px;white-space:nowrap;">${label}</td><td style="padding:4px 0;color:#0A2540;font-size:14px;">${escapeHtml(
          value
        )}</td></tr>`
      : "";

  return `
    <div style="font-family:Inter,Arial,sans-serif;max-width:520px;margin:0 auto;">
      <div style="background:#0A2540;padding:24px;border-radius:12px 12px 0 0;">
        <p style="color:#fff;font-size:16px;font-weight:600;margin:0;">Enelope — New contact form submission</p>
      </div>
      <div style="border:1px solid #E5E9EE;border-top:none;border-radius:0 0 12px 12px;padding:24px;">
        <table cellpadding="0" cellspacing="0">
          ${row("Name", p.name)}
          ${row("Email", p.email)}
          ${row("Company", p.company)}
          ${row("Phone", p.phone)}
          ${row("Service", p.service)}
        </table>
        <p style="color:#3A5570;font-size:13px;margin:16px 0 4px;">Message</p>
        <p style="color:#0A2540;font-size:14px;white-space:pre-wrap;line-height:1.5;">${escapeHtml(
          p.message
        )}</p>
      </div>
    </div>
  `;
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
