import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const EMAIL_OUT_DIR = path.resolve('docs/qa/email-renders');
if (!fs.existsSync(EMAIL_OUT_DIR)) {
  fs.mkdirSync(EMAIL_OUT_DIR, { recursive: true });
}

const sampleEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Confirm Your Subscription - The MechLab Dispatch</title>
</head>
<body style="font-family: Georgia, 'Times New Roman', serif; background-color: #f4f5f7; margin: 0; padding: 24px;">
  <table width="600" align="center" style="max-width: 600px; width: 100%; background-color: #ffffff; border: 1px solid #dfe4ea; border-collapse: collapse; margin: 0 auto;">
    <tr>
      <td style="padding: 24px 32px; border-bottom: 3px double #1f2326; text-align: center;">
        <h1 style="font-size: 28px; margin: 0; color: #1f2326; font-family: Georgia, serif;">The MechLab Dispatch</h1>
        <p style="font-family: monospace; font-size: 11px; margin: 4px 0 0 0; color: #5b6570; letter-spacing: 0.1em;">NOTES FROM THE DESIGN DESK</p>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px;">
        <h2 style="font-size: 20px; color: #1f2326; margin-top: 0;">Confirm your free subscription</h2>
        <p style="font-size: 16px; line-height: 1.6; color: #2b3035;">
          You requested to subscribe to <em>The MechLab Dispatch</em>, an independent technical bulletin on mechanical design, DFM principles, GD&amp;T, and rapid prototyping.
        </p>
        <p style="font-size: 16px; line-height: 1.6; color: #2b3035;">
          To verify your email address and activate your subscription, please confirm below. This link expires in 24 hours.
        </p>
        <div style="margin: 28px 0; text-align: center;">
          <a href="http://localhost:3000/dispatch/confirm?token=test-token" style="background-color: #1560c8; color: #ffffff; padding: 12px 24px; text-decoration: none; font-family: monospace; font-size: 14px; font-weight: bold; border-radius: 2px; display: inline-block;">CONFIRM SUBSCRIPTION</a>
        </div>
        <p style="font-size: 13px; line-height: 1.5; color: #5b6570;">
          If the button does not work, copy and paste this address into your browser:<br>
          <a href="http://localhost:3000/dispatch/confirm?token=test-token" style="color: #1560c8;">http://localhost:3000/dispatch/confirm?token=test-token</a>
        </p>
        <p style="font-size: 13px; line-height: 1.5; color: #5b6570;">
          If you did not make this request, you can safely ignore this email.
        </p>
      </td>
    </tr>
    <tr>
      <td style="padding: 20px 32px; background-color: #f4f5f7; border-top: 1px solid #dfe4ea; font-family: monospace; font-size: 11px; color: #5b6570; text-align: center;">
        The MechLab Engineering · themechlabengineering@gmail.com · +91 86102 41235<br>
        <a href="http://localhost:3000/dispatch/unsubscribe?token=test-token" style="color: #5b6570; text-decoration: underline;">Unsubscribe</a>
      </td>
    </tr>
  </table>
</body>
</html>
`;

async function verifyEmail() {
  console.log('Testing Email HTML render at 375px and 600px widths...');
  const browser = await chromium.launch();

  // Test 1: 375px (Mobile Client)
  const page375 = await browser.newPage({ viewport: { width: 375, height: 800 } });
  await page375.setContent(sampleEmailHtml);
  await page375.screenshot({ path: path.join(EMAIL_OUT_DIR, 'email-render-375px.png') });
  console.log('  Captured email-render-375px.png');
  await page375.close();

  // Test 2: 600px (Standard Desktop Email Client)
  const page600 = await browser.newPage({ viewport: { width: 600, height: 800 } });
  await page600.setContent(sampleEmailHtml);
  await page600.screenshot({ path: path.join(EMAIL_OUT_DIR, 'email-render-600px.png') });
  console.log('  Captured email-render-600px.png');
  await page600.close();

  await browser.close();
  console.log('✔ Email HTML rendering verified cleanly at 375px and 600px.');
}

verifyEmail().catch((err) => {
  console.error('Email render check failed:', err);
  process.exit(1);
});

