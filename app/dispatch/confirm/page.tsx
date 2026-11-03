'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ConfirmContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedEmail, setConfirmedEmail] = useState('');

  const handleConfirm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setStatus('error');
      setErrorMessage('Verification token is missing. Please use the complete link from your confirmation email.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/dispatch/confirm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        setErrorMessage(data.error || 'Verification failed. The link may have expired or is invalid.');
        return;
      }

      setStatus('success');
      setConfirmedEmail(data.email || '');
    } catch {
      setStatus('error');
      setErrorMessage('Network connection error. Please try again.');
    }
  };

  return (
    <div className="container" style={{ padding: 'clamp(48px, 6vw, 80px) 20px', maxWidth: '640px' }}>
      <div className="section-label">THE MECHLAB DISPATCH // SUBSCRIPTION VERIFICATION</div>

      <div style={{ border: '2px solid var(--ink)', backgroundColor: 'var(--paper)', padding: 'var(--space-32)', marginTop: 'var(--space-24)' }}>
        <h1 style={{ fontFamily: 'var(--font-serif-masthead)', fontSize: 'clamp(28px, 4vw, 36px)', marginBottom: 'var(--space-16)' }}>
          Confirm Your Subscription
        </h1>

        {status === 'success' ? (
          <div style={{ backgroundColor: 'var(--blue-wash)', border: '1px solid var(--blue)', padding: 'var(--space-24)' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: 'var(--blue-deep)', marginBottom: '8px' }}>
              Subscription Confirmed
            </h2>
            <p style={{ fontSize: '15px', lineHeight: '1.6', color: 'var(--ink-2)', marginBottom: '16px' }}>
              Your email address {confirmedEmail ? `(${confirmedEmail}) ` : ''}has been verified. You will receive future technical bulletins from <em>The MechLab Dispatch</em>.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link href="/dispatch/001" className="btn-primary">
                Read Issue 001 Now →
              </Link>
              <Link href="/" className="btn-secondary">
                Return to Studio Home
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <p style={{ fontFamily: 'var(--font-serif-body)', fontSize: '16px', lineHeight: '1.6', color: 'var(--ink-2)', marginBottom: 'var(--space-24)' }}>
              To protect your privacy and ensure automated email scanners do not activate subscriptions inadvertently, please press the button below to confirm your free subscription to <em>The MechLab Dispatch</em>.
            </p>

            {status === 'error' && (
              <div style={{ border: '1px solid #b91c1c', backgroundColor: '#fef2f2', padding: '12px 16px', marginBottom: 'var(--space-20)', color: '#b91c1c', fontSize: '14px' }}>
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleConfirm}>
              <button
                type="submit"
                className="btn-primary"
                disabled={status === 'loading'}
                style={{ width: '100%', height: '48px', fontSize: '14px' }}
              >
                {status === 'loading' ? 'Verifying token…' : 'Confirm Subscription'}
              </button>
            </form>

            <p style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--muted)', marginTop: 'var(--space-16)' }}>
              TOKEN EXPIRES 24 HOURS AFTER ISSUANCE. FREE SUBSCRIPTION · UNSUBSCRIBE AT ANY TIME.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '80px 20px' }}>Loading verification...</div>}>
      <ConfirmContent />
    </Suspense>
  );
}

