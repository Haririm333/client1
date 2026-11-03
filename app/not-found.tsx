import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 - Sheet Not Found',
  description: 'The requested engineering drawing or document could not be located.',
};

export default function NotFound() {
  return (
    <div className="container" style={{ padding: 'clamp(64px, 10vw, 120px) 20px', textAlign: 'center' }}>
      <div className="section-label" style={{ justifyContent: 'center', marginBottom: 'var(--space-16)' }}>
        ERROR 404 // REGISTRY MISSING
      </div>

      <h1 style={{ fontSize: 'clamp(56px, 8vw, 100px)', lineHeight: '1', color: 'var(--ink)', marginBottom: 'var(--space-16)' }}>
        404
      </h1>

      <p style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: 'var(--blue-deep)', marginBottom: 'var(--space-16)' }}>
        Requested Drawing Sheet Not Found
      </p>

      <p style={{ fontSize: 'var(--font-body)', color: 'var(--muted)', maxWidth: '540px', margin: '0 auto var(--space-32) auto', lineHeight: 'var(--line-body)' }}>
        The drawing file, specification page, or document index you requested does not exist in our studio archives or may have been relocated.
      </p>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
        <Link href="/" className="btn-primary">
          Return to Drawing Sheet (Home)
        </Link>
        <Link href="/services" className="btn-secondary">
          Browse Services Directory
        </Link>
        <Link href="/contact" className="btn-secondary">
          Contact Studio
        </Link>
      </div>

      <div style={{ marginTop: 'var(--space-64)', padding: 'var(--space-16)', border: '1px solid var(--rule)', backgroundColor: 'var(--sheet)', display: 'inline-block' }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)' }}>
          DWG REF: 0x404 // THE MECHLAB ENGINEERING
        </span>
      </div>
    </div>
  );
}

