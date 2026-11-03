import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | The MechLab Engineering',
  description:
    'Privacy Policy of The MechLab Engineering. We collect minimal information strictly for quotation and newsletter delivery, with zero tracking cookies.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <article className="container" style={{ padding: 'clamp(48px, 6vw, 80px) 20px', maxWidth: '840px' }}>
      <div className="section-label">LEGAL NOTICE // PRIVACY POLICY</div>
      <h1 style={{ fontSize: 'var(--font-h1)', marginBottom: 'var(--space-24)' }}>Privacy Policy</h1>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', marginBottom: 'var(--space-32)' }}>
        EFFECTIVE DATE: MARCH 1, 2026 // VERSION: 1.0.0
      </p>

      <section style={{ marginBottom: 'var(--space-32)' }}>
        <h2 style={{ fontSize: 'var(--font-h3)', marginBottom: '12px' }}>1. Overview &amp; Data Controller</h2>
        <p style={{ lineHeight: 'var(--line-body)', color: 'var(--ink-2)', marginBottom: '12px' }}>
          The MechLab Engineering (&quot;MechLab&quot;, &quot;we&quot;, &quot;us&quot;) operates this engineering studio website. We respect your personal and technical data and are committed to protecting it. For any inquiries regarding personal information, you may contact our designated desk at <a href="mailto:themechlabengineering@gmail.com">themechlabengineering@gmail.com</a> or phone <a href="tel:+918610241235">+91 86102 41235</a>.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-32)' }}>
        <h2 style={{ fontSize: 'var(--font-h3)', marginBottom: '12px' }}>2. Information We Collect</h2>
        <p style={{ lineHeight: 'var(--line-body)', color: 'var(--ink-2)', marginBottom: '12px' }}>
          We only collect personal information that you intentionally and voluntarily transmit to us:
        </p>
        <ul style={{ paddingLeft: '20px', lineHeight: '1.6', color: 'var(--ink-2)' }}>
          <li><strong>Quote Request Inquiries:</strong> Your name, work email address, phone/WhatsApp number, company name, service requirements, volume, timeline, and descriptive mechanical project parameters.</li>
          <li><strong>The MechLab Dispatch Newsletter:</strong> Your email address, timestamp of submission, and cryptographic double opt-in verification record.</li>
          <li><strong>Direct Communications:</strong> Communications sent via email, phone calls, or WhatsApp messaging.</li>
        </ul>
      </section>

      <section style={{ marginBottom: 'var(--space-32)' }}>
        <h2 style={{ fontSize: 'var(--font-h3)', marginBottom: '12px' }}>3. How We Use Your Information</h2>
        <p style={{ lineHeight: 'var(--line-body)', color: 'var(--ink-2)', marginBottom: '12px' }}>
          Your data is used solely for standard engineering operations:
        </p>
        <ul style={{ paddingLeft: '20px', lineHeight: '1.6', color: 'var(--ink-2)' }}>
          <li>Evaluating design feasibility, tolerances, and issuing quotation estimates.</li>
          <li>Communicating directly regarding technical milestones, drawings, and prototype fabrication.</li>
          <li>Delivering requested technical bulletin issues of <em>The MechLab Dispatch</em>.</li>
          <li>Deterring automated bot abuse and network spam via Cloudflare Turnstile.</li>
        </ul>
        <p style={{ lineHeight: 'var(--line-body)', color: 'var(--ink-2)', marginTop: '12px' }}>
          We do not sell, rent, monetize, or disclose your contact details or CAD files to third parties for marketing purposes.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-32)' }}>
        <h2 style={{ fontSize: 'var(--font-h3)', marginBottom: '12px' }}>4. Cookieless Privacy &amp; Analytics</h2>
        <p style={{ lineHeight: 'var(--line-body)', color: 'var(--ink-2)' }}>
          Our website does not deploy invasive tracking cookies, third-party remarketing pixels, or fingerprinting scripts. Any web traffic metrics collected are aggregate, anonymized, and cookieless, respecting browser Do Not Track signals.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-32)' }}>
        <h2 style={{ fontSize: 'var(--font-h3)', marginBottom: '12px' }}>5. Confidentiality of Engineering Files</h2>
        <p style={{ lineHeight: 'var(--line-body)', color: 'var(--ink-2)' }}>
          All CAD models, sketches, 2D prints, and specifications shared with The MechLab Engineering are treated with confidentiality. We do not expose client geometries, product names, or proprietary designs publicly without prior authorization.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-32)' }}>
        <h2 style={{ fontSize: 'var(--font-h3)', marginBottom: '12px' }}>6. Your Rights &amp; Unsubscribe</h2>
        <p style={{ lineHeight: 'var(--line-body)', color: 'var(--ink-2)', marginBottom: '12px' }}>
          In accordance with applicable privacy frameworks, including the Digital Personal Data Protection (DPDP) Act 2023 of India, you hold the right to:
        </p>
        <ul style={{ paddingLeft: '20px', lineHeight: '1.6', color: 'var(--ink-2)' }}>
          <li>Request deletion or correction of your submitted contact records.</li>
          <li>Unsubscribe from <em>The MechLab Dispatch</em> at any time using the one-click unsubscribe header or link in any issue, or via our <Link href="/dispatch/unsubscribe">Unsubscribe Form</Link>.</li>
        </ul>
      </section>

      <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--space-24)', marginTop: 'var(--space-48)' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)' }}>
          Notice for Business Owner: This policy represents the actual technical implementation. Formal legal review should be conducted by qualified counsel.
        </p>
      </div>
    </article>
  );
}
