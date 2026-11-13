# Phase 2 quality report

**Assessment date:** 2026-11-13  
**Repository:** `osama865/portfolio-react`  
**PR:** [#2 — Draft, open, unmerged](https://github.com/osama865/portfolio-react/pull/2)  
**Branch:** `phase-2/evidence-backed-case-studies`  
**Latest source candidate covered by the most recent run request:** `2bcd69830083a844c22f5aa5660f2b89e2bbc8db`  
**Current acceptance:** Not accepted

## 1. Exact-head CI ledger

| Run | Exact SHA | Actual browser result | Build checks | Artifact |
|---|---|---:|---|---|
| [43492092393](https://github.com/osama865/portfolio-react/actions/runs/43492092393) | `9413757fcde394ad3c1db99b7ff019733aa9f85a` | 105 passed / 0 failed / 7 skipped (112 total) | Passed | [14070196272](https://github.com/osama865/portfolio-react/actions/runs/43492092393/artifacts/14070196272) |
| [43494823880](https://github.com/osama865/portfolio-react/actions/runs/43494823880) | `d38845b2e94add2fc9b64ac7d0f35dff36630163` | 110 passed / 13 failed / 7 skipped (130 total) | Clean install, audit, diagnostics, build passed | [14071462406](https://github.com/osama865/portfolio-react/actions/runs/43494823880/artifacts/14071462406) |
| [43495874766](https://github.com/osama865/portfolio-react/actions/runs/43495874766) | `effa9ad4d8f5c96ae836b21e5660718d48dfa31b` | 116 passed / 9 failed / 7 skipped (132 total) | Clean install, audit, diagnostics, build passed | [14072175689](https://github.com/osama865/portfolio-react/actions/runs/43495874766/artifacts/14072175689) |
| [43496996017](https://github.com/osama865/portfolio-react/actions/runs/43496996017) | `2bcd69830083a844c22f5aa5660f2b89e2bbc8db` | Pending; no totals | No completed result available | No artifact available |

The baseline run 43492092393 is English-only and predates the Arabic/theme implementation. It is not current acceptance evidence. Cancelled/superseded runs are not counted as passes.

### Artifact inspection
Artifact 14072175689 was downloaded and inspected. It includes the Playwright HTML report, failed-test screenshots, traces, test-results, audit JSON and committed lockfile. The Arabic writing-detail screenshot showed the document expanding to 467 px against a 413 px mobile viewport at `/ar/writing/document-designmode/`. The resulting CSS correction is in the later source candidate; the corrected route still requires a passing rerun and visual inspection.

## 2. Route and locale coverage

The new exhaustive route test enumerates:
- 13 English project-detail routes and all 13 Arabic counterparts.
- 17 English writing-entry routes and all 17 Arabic counterparts.
- English and Arabic home, project archive, writing archive, About, Engineering Approach and Contact routes.

For every generated route it checks document language/direction, visible H1 and non-empty content, absence of common unresolved placeholders, route-switch destination, internal route allowlist, title/description/Open Graph/Twitter metadata, and horizontal overflow at configured desktop/mobile viewports.

Run 43495874766 executed this test: desktop route sweep passed; the mobile sweep found the `/ar/writing/document-designmode/` overflow described above. The overflow CSS correction, language-switch identity assertion correction, storage-origin test correction, and stale theme-selector corrections are committed after that run. The next exact-head run must confirm all 60 dynamic project/writing routes and their language counterparts.

Archive regression assertions remain: 13 project cards, 17 writing entries, exactly two featured case studies, and the third featured position intentionally empty.

## 3. Preview identity and visual inspection

The correct isolated Astro preview project is `osama-portfolio-preview`. The legacy `o-portfolio` Cloudflare project is not evidence for the Astro experience.

- Last confirmed isolated preview: commit `20b0283`, URL [https://f703fcbd.osama-portfolio-preview.pages.dev](https://f703fcbd.osama-portfolio-preview.pages.dev).
- Stable branch alias: [https://phase-2-evidence-backed-case.osama-portfolio-preview.pages.dev](https://phase-2-evidence-backed-case.osama-portfolio-preview.pages.dev).
- The latest source candidate `2bcd69830083a844c22f5aa5660f2b89e2bbc8db` received a Cloudflare build-in-progress notification; no successful deployment with that exact SHA has been verified yet.

The workflow now includes Phase 2 push preview readiness: it polls the isolated branch alias until the embedded `portfolio-build-commit` marker equals the run's exact SHA, then runs deployed browser checks. The deployed test covers the exact marker, bilingual locale switching, theme interaction, English/Arabic homepages, archives, both featured case studies, writing archive/detail, desktop/mobile screenshots, and open mobile navigation. It also runs an axe-core WCAG 2.1 A/AA smoke scan on representative routes. This suite has not yet produced successful results for the latest source candidate.

Earlier artifact screenshots inspected:
- English desktop homepage and project archive.
- English mobile homepage/archive and selected editorial pages.
- Arabic mobile project archive, which looked readable overall but the artifact test exposed unloaded lazy images before the image assertion was corrected.
- Arabic writing detail screenshot revealed the long technical identifier overflow, now addressed in CSS.

No complete latest bilingual visual matrix has been accepted yet.

## 4. Accessibility, performance, links and SEO

### Accessibility and keyboard
- Theme and language controls use visible focus styling and accessible labels/state.
- Automated keyboard test now tabs to the language switch, activates it with Enter, tabs to the theme control and activates it with Enter; it asserts visible focus. Result pending.
- Axe scan was added to the deployed preview test for representative English/Arabic routes and desktop/mobile. Result pending.
- No manual screen-reader review or WCAG certification is claimed. Axe is a smoke scan, not certification.

### Motion
- Automated tests cover reduced-motion bypass and unsupported View Transitions fallback; earlier candidate runs passed those tests.
- Final exact-head rerun remains pending.

### Performance
- Lighthouse or equivalent performance assessment has not been completed. No performance score or acceptance claim is made.

### Internal and external links
- Exhaustive route coverage checks internal link targets against the generated route set; the Arabic archive test forces lazy images to load before asserting image integrity.
- A full network status audit of all static assets and external destinations is not yet complete.
- External project/article destinations are historical references where stated; they must not be treated as proof of current deployment availability.

### SEO/social metadata
- All routes provide page titles and meta descriptions.
- Localized Open Graph title/description/type/site/locale and Twitter card/title/description are now emitted and asserted by the exhaustive route test.
- No canonical URL, absolute Open Graph URL/image, or reciprocal `hreflang` is emitted yet. The canonical public domain and approved social image are not confirmed; preview URLs must not be used as production canonical URLs.

## 5. Arabic editorial status

Arabic copy is implemented across all requested portfolio-owned routes, but no independent fluent Arabic editorial review has been completed. The Arabic translation is therefore **not linguistically accepted**. English external articles remain in their original language and the Arabic pages explicitly describe themselves as summaries, not full translations.

## 6. Remaining blockers and disposition

| Blocker | Evidence | Disposition |
|---|---|---|
| Exact-head CI for final report head | Latest source candidate run 43496996017 pending; report-only update creates a newer head requiring another run | Must pass on exact final PR head; inspect full counts and artifact |
| Exact-SHA preview | Last confirmed isolated deployment is 20b0283, not latest source candidate | Wait for latest branch preview; require marker equality and deployed browser tests |
| Visual acceptance | Older screenshots inspected; latest bilingual matrix not yet produced/inspected | Inspect screenshots/traces for desktop/mobile, both locales/themes and mobile nav |
| Mobile RTL overflow | Found at `/ar/writing/document-designmode/` in run 43495874766; CSS fix committed | Re-run exhaustive route suite and inspect fixed screenshot |
| axe accessibility | axe-core scan added but no result yet | Resolve serious/critical violations; report remaining findings; not WCAG certification |
| Keyboard/manual accessibility | Automated keyboard test added, pending; no manual screen-reader audit | Execute test and perform manual review |
| Performance | No Lighthouse/equivalent run | Run Lighthouse or explicitly defer with reason before acceptance |
| External link integrity | No complete external URL probe | Audit and classify historical destinations separately from internal failures |
| Canonical/hreflang | Canonical host not confirmed | Product owner must confirm canonical public domain; then add absolute canonical and reciprocal hreflang |
| Social image | No approved social-card image | Do not invent; add only after approved asset exists |
| Arabic fluency | No independent fluent reviewer | Obtain independent review before linguistic acceptance |

## 7. Preserved scope and decision

- Exactly two featured case studies: INJAZ and Life-Advise; third slot stays empty.
- All 13 project records retained; Food Recipes remains reserve.
- No invented credentials, metrics, testimonials, employment claims or authorship.
- No merge of PR #2 or PR #1; no `master` change; no production deployment or production Cloudflare configuration changes.

**Disposition: Phase 2 remains Draft and unaccepted.** A green build alone is insufficient. Acceptance is blocked by exact-head CI/artifact evidence, exact-SHA preview/browser evidence, visual inspection, accessibility/keyboard findings, performance disposition, external-link audit, canonical/hreflang decision, and independent Arabic editorial review.
