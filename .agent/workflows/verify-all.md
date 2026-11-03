---
description: Run the full verification and security gate
---
1. `npm run typecheck && npm run lint`
2. `npm run test` (unit)
3. `npm run build && npm run start` in background, then `npm run test:e2e`
4. `npm run test:a11y`, `npm run lhci`
5. `npm audit --omit=dev`, `gitleaks detect`, `semgrep --config auto`
6. ZAP baseline against http://localhost:3000 (see skill mechlab-pentest-audit)
7. Capture browser-agent screenshots at 360, 768, 1280, 1920 for every route
8. Update `docs/qa/QA-REPORT.md` and `docs/security/PENTEST-REPORT.md`; list anything failing at the top
