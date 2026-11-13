# Phase 2 quality report

**Assessment date:** 2026-11-13  
**Branch:** `phase-2/evidence-backed-case-studies`  
**Reviewed implementation baseline:** `9413757fcde394ad3c1db99b7ff019733aa9f85a`  
**Verified baseline CI:** [43492092393](https://github.com/osama865/portfolio-react/actions/runs/43492092393)  
**Baseline evidence artifact:** [portfolio-review-evidence — 14070196272](https://github.com/osama865/portfolio-react/actions/runs/43492092393/artifacts/14070196272)

## Verified CI baseline — completed

Run **43492092393** checked out exact commit **`9413757fcde394ad3c1db99b7ff019733aa9f85a`**. The single `verify` job completed successfully.

| Step | Result |
|---|---|
| Reproducible clean install from committed lockfile | Passed |
| Dependency manifest immutability check | Passed |
| Dependency security audit | Passed |
| Astro and TypeScript diagnostics | Passed |
| Production build | Passed |
| Playwright Chromium installation | Passed |
| Browser tests and responsive screenshots | Passed |
| Seven-case deployed-preview event/branch regression matrix | Passed, 7/7 |
| Exact-commit deployed-preview readiness | Skipped by design for dependent PR #2 |
| Deployed-preview theme/visual tests | Skipped by design for dependent PR #2 |
| Final dependency manifest immutability check | Passed |
| Evidence index and artifact upload | Passed |

The Playwright job log reports **112 tests, 105 passed, 7 skipped, 0 failed** (42.4 seconds). Counts are taken from the run log, not inferred from job status.

Artifact **14070196272** (`portfolio-review-evidence`, 12,613,302 bytes) was attached to this run. It is the CI evidence artifact for the baseline above. This run did not include the Arabic implementation added later in this branch.

## Preview event/branch matrix

The regression check executed and passed all seven cases:

| Event | Ref / PR base | Preview eligible |
|---|---|---:|
| Phase 2 push | `phase-2/evidence-backed-case-studies` | No |
| PR #2 targeting Phase 1 branch | base `phase-1/astro-foundation` | No |
| Phase 1.5 push | `phase-1/astro-foundation` | Yes |
| Manual dispatch on Phase 1.5 | `phase-1/astro-foundation` | Yes |
| PR targeting `master` | base `master` | Yes |
| Phase 2 manual dispatch | Phase 2 branch | No |
| Push to `master` | `master` | No |

For eligible preview events, the exact-commit readiness step remains required: the preview's `portfolio-build-commit` marker must match the expected commit SHA. A different or missing marker cannot pass readiness. For this dependent PR, both deployed-preview steps were skipped and no deployed-preview acceptance is claimed.

The earlier trigger gap was corrected by widening local CI triggers to include the Phase 2 branch and dependent PR target. A separate broad preview condition was then replaced with the explicit predicates above. The successful matrix is the regression evidence for that correction.

## Artifact inspection at the baseline

Artifact 14070196272 contains the Playwright HTML report, screenshots, audit JSON, lockfile and evidence index. The baseline screenshots cover the English homepage, project archive, project case-study route, engineering-approach page and homepage theme states at selected desktop/mobile viewports.

The screenshots are useful visual samples, not proof of every individual route, destination, theme state or browser error. In particular, they do not establish the later Arabic experience. No fabricated product UI screenshots were introduced; diagrams in the case studies are labelled as explanatory.

## Arabic experience, language routing and theme upgrade — implementation in progress

Changes added after baseline commit 9413757:

- Typed locale message structure in `astro/src/i18n/messages.ts`.
- Shared navigation now detects locale, sets document `lang` and `dir`, and presents an in-context language switch.
- Arabic homepage and Arabic routes for archive, both featured case studies, About, Engineering Approach, Contact, Writing archive, all 13 project records and all 17 writing entries.
- Arabic summaries and display titles for the writing archive; external articles retain their original canonical URLs and are explicitly identified as original-language publications.
- Arabic case-study copy includes translated diagram labels, timelines, workflow labels and evidence boundaries. Product facts and the two-case-study editorial ranking are unchanged.
- Theme control replaced the half-circle glyph with inline SVG sun/moon icons using `currentColor`; accessible action label and `aria-pressed` follow the selected theme, and preference persists through `portfolio-theme`.
- Theme transition uses a circular View Transitions API reveal from the button position when supported, with immediate fallback and reduced-motion bypass.
- RTL refinements use logical spacing for the case-study list/timeline and align cards, filters, footer and navigation.

Automated regression coverage has been added in `astro/tests/locale-theme.spec.ts` for locale semantics, route switching, case-study identity, archive count/filtering, theme state/persistence, reduced-motion preference, unsupported API fallback, image loading and mobile overflow. The existing theme test was updated for the accessible action label.

**Important:** These later changes have not yet been accepted by CI at the time this report was updated. No pass count, visual acceptance, Arabic fluency acceptance or theme acceptance is claimed for them until a CI run on the resulting head completes and its artifact is inspected. The Arabic copy still requires an independent fluent-language review.

## Outstanding quality checks

- **Accessibility:** no complete axe/WCAG automated audit, screen-reader review or manual keyboard/focus acceptance recorded.
- **Reduced motion:** an automated preference test is added; full motion review across reveal effects and all page components remains outstanding.
- **Performance:** no Lighthouse or equivalent performance assessment recorded.
- **Internal routes and external links:** no complete automated link audit recorded. Historical external destinations must be distinguished from broken internal routes.
- **Visual matrix:** the baseline artifact is English-only. The full English/Arabic × light/dark × desktop/mobile matrix, especially both Arabic case studies and archive, remains to be inspected.
- **Runtime errors:** the new suite includes browser error checks on key Arabic pages, but complete console/network inspection across all public routes remains outstanding.
- **SEO/social metadata:** per-route title, description, canonical URL, Open Graph and social metadata have not yet been audited. Arabic routes need explicit canonical/hreflang review.
- **Arabic editorial review:** Arabic copy is a first implementation, not yet independently reviewed for fluency, nuance and consistency with the English editorial intent.
- **Deployed preview:** no deployed-preview acceptance is claimed from run 43492092393. The dependent PR intentionally skips those steps; a preview serving the exact later commit must be separately verified before visual preview acceptance.

## Preserved decisions and evidence boundary

- Exactly two featured case studies remain: INJAZ and Life-Advise. The third featured slot remains intentionally empty.
- All 13 project records remain in the archive. Food Recipes remains a reserve; project ranking was not reopened.
- No new personal qualifications, employment history, testimonials, metrics or authorship claims were added.
- External writing remains linked to the original canonical article; Arabic summaries do not imply that the external article itself has been translated.
- INJAZ remains in development; no overall V1 acceptance claim.
- Life-Advise remains historical/recovery work; no current offline/runtime readiness claim.
- No production deployment, production Cloudflare settings, PR #1, or `master` branch changes were made.

## Disposition

**Phase 2 remains Draft and not accepted.** Run 43492092393 is a successful baseline for the pre-Arabic implementation at exact SHA 9413757, not verification of the subsequent locale/theme work. The new implementation must pass clean install, audit, diagnostics, production build and the expanded browser suite; its artifact must then be inspected. Accessibility, performance, full route/link, SEO/social and independent Arabic-language review remain acceptance gates.
