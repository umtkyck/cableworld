const SUPPORT_EMAIL = 'umtkyck@gmail.com'

interface SendEmailInput {
  subject: string
  html: string
  replyTo?: string
}

/** Sends a notification email when RESEND_API_KEY is configured; otherwise no-ops. */
export async function sendNotificationEmail({ subject, html, replyTo }: SendEmailInput): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY?.trim()
  if (!apiKey) return false

  const from = process.env.RESEND_FROM?.trim() || 'Harness Cart <onboarding@resend.dev>'

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [SUPPORT_EMAIL],
      subject,
      html,
      reply_to: replyTo,
    }),
  })

  return response.ok
}

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}
