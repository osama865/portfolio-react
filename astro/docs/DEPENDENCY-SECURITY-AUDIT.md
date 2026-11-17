# Astro portfolio dependency security audit

**Audit date:** 13 November 2026  
**Application:** `astro/`  
**Node:** 22  
**Audit command:** `npm audit --json`

## Initial findings and remediation

The first audit of the original Astro 5 dependency range found five vulnerabilities (1 low, 3 high, 1 critical). The affected dependency paths included Astro, esbuild, sharp, zod and zod-to-ts.

The remediation was a deliberate upgrade to **Astro 7.4.11**; a blanket `npm audit fix --force` was not used. The app is a static Astro site without a server adapter or React runtime.

All direct dependencies are pinned to exact versions in `astro/package.json`, and `astro/package-lock.json` is committed (lockfile version 3):

| Dependency | Pinned version |
|---|---:|
| astro | 7.4.11 |
| @astrojs/check | 0.9.12 |
| @playwright/test | 1.65.0 |
| typescript | 5.9.3 |
| @types/node | 22.20.5 |

## CI verification contract

The workflow now:
- Runs `npm ci` directly against the committed manifest and lockfile.
- Does not run `npm install`, regenerate the lockfile, rewrite dependency versions, commit, or push dependency changes.
- Uses `contents: read` permissions.
- Checks that `package.json` and `package-lock.json` remain unchanged after installation and after the test suite.
- Runs `npm audit` against the installed dependency tree and fails the job on any reported vulnerability.
- Runs Astro/TypeScript diagnostics, the production build and the Playwright suite.

## Verification status

**The corrected workflow has been committed, but its new CI run is the required evidence for this audit.** Earlier successful workflow runs are not accepted as reproducibility evidence because the previous workflow modified dependency files before running `npm ci`. Their audit counts and test results are historical only; they do not establish that the exact committed manifest and lockfile were tested unchanged.

The final evidence record will be updated with the single successful run URL, its exact tested commit SHA and its artifact after that corrected run completes.

## Scope and residual risk

A zero-finding `npm audit` result will describe only the dependency tree installed from this committed lockfile at the time of the run. It is not a general security guarantee for the application or the historical projects it links to. Re-run the audit on dependency changes and before production release.
