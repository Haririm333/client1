import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | The MechLab Engineering',
  description:
    'Terms of Service governing engineering design, CAD modelling, 2D drafting, and 3D printing services provided by The MechLab Engineering.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <article className="container" style={{ padding: 'clamp(48px, 6vw, 80px) 20px', maxWidth: '840px' }}>
      <div className="section-label">LEGAL NOTICE // TERMS OF SERVICE</div>
      <h1 style={{ fontSize: 'var(--font-h1)', marginBottom: 'var(--space-24)' }}>Terms of Service</h1>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: 'var(--muted)', marginBottom: 'var(--space-32)' }}>
        EFFECTIVE DATE: MARCH 1, 2026 // VERSION: 1.0.0
      </p>

      <section style={{ marginBottom: 'var(--space-32)' }}>
        <h2 style={{ fontSize: 'var(--font-h3)', marginBottom: '12px' }}>1. Scope of Engineering Services</h2>
        <p style={{ lineHeight: 'var(--line-body)', color: 'var(--ink-2)' }}>
          The MechLab Engineering provides mechanical design, parametric 3D CAD modelling, 2D manufacturing drafting with GD&amp;T, reverse engineering, fabrication technical support, and rapid 3D printing prototyping services. All services are governed by project-specific written scope documents, milestone agreements, and accepted quotation sheets.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-32)' }}>
        <h2 style={{ fontSize: 'var(--font-h3)', marginBottom: '12px' }}>2. Quotations and Project Estimates</h2>
        <p style={{ lineHeight: 'var(--line-body)', color: 'var(--ink-2)' }}>
          Submissions made through our <Link href="/quote">Quote Form</Link> constitute requests for preliminary engineering review. Formal estimates and execution timelines are provided based on client-provided specifications, CAD models, materials, and batch quantities.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-32)' }}>
        <h2 style={{ fontSize: 'var(--font-h3)', marginBottom: '12px' }}>3. Client Materials &amp; Intellectual Property</h2>
        <p style={{ lineHeight: 'var(--line-body)', color: 'var(--ink-2)', marginBottom: '12px' }}>
          Clients retain all proprietary rights, patents, copyrights, and design ownership in their original concepts, physical parts, and project inputs. Upon full settlement of agreed project fees, the final deliverables (including 3D STEP models, 2D PDF drawing packages, and DXF flat patterns) become the property of the client, as defined in the specific agreement.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-32)' }}>
        <h2 style={{ fontSize: 'var(--font-h3)', marginBottom: '12px' }}>4. Studio Confidentiality</h2>
        <p style={{ lineHeight: 'var(--line-body)', color: 'var(--ink-2)' }}>
          In accordance with our standing principles, all customer drawings, sketches, CAD files, and technical communications are handled with strict professional care.
        </p>
      </section>

      <section style={{ marginBottom: 'var(--space-32)' }}>
        <h2 style={{ fontSize: 'var(--font-h3)', marginBottom: '12px' }}>5. Verification &amp; Shop Floor Handover</h2>
        <p style={{ lineHeight: 'var(--line-body)', color: 'var(--ink-2)' }}>
          While The MechLab Engineering applies rigorous Design-for-Manufacture (DFM) verification and interference checks to all 3D assemblies and 2D drawings, manufacturing tolerances, tooling limits, and machine capabilities vary by fabrication vendor. The client and their manufacturing partners remain responsible for verifying pilot parts and conducting first-article inspection prior to high-volume production.
        </p>
      </section>

      <div style={{ borderTop: '1px solid var(--rule)', paddingTop: 'var(--space-24)', marginTop: 'var(--space-48)' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: 'var(--muted)' }}>
          Questions regarding these terms may be directed to <a href="mailto:themechlabengineering@gmail.com">themechlabengineering@gmail.com</a>.
        </p>
      </div>
    </article>
  );
}
