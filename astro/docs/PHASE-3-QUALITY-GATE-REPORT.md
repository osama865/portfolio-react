# Phase 3 — quality-gate report

**Audit baseline:** `04a408b0c7b31356b21501ad31359048f6683514`  
**Workflow:** [run 43638603910](https://github.com/osama865/portfolio-react/actions/runs/43638603910)  
**Artifact:** [14130783686](https://github.com/osama865/portfolio-react/actions/runs/43638603910/artifacts/14130783686)  
**Preview:** [isolated Phase 2 branch alias](https://phase-2-evidence-backed-case.osama-portfolio-preview.pages.dev/)  
**Audit date:** 14 November 2026

## Quality gate ledger

| Gate | Evidence | Status | Limitation |
|---|---|---|---|
| Reproducible install | `npm ci` from committed lockfile | PASS | Exact workflow commit |
| Dependency security | npm audit JSON: 0 vulnerabilities | PASS | Snapshot of lockfile dependencies at baseline |
| Diagnostics | Astro and TypeScript check | PASS | Exact workflow commit |
| Production build | Astro static build | PASS | Does not deploy production |
| Local browser coverage | 129 passed, 0 failed, 19 skipped | PASS | Skips remain recorded; not silently counted as passes |
| Preview identity | HTTP 200; `portfolio-build-commit` exactly equals baseline SHA | PASS | Isolated preview only |
| Deployed browser coverage | 13 passed, 0 failed, 5 skipped | PASS | Skips remain recorded |
| Route/device sweep | 13 EN + 13 AR project routes and 17 EN + 17 AR writing routes; desktop/tablet/mobile | PASS | Automated browser coverage, not human review |
| Visual evidence | 46 screenshots in artifact, including bilingual desktop/mobile pages, both home themes and open mobile navigation | PASS | Automated captures; human visual sign-off is separate |
| axe smoke scans | 24 desktop + 24 mobile records; zero violations | PASS | Incomplete checks exist; axe is not WCAG certification |
| Keyboard interaction | Deployed keyboard/focus interaction test passed | PASS | Not a complete manual keyboard-only audit |
| Lighthouse desktop | Performance 99; Accessibility 100; Best Practices 100; SEO 63 | PASS / REVIEW | SEO score reflects deliberate noindex preview posture |
| Lighthouse mobile | Performance 95; Accessibility 100; Best Practices 100; SEO 63 | PASS / REVIEW | SEO score reflects deliberate noindex preview posture |
| External URL audit | 51 checked: 44 reachable, 7 with network/restricted/server responses | PASS WITH CLASSIFICATION | Historical URLs and profile restrictions are not internal failures |
| Arabic editorial review | No independent fluent reviewer evidence | OPEN | Required before language-quality sign-off |
| Screen-reader / manual accessibility | No human assistive-technology session evidence | OPEN | Required before final accessibility sign-off |
| Production domain / deployment | Domain and production project configuration not confirmed | OPEN | Required before production release |

## Lighthouse interpretation

The SEO category score of 63 on both devices must be interpreted in the context of the intentionally protected preview. The preview is expected to be noindex and must not be made indexable to improve a Lighthouse score. Re-run SEO checks on the approved production domain after canonical/hreflang/sitemap/robots configuration is enabled under explicit release approval.

## axe interpretation

There are 48 scan records: 24 desktop and 24 mobile, covering 12 representative English/Arabic route/theme combinations per device. Each recorded zero violations. The JSON reports also contain incomplete checks; those are not violations, but they are not automatic passes. Human accessibility review remains open.

## External-link interpretation

The 51-link audit is a snapshot. The 44 reachable responses include both source repositories and historical destinations; HTTP 200 alone does not mean a demo is maintained or functionally correct. Four DNS/network errors, two HTTP 403 responses and one HTTP 999 response remain classified as historical or access-restricted references. No internal route failure is reported by this external audit.

## Quality decision

The exact Phase 2 baseline has passed the automated quality gates represented in the workflow. Phase 3 production readiness remains open until the human sign-offs and operational prerequisites listed above are evidenced. This report does not authorize merge or deployment.
