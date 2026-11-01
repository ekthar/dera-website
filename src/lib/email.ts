import "server-only";
import { serviceLabel, type ContactFields } from "@/lib/contact";

/**
 * Email delivery for contact enquiries through the Resend HTTP API.
 * No SDK is needed. Delivery is considered configured only when all three
 * variables are present.
 */
type EmailConfig = { apiKey: string; to: string; from: string };

export function getEmailConfig(): EmailConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!apiKey || !to || !from) return null;
  return { apiKey, to, from };
}

export function isEmailDeliveryConfigured(): boolean {
  return getEmailConfig() !== null;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendContactEmail(fields: ContactFields): Promise<boolean> {
  const config = getEmailConfig();
  if (!config) return false;

  const rows: Array<[string, string]> = [
    ["Name", fields.name],
    ["Email", fields.email],
    ["Phone", fields.phone],
    ["Company", fields.company || "Not provided"],
    ["Service", serviceLabel(fields.service)],
  ];

  const text = [...rows.map(([key, value]) => `${key}: ${value}`), "", "Project details:", fields.details].join(
    "\n",
  );

  const html = `
    <h2 style="font-family:Arial,sans-serif">New enquiry from the Dera website</h2>
    <table style="font-family:Arial,sans-serif;border-collapse:collapse">
      ${rows
        .map(
          ([key, value]) =>
            `<tr><td style="padding:4px 16px 4px 0;color:#555">${key}</td><td style="padding:4px 0">${escapeHtml(value)}</td></tr>`,
        )
        .join("")}
    </table>
    <h3 style="font-family:Arial,sans-serif">Project details</h3>
    <p style="font-family:Arial,sans-serif;white-space:pre-wrap">${escapeHtml(fields.details)}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: config.from,
      to: [config.to],
      reply_to: fields.email,
      subject: `Website enquiry: ${serviceLabel(fields.service)} from ${fields.name}`,
      text,
      html,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  return response.ok;
}
