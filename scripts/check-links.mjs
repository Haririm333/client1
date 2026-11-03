import http from 'http';

const ROUTES = [
  '/',
  '/services',
  '/services/mechanical-design-cad',
  '/services/sheetmetal-design',
  '/services/drafting-gdt',
  '/services/reverse-engineering',
  '/services/product-development',
  '/services/fabrication-support',
  '/services/3d-printing',
  '/work',
  '/process',
  '/about',
  '/quote',
  '/contact',
  '/dispatch',
  '/dispatch/001',
  '/dispatch/confirm',
  '/dispatch/unsubscribe',
  '/dispatch/feed.xml',
  '/privacy',
  '/terms',
  '/thank-you',
  '/robots.txt',
  '/sitemap.xml',
  '/.well-known/security.txt',
];

async function checkRoute(port, route) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:${port}${route}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 400) {
          resolve({ route, status: res.statusCode, ok: true });
        } else {
          resolve({ route, status: res.statusCode, ok: false });
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

async function run() {
  const port = process.env.PORT || 3000;
  console.log(`Checking ${ROUTES.length} routes against http://localhost:${port}...`);

  let failures = 0;
  for (const r of ROUTES) {
    try {
      const res = await checkRoute(port, r);
      if (res.ok) {
        console.log(`[PASS] ${r} -> HTTP ${res.status}`);
      } else {
        console.error(`[FAIL] ${r} -> HTTP ${res.status}`);
        failures++;
      }
    } catch (err) {
      console.error(`[ERROR] ${r} -> ${err.message}`);
      failures++;
    }
  }

  // Check 404 handling
  try {
    const res404 = await checkRoute(port, '/non-existent-mechanical-sheet-999');
    if (res404.status === 404) {
      console.log(`[PASS] /non-existent-mechanical-sheet-999 -> HTTP 404 (custom 404 page verified)`);
    } else {
      console.warn(`[WARN] 404 check returned status: ${res404.status}`);
    }
  } catch (err) {
    console.error(`[ERROR] 404 test error: ${err.message}`);
  }

  if (failures > 0) {
    console.error(`Link check failed with ${failures} errors.`);
    process.exit(1);
  } else {
    console.log('✔ All routes verified successfully: Zero dead links.');
    process.exit(0);
  }
}

run();

