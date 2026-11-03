import { describe, it, expect, beforeEach } from 'vitest';
import { POST as quoteHandler } from '@/app/api/quote/route';
import { POST as subscribeHandler } from '@/app/api/dispatch/subscribe/route';
import { POST as confirmHandler } from '@/app/api/dispatch/confirm/route';
import { POST as unsubscribeHandler } from '@/app/api/dispatch/unsubscribe/route';
import { mockMailbox, clearMockMailbox } from '@/lib/mail';
import { generateDispatchToken } from '@/lib/tokens';
import { clearRateLimits } from '@/lib/rateLimit';
import { NextRequest } from 'next/server';

function makeJsonRequest(url: string, body: unknown, headers: Record<string, string> = {}): NextRequest {
  return new NextRequest(new URL(url, 'http://localhost:3000'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      origin: 'http://localhost:3000',
      host: 'localhost:3000',
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

describe('API Integration & E2E Handlers', () => {
  beforeEach(() => {
    clearMockMailbox();
    clearRateLimits();
  });

  describe('Quote Flow API', () => {
    it('successfully processes quote submission and sends owner & client emails', async () => {
      const payload = {
        name: 'Arun Patel',
        email: 'arun@patelengineering.com',
        phone: '+91 88776 65544',
        company: 'Patel Engineering Works',
        serviceNeeded: 'mechanical-design-cad',
        assetStage: 'sketch',
        quantity: 'one-off',
        neededBy: '3 weeks',
        projectDetails: 'Need 3D CAD parametric model for high-torque flange coupling with keyway and fit tolerances.',
        consent: true,
        submitStartTime: Date.now() - 5000, // 5s fill time
        turnstileToken: 'mock-token',
      };

      const req = makeJsonRequest('/api/quote', payload);
      const res = await quoteHandler(req);
      const body = await res.json();

      expect(res.status).toBe(200);
      expect(body.success).toBe(true);
      expect(body.redirect).toContain('/thank-you?service=mechanical-design-cad');

      // Both studio owner and client should have received emails in mockMailbox
      expect(mockMailbox.length).toBe(2);
      const ownerMail = mockMailbox[0];
      const clientMail = mockMailbox[1];

      expect(ownerMail.subject).toContain('New Quote Request');
      expect(ownerMail.html).toContain('Arun Patel');
      expect(ownerMail.replyTo).toBe('arun@patelengineering.com');

      expect(clientMail.to).toBe('arun@patelengineering.com');
      expect(clientMail.subject).toContain('Quote Request Received');
      expect(clientMail.html).toContain('5-Step Process');
    });

    it('traps honeypot bots silently without sending emails', async () => {
      const botPayload = {
        name: 'Spam Bot',
        email: 'spammer@botnet.org',
        serviceNeeded: '3d-printing',
        assetStage: 'idea-only',
        quantity: 'production-run',
        neededBy: 'ASAP',
        projectDetails: 'Buy cheap links fast and boost your seo rank immediately today now.',
        consent: true,
        hp_website: 'http://evil-spam-link.com', // Honeypot filled!
      };

      const req = makeJsonRequest('/api/quote', botPayload);
      const res = await quoteHandler(req);
      expect(res.status).toBe(200);

      // Verify zero emails were dispatched
      expect(mockMailbox.length).toBe(0);
    });

    it('rejects submissions that occur too quickly (< 2000ms fill time)', async () => {
      const fastPayload = {
        name: 'Fast Submitter',
        email: 'fast@bot.com',
        serviceNeeded: 'reverse-engineering',
        assetStage: 'physical-part',
        quantity: 'one-off',
        neededBy: 'Flexible',
        projectDetails: 'Recreate stepped shaft from sample part with bearing seats and fits.',
        consent: true,
        submitStartTime: Date.now() - 500, // Only 500ms elapsed
      };

      const req = makeJsonRequest('/api/quote', fastPayload);
      const res = await quoteHandler(req);
      expect(res.status).toBe(400);
      const body = await res.json();
      expect(body.error).toContain('too quickly');
    });
  });

  describe('Newsletter Double Opt-in Flow API', () => {
    it('processes subscription request and sends HMAC token confirmation email', async () => {
      const req = makeJsonRequest('/api/dispatch/subscribe', {
        email: 'subscriber@techcorp.in',
      });

      const res = await subscribeHandler(req);
      expect(res.status).toBe(202);

      expect(mockMailbox.length).toBe(1);
      const confirmationMail = mockMailbox[0];
      expect(confirmationMail.to).toBe('subscriber@techcorp.in');
      expect(confirmationMail.html).toContain('/dispatch/confirm?token=');

      // Extract token from confirmation link
      const match = confirmationMail.html.match(/\/dispatch\/confirm\?token=([a-zA-Z0-9_.-]+)/);
      expect(match).not.toBeNull();
      const token = match![1];

      // Step 2: Confirm the subscription via POST /api/dispatch/confirm
      const confirmReq = makeJsonRequest('/api/dispatch/confirm', { token });
      const confirmRes = await confirmHandler(confirmReq);
      const confirmBody = await confirmRes.json();

      expect(confirmRes.status).toBe(200);
      expect(confirmBody.success).toBe(true);

      // Step 3: Verify token replay attack is rejected
      const replayReq = makeJsonRequest('/api/dispatch/confirm', { token });
      const replayRes = await confirmHandler(replayReq);
      expect(replayRes.status).toBe(400);
      const replayBody = await replayRes.json();
      expect(replayBody.error).toContain('already been used');
    });

    it('rejects tampered tokens on confirmation', async () => {
      const validToken = generateDispatchToken('victim@example.com', 'confirm');
      const [payload] = validToken.split('.');
      const tamperedToken = `${payload}.invalidsignature123`;

      const req = makeJsonRequest('/api/dispatch/confirm', { token: tamperedToken });
      const res = await confirmHandler(req);
      expect(res.status).toBe(400);
    });

    it('processes unsubscribe with valid token', async () => {
      const token = generateDispatchToken('user@domain.com', 'confirm');
      const req = makeJsonRequest('/api/dispatch/unsubscribe', { token });
      const res = await unsubscribeHandler(req);
      const body = await res.json();

      expect(res.status).toBe(200);
      expect(body.success).toBe(true);
      expect(body.message).toContain('removed');
    });
  });
});

