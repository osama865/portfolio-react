# Astro portfolio dependency security audit

**Audit date:** 13 November 2026  
**Application:** `astro/`  
**Node:** 22  
**Audit command:** `npm audit --json`  
**Result:** <strong>0 vulnerabilities</strong> (0 low, 0 moderate, 0 high, 0 critical)

## Initial findings

The first audit of the original Astro 5 dependency range found five vulnerabilities:

- 1 low
- 3 high
- 1 critical

The affected dependency paths were:

- `astro` (direct; critical)
- `esbuild` (transitive; low)
- `sharp` (transitive; high)
- `zod` (transitive; high)
- `zod-to-ts` (transitive; high)

The available remediation reported by npm required Astro 7.4.11. A blanket `npm audit fix --force` was not used.

## Remediation

Astro was deliberately upgraded to **7.4.11**. The app is a static Astro site without a server adapter or React runtime; the updated version passed Astro diagnostics, static build and the full browser test suite.

All direct dependencies are pinned to exact versions in `astro/package.json`, and `astro/package-lock.json` is committed (lockfile version 3):

| Dependency | Pinned version |
|---|---:|
| astro | 7.4.11 |
| @astrojs/check | 0.9.12 |
| @playwright/test | 1.65.0 |
| typescript | 5.9.3 |
| @types/node | 22.20.5 |

The CI pipeline now performs a clean `npm ci`, runs `npm audit`, and fails the job if any vulnerability remains. It does not suppress audit failures.

## Verification evidence

- Clean install: passed.
- npm audit: 0 vulnerabilities across all severities.
- Astro / TypeScript diagnostics: passed.
- Static production build: passed; 18 pages generated.
- Playwright: 43 passed, 1 intentionally skipped.
- The route suite checks all 18 generated routes in desktop and mobile Chromium, including page titles, primary navigation presence, image decoding and horizontal overflow.
- Existing interaction checks cover theme switching, mobile navigation and project-category filtering.

Successful CI run: https://github.com/osama865/portfolio-react/actions/runs/43428243496  
Browser and audit artifact: https://github.com/osama865/portfolio-react/actions/runs/43428243496/artifacts/14037433340

## Residual risk / notes

No npm audit findings remain in the audited dependency tree. This does not constitute a general security guarantee for the application or the historical projects it links to. Re-run the audit on dependency changes and before production release.
