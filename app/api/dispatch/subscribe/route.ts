import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { sendDispatchConfirmationEmail } from '@/lib/mail';
import { checkRateLimit, hashIdentifier } from '@/lib/rateLimit';

const SubscribeSchema = z.object({
  email: z.string().trim().email('Invalid email address').max(254),
  turnstileToken: z.string().optional(),
  hp_name: z.string().optional(), // Honeypot field
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json().catch(() => null);
    if (!json) {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const parseResult = SubscribeSchema.safeParse(json);
    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.issues[0]?.message || 'Invalid input' },
        { status: 400 }
      );
    }

    const { email, hp_name } = parseResult.data;

    // Honeypot check: If the hidden honeypot is filled, return 202 silently (trap bot)
    if (hp_name && hp_name.trim().length > 0) {
      return NextResponse.json(
        { message: 'If this email is eligible, a confirmation link has been dispatched.' },
        { status: 202 }
      );
    }

    // Rate limiting: 1 email per address per hour to stop subscribe-bombing
    const emailHash = hashIdentifier(email);
    const emailLimit = checkRateLimit(`sub_email:${emailHash}`, 1, 3600);

    // IP rate limiting: 10 subscription attempts per hour per IP
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    const ipLimit = checkRateLimit(`sub_ip:${clientIp}`, 10, 3600);

    if (!ipLimit.allowed) {
      return NextResponse.json(
        { error: 'Too many subscription attempts from this network. Please try again later.' },
        { status: 429 }
      );
    }

    // Only dispatch confirmation email if email has not exceeded rate limit
    if (emailLimit.allowed) {
      await sendDispatchConfirmationEmail(email);
    }

    // Always return identical 202 response to prevent user enumeration
    return NextResponse.json(
      { message: 'If this email is eligible, a confirmation link has been dispatched.' },
      { status: 202 }
    );
  } catch (err) {
    console.error('Subscription handler error:', err);
    return NextResponse.json(
      { error: 'An unexpected internal error occurred.' },
      { status: 500 }
    );
  }
}
