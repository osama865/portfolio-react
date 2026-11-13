# Portfolio Phase 2 implementation report

**Assessment date:** 2026-11-13  
**Repository:** `osama865/portfolio-react`  
**Branch:** `phase-2/evidence-backed-case-studies`  
**PR:** [#2 — Draft, open, unmerged](https://github.com/osama865/portfolio-react/pull/2)  
**Latest application source candidate:** `2bcd69830083a844c22f5aa5660f2b89e2bbc8db`

## Implemented

### Editorial case studies and archive
- Added INJAZ and Life-Advise case studies with explanatory architecture/evolution diagrams and evidence/status qualifications.
- Homepage features exactly two editorial case studies: INJAZ and Life-Advise. The third featured position remains intentionally empty.
- Retained all 13 project records; Food Recipes PWA remains a reserve, not featured.
- Project descriptions distinguish current work from historical references. No unsupported personal qualifications, employment history, testimonials, metrics or authorship claims were added.

### Arabic experience
- Added typed locale messages and route mapping in `astro/src/i18n/messages.ts`.
- Shared layout sets `lang="en" dir="ltr"` or `lang="ar" dir="rtl"`, localises navigation/footer/accessibility labels, and preserves route identity through the language switch.
- Arabic routes exist for the homepage, archive, all 13 project details, both featured case studies, About, Engineering Approach, Contact, Writing archive and all 17 writing entries.
- Translated homepage, project descriptions/categories/statuses, case-study copy/diagrams/timelines/evidence wording, writing display titles/summaries/categories and date labels.
- External writing retains its original destination and is labelled as original-language publication; Arabic summaries do not imply that the external article itself is translated.
- The route switch helper was corrected to resolve from the current route; English homepage and project/writing detail counterparts now map to their Arabic equivalents and vice versa.
- Arabic copy is implemented but **not linguistically accepted**; independent fluent Arabic editorial review remains outstanding.

### Theme control, motion and responsive refinements
- Replaced the old glyph with inline SVG sun/moon icons using `currentColor`.
- Action label, title and `aria-pressed` reflect the current theme; `portfolio-theme` persists the selection.
- Added circular View Transitions reveal from the theme control, immediate fallback when unsupported, and reduced-motion bypass.
- Added RTL logical spacing and a narrow-screen wrapping correction for long Latin technical identifiers in Arabic editorial headings/content.
- Added automated keyboard operation and visible-focus checks for the language and theme controls.

### Metadata
- Shared layout now emits route-specific title/description, localized Open Graph title/description/type/site/locale, and Twitter card/title/description metadata.
- Canonical URL, absolute Open Graph URL/image, and reciprocal `hreflang` remain unresolved because the canonical public portfolio domain and approved social image have not been established. Preview URLs are not used as canonical production URLs.

### Regression coverage
- Existing archive-count assertions remain: 13 projects and 17 writing entries; the homepage still features exactly two case studies.
- `astro/tests/exhaustive-locale-routes.spec.ts` enumerates all 13 English/Arabic project details and all 17 English/Arabic writing details, plus static editorial routes. It checks route status through navigation, `lang`/`dir`, non-empty page identity/content, route-switch targets, internal route allowlist, metadata and horizontal overflow at desktop/mobile projects.
- `astro/tests/locale-theme.spec.ts` covers locale semantics, theme state/persistence, unsupported View Transitions, reduced motion, image loading, mobile overflow and keyboard operation.
- `astro/tests/deployed-preview.spec.ts` verifies exact preview build marker, bilingual desktop/mobile navigation, and captures the requested locale/page visual matrix. It now includes an axe-core WCAG 2.1 A/AA smoke scan on representative English/Arabic routes; this scan has not yet completed successfully in CI.

## CI and evidence

### Historical baseline — passed, pre-Arabic
- Run [43492092393](https://github.com/osama865/portfolio-react/actions/runs/43492092393), exact SHA `9413757fcde394ad3c1db99b7ff019733aa9f85a`: **105 passed, 0 failed, 7 skipped (112 total)**.
- Artifact [14070196272](https://github.com/osama865/portfolio-react/actions/runs/43492092393/artifacts/14070196272).
- This run predates Arabic/theme implementation and is not evidence for the current implementation.

### Arabic/theme implementation attempts
- Run [43494823880](https://github.com/osama865/portfolio-react/actions/runs/43494823880), exact SHA `d38845b2e94add2fc9b64ac7d0f35dff36630163`: **110 passed, 13 failed, 7 skipped (130 total)**. Clean install, audit, diagnostics and production build passed; browser tests exposed stale theme selectors, language-switch issues and a lazy-image assertion. Artifact [14071462406](https://github.com/osama865/portfolio-react/actions/runs/43494823880/artifacts/14071462406).
- Run [43495874766](https://github.com/osama865/portfolio-react/actions/runs/43495874766), exact SHA `effa9ad4d8f5c96ae836b21e5660718d48dfa31b`: **116 passed, 9 failed, 7 skipped (132 total)**. Clean install, audit, diagnostics and production build passed. Artifact [14072175689](https://github.com/osama865/portfolio-react/actions/runs/43495874766/artifacts/14072175689) was downloaded and inspected; it contains the HTML report, screenshots, traces, test results, audit JSON and lockfile. The Arabic writing-detail screenshot exposed mobile overflow on `/ar/writing/document-designmode/`; this was corrected with RTL wrapping CSS. Other failures were test assumptions (localStorage before origin, an H1 identity assertion, and stale theme selectors) and have been corrected in later commits.
- Run [43496996017](https://github.com/osama865/portfolio-react/actions/runs/43496996017) targets the then-current source candidate `2bcd69830083a844c22f5aa5660f2b89e2bbc8db`. It was still pending when this report refresh began; no test totals or passing status are claimed for it. Earlier cancelled/superseded attempts are not counted as successful verification.

### Preview identity
- The isolated Astro Cloudflare Pages project is `osama-portfolio-preview`; do not use the legacy `o-portfolio` project as Astro evidence.
- The last confirmed isolated deployment was for commit `20b0283`, preview URL `https://f703fcbd.osama-portfolio-preview.pages.dev`, with branch alias `https://phase-2-evidence-backed-case.osama-portfolio-preview.pages.dev`.
- The current source candidate `2bcd698` had a Cloudflare build notification in progress. It is not accepted as a deployed preview until the deployed HTML build marker equals the exact reviewed SHA and browser visual evidence passes.
- The workflow was changed to wait for the Phase 2 branch alias and run deployed preview checks on Phase 2 pushes. Those checks are pending for the current source candidate.

## Quality checks and current disposition

| Area | Evidence/status |
|---|---|
| Clean install, dependency audit, Astro diagnostics, production build | Passed on the earlier candidate runs; current exact-head result pending |
| Exhaustive project/writing routes in both locales | Added; previous run passed desktop route sweep but exposed one mobile overflow; fix committed, rerun pending |
| Archive counts / featured ranking | 13 projects, 17 writing entries, two featured case studies; third slot remains empty |
| Theme persistence / reduced motion / unsupported API | Tests added; earlier runs passed relevant reduced-motion/fallback cases; final rerun pending |
| Keyboard / visible focus | Automated keyboard test added; result pending |
| axe accessibility | Added to deployed-preview suite; result pending. This is not WCAG certification |
| Performance / Lighthouse | Not run; remains outstanding |
| Internal routes/assets | Route allowlist and image checks added; full final run pending |
| External destinations | Not exhaustively probed; historical external URLs must be treated as references, not assumed-live deployments |
| Titles/descriptions/Open Graph/Twitter | Implemented and asserted across generated routes; final rerun pending |
| Canonical / hreflang / social image | Not complete; requires approved canonical public domain and social-image asset |
| Arabic editorial review | Not complete; requires independent fluent Arabic review |
| Visual inspection | Earlier artifacts inspected; latest bilingual preview matrix and screenshots not yet captured/inspected |

## Preserved boundaries
- Exactly two featured case studies remain: INJAZ and Life-Advise. Third slot intentionally empty.
- All 13 project records remain. Food Recipes remains reserve.
- No fabricated application screenshots; diagrams are labelled explanatory.
- No unsupported credentials, metrics, testimonials or authorship claims.
- INJAZ remains in development; no overall V1 acceptance claim. Life-Advise remains historical/recovery work; no current offline/runtime readiness claim.
- No merge of PR #2 or PR #1, no `master` change, no production deployment or production Cloudflare setting change.

## Disposition

**Phase 2 remains Draft and not accepted.** The latest browser attempts have exposed real responsive and test issues, several of which are now corrected. Acceptance requires a successful exact-head CI run, inspected artifact, exact-SHA isolated preview and inspected bilingual visual matrix, axe/manual keyboard review, performance disposition, complete link/SEO disposition, and independent Arabic editorial review. The report-only commit that follows this source candidate also requires its own exact-head CI evidence.
