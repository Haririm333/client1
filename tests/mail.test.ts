import { describe, it, expect, beforeEach } from 'vitest';
import {
  escapeHtml,
  sanitizeHeader,
  sendEmail,
  sendDispatchConfirmationEmail,
  mockMailbox,
  clearMockMailbox,
} from '@/lib/mail';

describe('Mail Adapter & Sanitization', () => {
  beforeEach(() => {
    clearMockMailbox();
  });

  it('escapes HTML special characters to prevent HTML injection in emails', () => {
    const raw = '<script>alert("xss")</script> & <b>test</b>';
    const escaped = escapeHtml(raw);
    expect(escaped).not.toContain('<script>');
    expect(escaped).toContain('&lt;script&gt;');
    expect(escaped).toContain('&amp;');
  });

  it('strips CRLF from header inputs to prevent email header injection', () => {
    const raw = 'Rajesh Kumar\r\nBcc: victim@example.com\nSubject: Injected';
    const clean = sanitizeHeader(raw);
    expect(clean).not.toContain('\r');
    expect(clean).not.toContain('\n');
    expect(clean).toBe('Rajesh KumarBcc: victim@example.comSubject: Injected');
  });

  it('dispatches emails to the mock mailbox in test environment', async () => {
    const result = await sendEmail({
      to: 'client@example.com',
      subject: 'Test Subject',
      html: '<p>Test HTML</p>',
      text: 'Test plain text',
      timestamp: new Date().toISOString(),
    });

    expect(result.success).toBe(true);
    expect(mockMailbox.length).toBe(1);
    expect(mockMailbox[0].to).toBe('client@example.com');
  });

  it('sends double opt-in confirmation email with List-Unsubscribe headers and token link', async () => {
    const sent = await sendDispatchConfirmationEmail('subscriber@domain.com');
    expect(sent).toBe(true);

    expect(mockMailbox.length).toBe(1);
    const email = mockMailbox[0];
    expect(email.to).toBe('subscriber@domain.com');
    expect(email.headers).toBeDefined();
    expect(email.headers?.['List-Unsubscribe']).toContain('mailto:');
    expect(email.headers?.['List-Unsubscribe-Post']).toBe('List-Unsubscribe=One-Click');
    expect(email.html).toContain('/dispatch/confirm?token=');
    expect(email.text).toContain('/dispatch/confirm?token=');
  });
});

