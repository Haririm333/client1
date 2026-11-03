# MechLab project rules (always on)

1. Company facts come only from `docs/source/`. Never invent claims, numbers, clients, certifications, testimonials, prices, turnaround times, machine specs or addresses.
2. Missing info goes to `docs/CONTENT-GAPS.md`; assumptions go to `docs/ASSUMPTIONS.md`. Do not block on questions.
3. No placeholder text ships. No lorem ipsum, no "coming soon" sections, no dead links.
4. Security scans and active tests run against localhost or the owner's own staging only. Never scan third-party hosts, never run DoS or brute-force against live services.
5. No secrets in code, logs, client bundles or git history. Use `.env.example`.
6. Every phase ends with evidence (screenshot, log or report) before the next starts.
7. Design follows `mechlab-design-system`; copy follows `mechlab-content-guardrails`. If they conflict with a quick shortcut, they win.
8. Accessibility is a requirement, not a polish step: WCAG 2.2 AA, keyboard, reduced motion.
