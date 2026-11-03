import crypto from 'crypto';

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

// In-memory rate limit store (per-process fallback)
const rateLimitStore = new Map<string, RateLimitRecord>();

/**
 * Hash an email or identifier with SHA-256 to ensure no raw PII in cache/logs
 */
export function hashIdentifier(val: string): string {
  return crypto.createHash('sha256').update(val.toLowerCase().trim()).digest('hex');
}

/**
 * Check and increment rate limit counter
 * @returns true if request is allowed; false if rate-limited
 */
export function checkRateLimit(
  key: string,
  limit: number,
  windowSeconds: number
): { allowed: boolean; remaining: number; resetInSeconds: number } {
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || existing.resetAt <= now) {
    rateLimitStore.set(key, {
      count: 1,
      resetAt: now + windowSeconds * 1000,
    });
    return {
      allowed: true,
      remaining: limit - 1,
      resetInSeconds: windowSeconds,
    };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds: Math.ceil((existing.resetAt - now) / 1000),
    };
  }

  existing.count += 1;
  return {
    allowed: true,
    remaining: limit - existing.count,
    resetInSeconds: Math.ceil((existing.resetAt - now) / 1000),
  };
}

/**
 * Reset rate limit store (useful for tests)
 */
export function clearRateLimits(): void {
  rateLimitStore.clear();
}
