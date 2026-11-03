import { NextResponse, type NextRequest } from 'next/server';
import { QuoteSchema } from '@/lib/quoteSchema';
import { sendEmail, escapeHtml, sanitizeHeader } from '@/lib/mail';
import { verifyTurnstileToken } from '@/lib/turnstile';
import { checkRateLimit, hashIdentifier } from '@/lib/rateLimit';

export async function POST(request: NextRequest) {
  try {
    const json = await request.json().catch(() => null);
    if (!json) {
      return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
    }

    // 1. Zod schema validation
    const result = QuoteSchema.safeParse(json);
    if (!result.success) {
      const issue = result.error.issues[0];
      return NextResponse.json(
        { error: issue?.message || 'Invalid form data.' },
        { status: 400 }
      );
    }

    const data = result.data;

    // 2. Honeypot check
    if (data.hp_website && data.hp_website.trim().length > 0) {
      // Fake success for bots
      return NextResponse.json({ success: true, redirect: '/thank-you' }, { status: 200 });
    }

    // 3. Minimum fill time check (minimum 2 seconds)
    if (data.submitStartTime) {
      const elapsed = Date.now() - data.submitStartTime;
      if (elapsed < 2000) {
        return NextResponse.json(
          { error: 'Submission processed too quickly. Please take a moment to review your details.' },
          { status: 400 }
        );
      }
    }

    // 4. Rate limiting: per IP and per email hash
    const clientIp = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
    const ipCheck = checkRateLimit(`quote_ip:${clientIp}`, 5, 600); // 5 per 10 mins
    if (!ipCheck.allowed) {
      return NextResponse.json(
        { error: 'Too many quote requests from this network. Please email us directly.' },
        { status: 429 }
      );
    }

    const emailHash = hashIdentifier(data.email);
    const emailCheck = checkRateLimit(`quote_email:${emailHash}`, 3, 3600); // 3 per hour
    if (!emailCheck.allowed) {
      return NextResponse.json(
        { error: 'Multiple submissions received for this address. We are already reviewing your request.' },
        { status: 429 }
      );
    }

    // 5. Cloudflare Turnstile bot verification
    if (data.turnstileToken) {
      const turnstileResult = await verifyTurnstileToken(data.turnstileToken, clientIp);
      if (!turnstileResult.success) {
        return NextResponse.json(
          { error: turnstileResult.error || 'Bot verification check failed.' },
          { status: 400 }
        );
      }
    }

    // 6. Sanitize headers against injection
    const cleanName = sanitizeHeader(data.name);
    const cleanEmail = sanitizeHeader(data.email);
    const cleanPhone = sanitizeHeader(data.phone || 'Not provided');
    const cleanCompany = sanitizeHeader(data.company || 'Not specified');
    const ownerEmail = process.env.OWNER_NOTIFICATION_EMAIL || 'themechlabengineering@gmail.com';

    // 7. Compose studio notification email (clean HTML table)
    const ownerHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>New Quote Request</title></head>
<body style="font-family: sans-serif; background: #f4f5f7; padding: 24px;">
  <div style="max-width: 650px; margin: 0 auto; background: #fff; border: 1px solid #dfe4ea; padding: 24px;">
    <h2 style="color: #1f2326; border-bottom: 2px solid #1e7bf0; padding-bottom: 8px;">New Project Quote Request</h2>
    <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
      <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 35%;">Client Name:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(cleanName)}</td></tr>
      <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Work Email:</td><td style="padding: 8px; border-bottom: 1px solid #eee;"><a href="mailto:${cleanEmail}">${cleanEmail}</a></td></tr>
      <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Phone / WhatsApp:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(cleanPhone)}</td></tr>
      <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(cleanCompany)}</td></tr>
      <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Service Needed:</td><td style="padding: 8px; border-bottom: 1px solid #eee; color: #1560c8; font-weight: bold;">${escapeHtml(data.serviceNeeded)}</td></tr>
      <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Design Stage:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(data.assetStage)}</td></tr>
      <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Target Quantity:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(data.quantity)}</td></tr>
      <tr><td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Needed By:</td><td style="padding: 8px; border-bottom: 1px solid #eee;">${escapeHtml(data.neededBy)}</td></tr>
    </table>
    <div style="margin-top: 24px; padding: 16px; background: #f8fafc; border: 1px solid #e2e8f0;">
      <h3 style="margin-top: 0; font-size: 14px; color: #475569;">Project Details / Requirements:</h3>
      <p style="white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #1e293b;">${escapeHtml(data.projectDetails)}</p>
    </div>
  </div>
