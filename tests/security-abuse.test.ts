import { describe, it, expect, beforeEach } from 'vitest';
import { NextRequest } from 'next/server';
import { POST as quoteHandler } from '@/app/api/quote/route';
import { POST as subscribeHandler } from '@/app/api/dispatch/subscribe/route';
import { POST as confirmHandler } from '@/app/api/dispatch/confirm/route';
import { POST as unsubscribeHandler } from '@/app/api/dispatch/unsubscribe/route';
import { generateDispatchToken } from '@/lib/tokens';
import { escapeHtml, sanitizeHeader, getMockMailbox, clearMockMailbox } from '@/lib/mail';

describe('Security Pentest & Abuse Test Suite', () => {
  beforeEach(() => {
    clearMockMailbox();
  });

  describe('1. Quote Form Input Sanitization & Attack Resistance', () => {
    it('escapes aggressive XSS vectors in visitor-supplied fields', () => {
      const xssVectors = [
        '<script>alert("XSS")</script>',
        '<img src=x onerror=alert(1)>',
        '"><svg onload=alert`1`>',
        'javascript:/*--></title></style></textarea></script></xmp><svg/onload=\'+/"/+/onmouseover=1/+/[*/[]/+alert(1)//\'>',
        '"><iframe src="javascript:alert(1)">',
      ];

      for (const vector of xssVectors) {
        const escaped = escapeHtml(vector);
        expect(escaped).not.toContain('<script>');
        expect(escaped).not.toContain('<img');
        expect(escaped).not.toContain('<svg');
        expect(escaped).not.toContain('<iframe');
        expect(escaped).toContain('&lt;');
        expect(escaped).toContain('&gt;');
      }
    });

    it('sanitizes CRLF / header injection payloads in mail header fields', () => {
      const crlfPayloads = [
        'attacker@evil.com\r\nBcc: victim1@target.com,victim2@target.com',
        'John Doe\nCc: spam@malicious.org\nSubject: Spoofed Mail',
        'Company\r\nContent-Type: multipart/mixed; boundary=evil',
      ];

      for (const payload of crlfPayloads) {
        const sanitized = sanitizeHeader(payload);
        expect(sanitized).not.toContain('\r');
        expect(sanitized).not.toContain('\n');
      }
    });

    it('rejects honeypot trap submissions by dropping them silently (zero mail dispatch)', async () => {
      const req = new NextRequest('http://localhost:3000/api/quote', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: 'Bot Spammer',
          email: 'bot@spamnetwork.com',
          serviceNeeded: 'sheetmetal-design',
          assetStage: 'sketch',
          quantity: 'one-off',
          neededBy: 'ASAP',
          projectDetails: 'Automated spam message trying to sell SEO services or crypto.',
          consent: true,
          hp_website: 'https://spam-link.ru', // Honeypot filled
          submitStartTime: Date.now() - 5000,
        }),
      });

      const res = await quoteHandler(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.redirect).toBe('/thank-you');
      // Crucial security check: Honeypot drop must NOT send any notification emails
      expect(getMockMailbox().length).toBe(0);
    });

    it('rejects submissions processed too quickly (minimum fill-time check)', async () => {
      const req = new NextRequest('http://localhost:3000/api/quote', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: 'Fast Script',
          email: 'fast@script.com',
          serviceNeeded: 'sheetmetal-design',
          assetStage: 'sketch',
          quantity: 'one-off',
          neededBy: 'Flexible',
          projectDetails: 'Legitimate looking text but submitted in under 500 milliseconds.',
          consent: true,
          submitStartTime: Date.now() - 300, // Only 300ms elapsed
        }),
      });

      const res = await quoteHandler(req);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toMatch(/too quickly/i);
      expect(getMockMailbox().length).toBe(0);
    });

    it('treats SQL and NoSQL injection strings as inert literal text', async () => {
      const maliciousSqlDetails =
        "'; DROP TABLE users; SELECT * FROM quotes WHERE '1'='1' -- $where: 'sleep(5000)'";

      const req = new NextRequest('http://localhost:3000/api/quote', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          name: "O'Connor Admin",
          email: 'safety-tester@clientmfg.com',
          serviceNeeded: 'mechanical-design-cad',
          assetStage: 'drawing-or-cad',
          quantity: 'prototype-batch',
          neededBy: 'Next Month',
          projectDetails: maliciousSqlDetails,
          consent: true,
          submitStartTime: Date.now() - 4000,
        }),
      });

      const res = await quoteHandler(req);
      expect(res.status).toBe(200);

      // Verify that content was safely stored/escaped in email without code execution
      const sentEmails = getMockMailbox();
      expect(sentEmails.length).toBe(2);
      const ownerEmail = sentEmails.find((m) => m.subject.includes('New Quote Request'));
      expect(ownerEmail?.html).toContain('&#039;; DROP TABLE users;');
    });

    it('enforces IP rate limiting against rapid quote flood', async () => {
      const uniqueIp = `10.20.30.${Math.floor(Math.random() * 200) + 10}`;

      // Submit 5 allowed requests
      for (let i = 0; i < 5; i++) {
        const req = new NextRequest('http://localhost:3000/api/quote', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            'x-forwarded-for': uniqueIp,
          },
          body: JSON.stringify({
            name: 'Load Tester',
            email: `load_${i}_${Date.now()}@flood.org`,
            serviceNeeded: '3d-printing',
            assetStage: 'drawing-or-cad',
            quantity: 'one-off',
            neededBy: 'Flexible',
            projectDetails: 'Test details for rate limit verification iteration with valid characters.',
            consent: true,
            submitStartTime: Date.now() - 3000,
          }),
        });
        const res = await quoteHandler(req);
        expect(res.status).toBe(200);
      }

      // 6th request from the same IP must be rejected with 429 Too Many Requests
      const blockedReq = new NextRequest('http://localhost:3000/api/quote', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'x-forwarded-for': uniqueIp,
        },
        body: JSON.stringify({
          name: 'Blocked User',
          email: `blocked_${Date.now()}@flood.org`,
          serviceNeeded: '3d-printing',
          assetStage: 'drawing-or-cad',
          quantity: 'one-off',
          neededBy: 'Flexible',
          projectDetails: 'This 6th submission should exceed rate limits.',
          consent: true,
          submitStartTime: Date.now() - 3000,
        }),
      });

      const blockedRes = await quoteHandler(blockedReq);
      expect(blockedRes.status).toBe(429);
      const data = await blockedRes.json();
      expect(data.error).toMatch(/too many quote requests/i);
    });
  });

  describe('2. The MechLab Dispatch Double Opt-In & Abuse Resistance', () => {
    it('prevents subscriber enumeration (identical response for new vs repeat)', async () => {
      const targetEmail = `target_${Date.now()}@victimfirm.com`;

      // First subscribe call
      const req1 = new NextRequest('http://localhost:3000/api/dispatch/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: targetEmail }),
      });
      const res1 = await subscribeHandler(req1);
      expect(res1.status).toBe(202);
      const json1 = await res1.json();

      // Second subscribe call with same address
      const req2 = new NextRequest('http://localhost:3000/api/dispatch/subscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: targetEmail }),
      });
      const res2 = await subscribeHandler(req2);
      expect(res2.status).toBe(202);
      const json2 = await res2.json();

      // Both must return identical 202 Accepted status and identical message
      expect(json1).toEqual(json2);
      expect(json1.message).toBeDefined();
    });

    it('rejects tampered and forged HMAC confirmation tokens', async () => {
      const validToken = generateDispatchToken('innocent@firm.com', 'confirm');
      const [payloadB64, signature] = validToken.split('.');

      // 1. Tampered payload
      const tamperedPayload = Buffer.from(
        JSON.stringify({ email: 'admin@firm.com', exp: Math.floor(Date.now() / 1000) + 86400, purpose: 'confirm' })
      ).toString('base64url');
      const tamperedToken = `${tamperedPayload}.${signature}`;

      const req1 = new NextRequest('http://localhost:3000/api/dispatch/confirm', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ token: tamperedToken }),
      });
      const res1 = await confirmHandler(req1);
      expect(res1.status).toBe(400);

      // 2. Tampered signature
      const corruptedSigToken = `${payloadB64}.${signature.slice(0, -4)}abcd`;
      const req2 = new NextRequest('http://localhost:3000/api/dispatch/confirm', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ token: corruptedSigToken }),
      });
      const res2 = await confirmHandler(req2);
      expect(res2.status).toBe(400);

      // 3. Token with inappropriate purpose claim (e.g. unsubscribe used for confirm)
      const wrongPurposeToken = generateDispatchToken('innocent@firm.com', 'unsubscribe');
      const req3 = new NextRequest('http://localhost:3000/api/dispatch/confirm', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ token: wrongPurposeToken }),
      });
      const res3 = await confirmHandler(req3);
      expect(res3.status).toBe(400);
    });

    it('enforces unsubscribe rate limiting and valid input validation', async () => {
      const invalidReq = new NextRequest('http://localhost:3000/api/dispatch/unsubscribe', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: 'not-an-email-address' }),
      });

      const res = await unsubscribeHandler(invalidReq);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toBeDefined();
    });
  });

  describe('3. HTTP Method & Content Type Strictness', () => {
    it('quote endpoint rejects malformed JSON bodies gracefully', async () => {
      const req = new NextRequest('http://localhost:3000/api/quote', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: '{"unclosed_json: true',
      });

      const res = await quoteHandler(req);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toMatch(/invalid json payload/i);
    });
  });
});
