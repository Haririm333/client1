import http from 'http';

const ROUTES_TO_CHECK = [
  '/',
  '/services',
  '/services/sheetmetal-design',
  '/work',
  '/process',
  '/about',
  '/quote',
  '/contact',
  '/dispatch',
  '/dispatch/001',
  '/privacy',
  '/terms',
  '/.well-known/security.txt',
];

async function checkHeaders(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      const headers = res.headers;
      const issues = [];

      // Skip dynamic security headers checks on static assets like security.txt
      if (path === '/.well-known/security.txt') {
        if (res.statusCode !== 200) issues.push(`security.txt status was ${res.statusCode}`);
        return resolve({ path, statusCode: res.statusCode, issues });
      }

      // Check Content-Security-Policy
      const csp = headers['content-security-policy'];
      if (!csp) {
        issues.push('Missing Content-Security-Policy');
      } else {
        if (!csp.includes('nonce-')) issues.push('CSP missing request nonce');
        if (!csp.includes("frame-ancestors 'none'")) issues.push('CSP missing frame-ancestors none');
        if (!csp.includes("object-src 'none'")) issues.push('CSP missing object-src none');
      }

      // Check X-Content-Type-Options
      if (headers['x-content-type-options'] !== 'nosniff') {
        issues.push('Missing or invalid X-Content-Type-Options');
      }

      // Check X-Frame-Options
      if (headers['x-frame-options'] !== 'DENY') {
        issues.push('Missing or invalid X-Frame-Options');
      }

      // Check Referrer-Policy
      if (!headers['referrer-policy']) {
        issues.push('Missing Referrer-Policy');
      }

      // Check Permissions-Policy
      if (!headers['permissions-policy']) {
        issues.push('Missing Permissions-Policy');
      }

      // Check COOP & CORP
      if (headers['cross-origin-opener-policy'] !== 'same-origin') {
        issues.push('Missing or invalid Cross-Origin-Opener-Policy');
      }
      if (headers['cross-origin-resource-policy'] !== 'same-origin') {
        issues.push('Missing or invalid Cross-Origin-Resource-Policy');
      }

      resolve({ path, statusCode: res.statusCode, issues });
    }).on('error', reject);
  });
}

async function run() {
  console.log('Auditing HTTP Security Headers across routes on http://localhost:3000...');
  let hasFailures = false;

  for (const r of ROUTES_TO_CHECK) {
    const res = await checkHeaders(r);
    if (res.issues.length > 0) {
      console.error('[HEADER VIOLATION]', res.statusCode, r, res.issues);
      hasFailures = true;
    } else {
      console.log('[HEADER OK]', res.statusCode, r, 'All security headers verified');
    }
  }

  // Also verify nonce uniqueness across two requests
  const req1 = await new Promise((res) => http.get('http://localhost:3000/', (r) => res(r.headers['content-security-policy'])));
  const req2 = await new Promise((res) => http.get('http://localhost:3000/', (r) => res(r.headers['content-security-policy'])));
  const nonce1 = req1?.match(/nonce-([^' ]+)/)?.[1];
  const nonce2 = req2?.match(/nonce-([^' ]+)/)?.[1];

  if (!nonce1 || !nonce2 || nonce1 === nonce2) {
    console.error('❌ Nonce uniqueness check failed: Nonces must be unique per request');
    hasFailures = true;
  } else {
    console.log(`✔ Nonce uniqueness verified: request 1 (${nonce1.slice(0, 8)}...) != request 2 (${nonce2.slice(0, 8)}...)`);
  }

  if (hasFailures) {
    process.exit(1);
  } else {
    console.log('\n✔ All security header checks passed.');
  }
}

run();
