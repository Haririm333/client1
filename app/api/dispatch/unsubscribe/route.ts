import { NextResponse, type NextRequest } from 'next/server';
import { z } from 'zod';
import { verifyDispatchToken } from '@/lib/tokens';

const UnsubscribeSchema = z.object({
  token: z.string().optional(),
  email: z.string().email().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const json = await request.json().catch(() => null);
    if (!json) {
      return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
    }

    const parseResult = UnsubscribeSchema.safeParse(json);
    if (!parseResult.success) {
      return NextResponse.json({ error: 'Invalid input parameters' }, { status: 400 });
    }

    let targetEmail: string | undefined;

    if (parseResult.data.token) {
      const tokenVerification = verifyDispatchToken(parseResult.data.token, 'confirm');
      if (tokenVerification.valid && tokenVerification.email) {
        targetEmail = tokenVerification.email;
      } else {
        const altVerification = verifyDispatchToken(parseResult.data.token, 'unsubscribe');
        if (altVerification.valid && altVerification.email) {
          targetEmail = altVerification.email;
        } else {
          return NextResponse.json({ error: 'Invalid or expired unsubscribe token' }, { status: 400 });
        }
      }
    } else if (parseResult.data.email) {
      targetEmail = parseResult.data.email.toLowerCase().trim();
    } else {
      return NextResponse.json({ error: 'Please provide either a valid token or email address.' }, { status: 400 });
    }

    // In production with Brevo API key, remove contact from list
    const apiKey = process.env.BREVO_API_KEY;
    const listId = parseInt(process.env.BREVO_NEWSLETTER_LIST_ID || '1', 10);

    if (apiKey && apiKey !== 'mock' && targetEmail) {
      try {
        await fetch(`https://api.brevo.com/v3/contacts/lists/${listId}/contacts/remove`, {
          method: 'POST',
          headers: {
            'api-key': apiKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            emails: [targetEmail],
          }),
        });
      } catch (e) {
        console.error('Failed to remove contact from Brevo list:', e);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Your address has been removed from The MechLab Dispatch.',
    });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    return NextResponse.json({ error: 'Failed to process unsubscribe request.' }, { status: 500 });
  }
}

