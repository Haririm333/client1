import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { verifyDispatchToken } from '@/lib/tokens';

const ConfirmSchema = z.object({
  token: z.string().min(10, 'Invalid token format'),
});

// In-memory set of confirmed token signatures to prevent token replay attacks
const consumedTokens = new Set<string>();

export async function POST(request: NextRequest) {
  try {
    const json = await request.json().catch(() => null);
    if (!json) {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    const parseResult = ConfirmSchema.safeParse(json);
    if (!parseResult.success) {
      return NextResponse.json({ error: 'Invalid verification token' }, { status: 400 });
    }

    const { token } = parseResult.data;

    // Check replay
    const signature = token.split('.')[1] || token;
    if (consumedTokens.has(signature)) {
      return NextResponse.json(
        { error: 'This confirmation link has already been used. Your subscription is active.' },
        { status: 400 }
      );
    }

    // Verify cryptographic token
    const verification = verifyDispatchToken(token, 'confirm');
    if (!verification.valid || !verification.email) {
      return NextResponse.json(
        { error: verification.error || 'The verification link is invalid or has expired.' },
        { status: 400 }
      );
    }

    // Mark token as consumed
    consumedTokens.add(signature);

    // In production with Brevo API key, add contact to list
    const apiKey = process.env.BREVO_API_KEY;
    const listId = parseInt(process.env.BREVO_NEWSLETTER_LIST_ID || '1', 10);

    if (apiKey && apiKey !== 'mock') {
      try {
        await fetch('https://api.brevo.com/v3/contacts', {
          method: 'POST',
          headers: {
            'api-key': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: verification.email,
            listIds: [listId],
            updateEnabled: true,
          }),
        });
      } catch (e) {
        console.error('Failed to sync contact with Brevo list:', e);
      }
    }

    // Return masked email for display
    const emailParts = verification.email.split('@');
    const masked =
      emailParts[0].length > 2
        ? `${emailParts[0].slice(0, 2)}***@${emailParts[1]}`
        : verification.email;

    return NextResponse.json({
      success: true,
      email: masked,
    });
  } catch (error) {
    console.error('Subscription confirmation error:', error);
    return NextResponse.json(
      { error: 'An unexpected internal error occurred during verification.' },
      { status: 500 }
    );
  }
}

