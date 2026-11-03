import { describe, it, expect } from 'vitest';
import { generateDispatchToken, verifyDispatchToken } from '@/lib/tokens';

describe('Dispatch Token System', () => {
  it('generates a valid token and verifies successfully', () => {
    const email = 'engineer@company.com';
    const token = generateDispatchToken(email, 'confirm');

    expect(token).toBeDefined();
    expect(token.split('.').length).toBe(2);

    const verification = verifyDispatchToken(token, 'confirm');
    expect(verification.valid).toBe(true);
    expect(verification.email).toBe(email);
  });

  it('rejects tampered signatures', () => {
    const email = 'client@test.com';
    const token = generateDispatchToken(email, 'confirm');
    const [payload, sig] = token.split('.');

    // Tamper with the signature
    const tamperedSig = sig.slice(0, -4) + 'AAAA';
    const tamperedToken = `${payload}.${tamperedSig}`;

    const verification = verifyDispatchToken(tamperedToken, 'confirm');
    expect(verification.valid).toBe(false);
    expect(verification.error).toBe('Invalid token signature');
  });

  it('rejects tampered payloads', () => {
    const token = generateDispatchToken('original@test.com', 'confirm');
    const [, sig] = token.split('.');

    // Fake payload with different email
    const fakePayload = Buffer.from(
      JSON.stringify({
        email: 'attacker@evil.com',
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + 3600,
        purpose: 'confirm',
      })
    ).toString('base64url');

    const tamperedToken = `${fakePayload}.${sig}`;
    const verification = verifyDispatchToken(tamperedToken, 'confirm');
    expect(verification.valid).toBe(false);
    expect(verification.error).toBe('Invalid token signature');
  });

  it('rejects mismatched purpose', () => {
    const email = 'user@test.com';
    const token = generateDispatchToken(email, 'confirm');

    // Attempt to verify with purpose 'unsubscribe'
    const verification = verifyDispatchToken(token, 'unsubscribe');
    expect(verification.valid).toBe(false);
    expect(verification.error).toContain('Invalid token purpose');
  });

  it('rejects malformed token strings', () => {
    expect(verifyDispatchToken('not-a-token', 'confirm').valid).toBe(false);
    expect(verifyDispatchToken('', 'confirm').valid).toBe(false);
    expect(verifyDispatchToken('a.b.c', 'confirm').valid).toBe(false);
  });
});

