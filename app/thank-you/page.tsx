import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import DispatchSignup from '@/components/DispatchSignup';

export const metadata: Metadata = {
  title: 'Requirement Received | The MechLab Engineering',
  description: 'Your project requirement has been delivered to The MechLab Engineering desk.',
  alternates: {
    canonical: '/thank-you',
  },
};

export default function ThankYouPage() {
  return (
    <div className="container" style={{ padding: 'clamp(48px, 6vw, 80px) 20px', maxWidth: '840px' }}>
      <div className="section-label">STATUS: TRANSMISSION RECEIVED</div>
      <h1 style={{ fontSize: 'var(--font-h1)', marginBottom: 'var(--space-16)' }}>
        Your Requirement Has Been Received
      </h1>
      <p style={{ fontSize: 'var(--font-body)', color: 'var(--muted)', lineHeight: 'var(--line-body)', marginBottom: 'var(--space-32)' }}>
        Thank you for submitting your project parameters to The MechLab Engineering. Our design team will review your specifications, functional criteria, and target constraints.
      </p>

      {/* Direct CAD Submission Callout */}
      <div style={{ border: '2px solid var(--blue-deep)', backgroundColor: 'var(--blue-wash)', padding: 'var(--space-24)', marginBottom: 'var(--space-48)' }}>
        <h2 style={{ fontSize: 'var(--font-h3)', color: 'var(--blue-deep)', marginBottom: '8px' }}>
          Have CAD Models or Drawings to Attach?
        </h2>
        <p style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--ink)', marginBottom: '16px' }}>
          If you have 3D models (.STEP, .IGES, .SLDPRT), 2D manufacturing prints (.PDF, .DXF), or photos of physical parts, send them directly to our engineering desk:
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <a
            href="mailto:themechlabengineering@gmail.com?subject=CAD%20Files%20for%20Recent%20Quote%20Request"
            className="btn-primary"
          >
            Email CAD Files
          </a>
          <a
            href="https://wa.me/918610241235?text=Hi%2C%20I%20just%20submitted%20a%20quote%20request%20and%20would%20like%20to%20send%20drawings."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            Chat on WhatsApp
          </a>
        </div>
      </div>

      {/* 5-Step Process Restatement */}
      <div style={{ border: '1px solid var(--rule)', backgroundColor: 'var(--paper)', padding: 'var(--space-32)', marginBottom: 'var(--space-48)' }}>
        <div className="section-label">THE MECHLAB WORKFLOW</div>
        <h2 style={{ fontSize: 'var(--font-h2)', marginBottom: 'var(--space-16)' }}>
          What Happens Next
        </h2>

        <ol style={{ paddingLeft: '20px', lineHeight: '1.8', color: 'var(--ink-2)', fontSize: '15px' }}>
          <li>
            <strong>1. Requirement Review:</strong> We analyze your dimensional envelope, required loads, and manufacturing methods.
          </li>
          <li>
            <strong>2. Concept &amp; Feasibility:</strong> We confirm whether standard machining, sheetmetal bending, or 3D printing best satisfies the design.
          </li>
          <li>
            <strong>3. CAD Modelling:</strong> Once authorized, full parametric 3D models with interference checks are constructed.
          </li>
          <li>
            <strong>4. Drawing Package:</strong> Complete 2D manufacturing prints with GD&amp;T, datums, fits, and BOMs are generated.
          </li>
          <li>
            <strong>5. Print &amp; Support:</strong> Functional 3D prototypes in PLA/PETG/ABS are verified, with ongoing fabrication support.
          </li>
        </ol>

        <div style={{ marginTop: '24px', borderTop: '1px solid var(--rule)', paddingTop: '16px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)', margin: 0 }}>
            NOTICE: Your designs and proprietary information are handled confidentially with care.
          </p>
        </div>
      </div>

      {/* Non-pushy Dispatch invite */}
      <div style={{ marginTop: 'var(--space-48)' }}>
        <DispatchSignup compact />
      </div>

      <div style={{ marginTop: 'var(--space-48)', display: 'flex', gap: '16px' }}>
        <Link href="/" className="btn-secondary">
          Return to Home
        </Link>
        <Link href="/work" className="btn-secondary">
          View Component Portfolio
        </Link>
      </div>
    </div>
  );
}
