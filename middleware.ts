import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString('base64');
  const pathname = request.nextUrl.pathname;

  // 1. Enforce payload size limit (max 25 KB) on mutating API endpoints
  if (pathname.startsWith('/api/')) {
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength, 10) > 25600) {
      return new NextResponse(
        JSON.stringify({ error: 'Payload exceeds maximum permitted size of 25 KB.' }),
        { status: 413, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // 2. CSRF Origin & Sec-Fetch-Site check on state-changing API requests
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
      const origin = request.headers.get('origin');
      const host = request.headers.get('host');
      const secFetchSite = request.headers.get('sec-fetch-site');

      if (secFetchSite === 'cross-site') {
        return new NextResponse(
          JSON.stringify({ error: 'Cross-site submission rejected.' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
      }

      if (origin && host) {
        try {
          const originHost = new URL(origin).host;
          if (originHost !== host) {
            return new NextResponse(
              JSON.stringify({ error: 'Origin mismatch.' }),
              { status: 403, headers: { 'Content-Type': 'application/json' } }
            );
          }
        } catch {
          return new NextResponse(
            JSON.stringify({ error: 'Invalid origin header.' }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
          );
        }
      }
    }
  }

  // 3. Construct CSP policy
  const analyticsHost = process.env.NEXT_PUBLIC_ANALYTICS_HOST || '';
  const connectSrc = ["'self'", 'https://challenges.cloudflare.com'];
  if (analyticsHost) {
    try {
      const url = new URL(analyticsHost);
      connectSrc.push(url.origin);
    } catch {
      // Ignore invalid URL
    }
  }

  // CSP per specification
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' 'strict-dynamic' https://challenges.cloudflare.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    font-src 'self' data:;
    connect-src ${connectSrc.join(' ')};
    frame-src 'self' https://challenges.cloudflare.com;
    frame-ancestors 'none';
    base-uri 'none';
    form-action 'self';
    object-src 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  // Forward nonce to request headers so Next.js App Router injects it
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-nonce', nonce);
  requestHeaders.set('Content-Security-Policy', cspHeader);

  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Attach security headers to response
  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), payment=(), usb=()'
  );
  response.headers.set('Cross-Origin-Opener-Policy', 'same-origin');
  response.headers.set('Cross-Origin-Resource-Policy', 'same-origin');
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=63072000; includeSubDomains; preload'
  );

  return response;
}

export const config = {
  matcher: [
    {
      source: '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|pdf)$).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' },
      ],
    },
  ],
};