</body>
</html>
    `.trim();

    const ownerText = `
New Quote Request
-----------------
Name: ${cleanName}
Email: ${cleanEmail}
Phone: ${cleanPhone}
Company: ${cleanCompany}
Service: ${data.serviceNeeded}
Stage: ${data.assetStage}
Quantity: ${data.quantity}
Deadline: ${data.neededBy}

Details:
${data.projectDetails}
    `.trim();

    await sendEmail({
      to: ownerEmail,
      subject: `New Quote Request: ${data.serviceNeeded} - ${cleanName}`,
      html: ownerHtml,
      text: ownerText,
      replyTo: cleanEmail,
      timestamp: new Date().toISOString(),
    });

    // 8. Compose client acknowledgement email
    const clientHtml = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>Quote Request Received</title></head>
<body style="font-family: sans-serif; background: #f4f5f7; padding: 24px;">
  <div style="max-width: 600px; margin: 0 auto; background: #fff; border: 1px solid #dfe4ea; padding: 24px;">
    <h2 style="color: #1f2326; margin-top: 0;">We have received your requirement</h2>
    <p style="font-size: 15px; line-height: 1.6; color: #2b3035;">
      Hello ${escapeHtml(cleanName)},
    </p>
    <p style="font-size: 15px; line-height: 1.6; color: #2b3035;">
      Thank you for contacting The MechLab Engineering. Our engineering team has received your details for <strong>${escapeHtml(data.serviceNeeded)}</strong>.
    </p>
    <div style="background: #eaf2fe; border: 1px solid #1e7bf0; padding: 16px; margin: 20px 0;">
      <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #1560c8;">Need to attach CAD files or 2D sketches?</h3>
      <p style="margin: 0; font-size: 13px; color: #1f2326; line-height: 1.5;">
        You can email drawings, photos, or STEP files directly to <a href="mailto:themechlabengineering@gmail.com" style="color: #1560c8; font-weight: bold;">themechlabengineering@gmail.com</a> or chat via WhatsApp at <a href="https://wa.me/918610241235" style="color: #1560c8; font-weight: bold;">+91 86102 41235</a>.
      </p>
    </div>
    <h3 style="font-size: 15px; color: #1f2326;">Our 5-Step Process:</h3>
    <ol style="font-size: 14px; line-height: 1.6; color: #5b6570; padding-left: 20px;">
      <li><strong>Requirement:</strong> Review specifications and spatial constraints.</li>
      <li><strong>Concept:</strong> Propose design options, materials, and tooling methods.</li>
      <li><strong>Modelling:</strong> Build parametric 3D CAD with interference checks.</li>
      <li><strong>Drawings:</strong> Generate production prints with GD&T, fits, and BOM.</li>
      <li><strong>Print &amp; Support:</strong> Functional 3D prototypes and shop guidance.</li>
    </ol>
    <p style="font-size: 13px; color: #5b6570; border-top: 1px solid #eee; padding-top: 16px; margin-top: 24px;">
      Your designs are handled confidentially with care.<br>
      The MechLab Engineering · themechlabengineering@gmail.com · +91 86102 41235
    </p>
  </div>
</body>
</html>
    `.trim();

    const clientText = `
Hello ${cleanName},

Thank you for contacting The MechLab Engineering. We have received your project details for ${data.serviceNeeded}.

If you have CAD files (.STEP, .STL), sketches, or 2D drawings to share, please send them directly:
Email: themechlabengineering@gmail.com
WhatsApp: +91 86102 41235

Our 5-Step Process:
1. Requirement: Review specs and envelope
2. Concept: Design options and materials
3. Modelling: Parametric 3D CAD & interference checks
4. Drawings: 2D production drawings with GD&T
5. Print & Support: Prototypes & fabrication guidance

Your designs are handled confidentially.

The MechLab Engineering
    `.trim();

    await sendEmail({
      to: cleanEmail,
      subject: 'Quote Request Received - The MechLab Engineering',
      html: clientHtml,
      text: clientText,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      redirect: `/thank-you?service=${encodeURIComponent(data.serviceNeeded)}`,
    });
  } catch (error) {
    console.error('Quote submission error:', error);
    return NextResponse.json(
      { error: 'An unexpected internal error occurred. Please contact us via email.' },
      { status: 500 }
    );
  }
}

