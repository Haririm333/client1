import { generateDispatchToken } from './tokens';

export interface EmailRecord {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  headers?: Record<string, string>;
  timestamp: string;
}

// In-memory mock mailbox for development, unit, and end-to-end tests
export const mockMailbox: EmailRecord[] = [];

export function clearMockMailbox(): void {
  mockMailbox.length = 0;
}

export function getMockMailbox(): EmailRecord[] {
  return [...mockMailbox];
}

/**
 * Escape HTML special characters to prevent HTML injection in emails
 */
export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Strip CRLF to prevent email header injection
 */
export function sanitizeHeader(str: string): string {
  return str.replace(/[\r\n]/g, '').trim();
}

/**
 * Dispatch an email via Brevo or the mock mailer
 */
export async function sendEmail(record: EmailRecord): Promise<{ success: boolean; id?: string }> {
  const apiKey = process.env.BREVO_API_KEY;
  const isMock = !apiKey || apiKey === 'mock' || process.env.NODE_ENV === 'test';

  if (isMock) {
    mockMailbox.push(record);
    return { success: true, id: `mock-${Date.now()}` };
  }

  try {
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'themechlabengineering@gmail.com';
    const senderName = process.env.BREVO_SENDER_NAME || 'The MechLab Engineering';

    const payload: Record<string, unknown> = {
      sender: { name: senderName, email: senderEmail },
      to: [{ email: record.to }],
      subject: record.subject,
      htmlContent: record.html,
      textContent: record.text,
    };

    if (record.replyTo) {
      payload.replyTo = { email: record.replyTo };
    }

    if (record.headers) {
      payload.headers = record.headers;
    }

    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Brevo API error:', errText);
      return { success: false };
    }

    const data = await response.json();
    return { success: true, id: data.messageId };
  } catch (error) {
    console.error('Email dispatch error:', error);
    return { success: false };
  }
}

/**
 * Send double opt-in confirmation email for The MechLab Dispatch
 */
export async function sendDispatchConfirmationEmail(email: string): Promise<boolean> {
  const token = generateDispatchToken(email, 'confirm');
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const confirmUrl = `${siteUrl}/dispatch/confirm?token=${encodeURIComponent(token)}`;
  const unsubscribeUrl = `${siteUrl}/dispatch/unsubscribe?token=${encodeURIComponent(token)}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Confirm Your Subscription - The MechLab Dispatch</title>
</head>
<body style="font-family: Georgia, 'Times New Roman', serif; background-color: #f4f5f7; margin: 0; padding: 24px;">
  <table width="600" align="center" style="background-color: #ffffff; border: 1px solid #dfe4ea; border-collapse: collapse; margin: 0 auto;">
    <tr>
      <td style="padding: 24px 32px; border-bottom: 3px double #1f2326; text-align: center;">
        <h1 style="font-size: 28px; margin: 0; color: #1f2326; font-family: Georgia, serif;">The MechLab Dispatch</h1>
        <p style="font-family: monospace; font-size: 11px; margin: 4px 0 0 0; color: #5b6570; letter-spacing: 0.1em;">NOTES FROM THE DESIGN DESK</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px;">
        <h2 style="font-size: 20px; color: #1f2326; margin-top: 0;">Confirm your free subscription</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #2b3035;">
          You requested to subscribe to <em>The MechLab Dispatch</em>, an independent technical bulletin on mechanical design, DFM principles, GD&T, and rapid prototyping.
        </p>
        <p style="font-size: 16px; line-height: 1.6; color: #2b3035;">
          To verify your email address and activate your subscription, please confirm below. This link expires in 24 hours.
        </p>
        <div style="margin: 28px 0; text-align: center;">
          <a href="${confirmUrl}" style="background-color: #1560c8; color: #ffffff; padding: 12px 24px; text-decoration: none; font-family: monospace; font-size: 14px; font-weight: bold; border-radius: 2px; display: inline-block;">CONFIRM SUBSCRIPTION</a>
        </div>
        <p style="font-size: 13px; line-height: 1.5; color: #5b6570;">
          If the button does not work, copy and paste this address into your browser:<br>
          <a href="${confirmUrl}" style="color: #1560c8;">${confirmUrl}</a>
        </p>
        <p style="font-size: 13px; line-height: 1.5; color: #5b6570;">
          If you did not make this request, you can safely ignore this email.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px 32px; background-color: #f4f5f7; border-top: 1px solid #dfe4ea; font-family: monospace; font-size: 11px; color: #5b6570; text-align: center;">
        The MechLab Engineering · themechlabengineering@gmail.com · +91 86102 41235<br>
        <a href="${unsubscribeUrl}" style="color: #5b6570; text-decoration: underline;">Unsubscribe</a>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();

  const text = `
The MechLab Dispatch - Subscription Confirmation

You requested to subscribe to The MechLab Dispatch (Notes from the design desk).

Confirm your subscription by visiting this link (expires in 24 hours):
${confirmUrl}

If you did not make this request, please disregard this message.

The MechLab Engineering
themechlabengineering@gmail.com | +91 86102 41235
  `.trim();

  const res = await sendEmail({
    to: email,
    subject: 'Confirm your subscription to The MechLab Dispatch',
    html,
    text,
    headers: {
      'List-Unsubscribe': `<mailto:themechlabengineering@gmail.com?subject=Unsubscribe>, <${unsubscribeUrl}>`,
      'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
    },
    timestamp: new Date().toISOString(),
  });

  return res.success;
}
