import crypto from 'crypto';

interface TokenPayload {
  email: string;
  iat: number;
  exp: number;
  purpose: 'confirm' | 'unsubscribe';
}

function getSecret(): string {
  const secret = process.env.DISPATCH_TOKEN_SECRET;
  if (!secret || secret.length < 32) {
    // Fallback for development/testing only
    return 'development_fallback_secret_at_least_32_bytes_long_key_12345';
  }
  return secret;
}

/**
 * Generate a cryptographically signed HMAC-SHA256 token
 */
export function generateDispatchToken(email: string, purpose: 'confirm' | 'unsubscribe' = 'confirm'): string {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 86400; // 24 hours expiry

  const payload: TokenPayload = { email: email.toLowerCase().trim(), iat, exp, purpose };
  const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64url');

  const hmac = crypto.createHmac('sha256', getSecret());
  hmac.update(payloadBase64);
  const signature = hmac.digest('base64url');

  return `${payloadBase64}.${signature}`;
}

/**
 * Verify a token using constant-time comparison
 */
export function verifyDispatchToken(
  token: string,
  expectedPurpose: 'confirm' | 'unsubscribe' = 'confirm'
): { valid: boolean; email?: string; error?: string } {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) {
      return { valid: false, error: 'Malformed token structure' };
    }

    const [payloadBase64, providedSig] = parts;

    // Compute expected signature
    const hmac = crypto.createHmac('sha256', getSecret());
    hmac.update(payloadBase64);
    const expectedSig = hmac.digest('base64url');

    // Constant-time comparison to prevent timing attacks
    const providedBuffer = Buffer.from(providedSig);
    const expectedBuffer = Buffer.from(expectedSig);

    if (providedBuffer.length !== expectedBuffer.length || !crypto.timingSafeEqual(providedBuffer, expectedBuffer)) {
      return { valid: false, error: 'Invalid token signature' };
    }

    const payload: TokenPayload = JSON.parse(Buffer.from(payloadBase64, 'base64url').toString('utf8'));

    // Check expiry
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp < now) {
      return { valid: false, error: 'Token has expired' };
    }

    // Check purpose
    if (payload.purpose !== expectedPurpose) {
      return { valid: false, error: `Invalid token purpose: expected ${expectedPurpose}` };
    }

    return { valid: true, email: payload.email };
  } catch (err) {
    return { valid: false, error: 'Failed to parse token' };
  }
}
