'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleUnsubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/dispatch/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: token || undefined, email: email || undefined }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus('error');
        setMessage(data.error || 'Unable to process unsubscribe request.');
        return;
      }

      setStatus('success');
      setMessage(data.message || 'You have been unsubscribed from The MechLab Dispatch.');
    } catch {
      setStatus('error');
      setMessage('Network connection error. Please try again.');
    }
  };

  return (
    <div className="container" style={{ padding: 'clamp(48px, 6vw, 80px) 20px', maxWidth: '640px' }}>
      <div className="section-label">THE MECHLAB DISPATCH // SUBSCRIPTION PREFERENCES</div>

      <div style={{ border: '1px solid var(--rule)', backgroundColor: 'var(--paper)', padding: 'var(--space-32)', marginTop: 'var(--space-24)' }}>
        <h1 style={{ fontFamily: 'var(--font-serif-masthead)', fontSize: 'clamp(28px, 4vw, 36px)', marginBottom: 'var(--space-16)' }}>
          Unsubscribe from The MechLab Dispatch
        </h1>

        {status === 'success' ? (
          <div style={{ backgroundColor: 'var(--sheet)', border: '1px solid var(--rule)', padding: 'var(--space-24)' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: 'var(--ink)', marginBottom: '8px' }}>
              Unsubscribed Successfully
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.6', marginBottom: '16px' }}>
              {message}
            </p>
            <Link href="/" className="btn-secondary">
              Return to Studio Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleUnsubscribe}>
            <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.6', marginBottom: 'var(--space-24)' }}>
              We are sorry to see you go. Confirm your email address below to immediately remove yourself from all future technical dispatch mailings.
            </p>

            {status === 'error' && (
              <div style={{ border: '1px solid #b91c1c', backgroundColor: '#fef2f2', padding: '12px', color: '#b91c1c', fontSize: '14px', marginBottom: '16px' }}>
                {message}
              </div>
            )}

            {!token && (
              <div style={{ marginBottom: 'var(--space-16)' }}>
                <label htmlFor="unsub-email" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 'bold', marginBottom: '6px' }}>
                  YOUR EMAIL ADDRESS *
                </label>
                <input
                  id="unsub-email"
                  type="email"
                  required
                  placeholder="engineer@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{ width: '100%', padding: '12px', border: '1px solid var(--rule)', fontFamily: 'var(--font-mono)' }}
                />
              </div>
            )}

            <button
              type="submit"
              className="btn-secondary"
              disabled={status === 'loading'}
              style={{ width: '100%', height: '48px', color: '#b91c1c', borderColor: '#b91c1c' }}
            >
              {status === 'loading' ? 'Processing…' : 'Unsubscribe'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={<div className="container" style={{ padding: '80px 20px' }}>Loading...</div>}>
      <UnsubscribeContent />
    </Suspense>
  );
}

