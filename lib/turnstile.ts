/**
 * Cloudflare Turnstile Server-Side Verification
 */
export async function verifyTurnstileToken(
  token: string,
  remoteIp?: string
): Promise<{ success: boolean; error?: string }> {
  const secretKey =
    process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY ||
    '1x0000000000000000000000000000000AA'; // Cloudflare test secret key

  // If using Cloudflare's always-pass test secret or in test environment with test tokens
  if (
    secretKey === '1x0000000000000000000000000000000AA' &&
    (token.startsWith('XXXX.') || token.startsWith('mock') || token === 'test-token' || token === '1x00000000000000000000AA')
  ) {
    return { success: true };
  }

  // Without a token, verification must fail closed
  if (!token) {
    return { success: false, error: 'Turnstile verification token missing.' };
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (remoteIp) {
      formData.append('remoteip', remoteIp);
    }

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!res.ok) {
      return { success: false, error: 'Failed to contact Turnstile verification service.' };
    }

    const outcome = await res.json();
    if (outcome.success) {
      return { success: true };
    }

    return {
      success: false,
      error: outcome['error-codes']?.join(', ') || 'Bot verification failed.',
    };
  } catch (error) {
    console.error('Turnstile verification error:', error);
    // Fail closed
    return { success: false, error: 'Verification service unavailable.' };
  }
}
