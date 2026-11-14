# INJAZ case-study evidence

**Assessment:** 2026-11-14  
**Source:** private repository `osama865/IAH`; live branch evidence, not the 2026-11-04 ZIP baseline.  
**Public claim boundary:** Product in development; no public demo or overall V1 acceptance claim.

## Current evidence reviewed

- **WS-03 acceptance record:** `docs/release/WS-03-ACCEPTANCE-RECORD.md`, dated 2026-11-10. WS-03 is explicitly accepted for its database, authorisation and security scope on reviewed code head `4d7695cf8725f6a578543e252a088388852968cc`. The record cites four successful CI workflows, authorised staging migration history, authenticated Admin invitation/pending-list/cancellation evidence, audit actor attribution and cleanup. Actual SMTP email delivery remained unverified due to provider rate limiting. The record explicitly excludes WS-04 and overall V1 acceptance.
- **WS-03.5 Stage B:** PR #20 merged 2026-11-13. Candidate `ba49d92008d58c2d84f23179b60add8bb3703bb9`. PR description records three successful exact-head workflows: authenticated Admin/Employee visual acceptance, public responsive preview, and synthetic print/PDF regression. The authenticated audit covered eight role/viewport/theme landing combinations and 40 dark-theme navigation views with zero contrast findings. These are focused visual/preservation checks, not universal accessibility certification or full regression.
- **WS-04 Gate 1:** PR #21 merged on 2026-11-14 at merge commit `a7f974c1e0394498b120ac47f246a3ae1b962974`. Its exact candidate `593629f2952853b79916b181159a85c3dfc21671` passed the focused Gate 1 checks: 189 pgTAP tests, Storage/concurrent-invitation API tests (2/2), invitation setup browser acceptance (4/4), Admin pending-bundle cancellation (1/1), and HoD delegated-bundle cancellation (1/1). PR #24's full regression run also passed those WS-04 regression checks. This supports the merged Gate 1 implementation and its tested paths; it does not prove every WS-04 catalog scenario or full V1 lifecycle acceptance.
- **WS-04 remaining boundary:** the PR description explicitly keeps broader lifecycle E2E, invite delivery/provider verification, offboarding/reactivation breadth and other full-release scenarios distinct. The approved seven-day invitation expiry was resolved as a Product Owner decision; the shared remote provider setting remains unverified and was not changed.
- **WS-05 current status:** active and incomplete. PR #25 merged a focused System Assistant stale-pending mission deep-link correction with dedicated browser/database regression evidence. PR #22 remains Draft for mission-bundle cancellation. PR #27 remains open for quarterly-report submission guardrails, and PR #26 remains Draft for quarterly deadlines/RLS. Do not describe WS-05 as passed or accepted while these changes remain under review.
- **WS-06 CSV import:** PR #24 merged on 2026-11-14 at exact head `5b8bd6ee581390557ca66d43bac87092721e6025`. Its acceptance run `43634100813` passed 9/9 unit tests, Edge Function type-check and 1/1 real browser import/re-import journey. The separate WS-04 regression, WS-02 authenticated smoke, source checks and secret scan also passed. This is focused WS-06 acceptance, not overall V1 acceptance.
- **Requirements matrix and issue register:** the baseline documents in `docs/release/` retain earlier snapshot statuses and must not be treated as a live status feed. The PRs and exact-head evidence linked above are the current status sources for WS-04, WS-05 and WS-06 as of 2026-11-14. WS-07 exports, WS-09 DB+Storage recovery and WS-10 release-wide QA remain separate open V1 gates.

## Product context supported by approved specifications

The approved identity/lifecycle specification `docs/specs/01-identity-and-lifecycle.md` v1.1 defines Admin-only account administration, pending/active/deleted employee states, invitation and first-login activation, department/role changes, offboarding with history preservation, and reactivation. It distinguishes HoD as an organisational function, not an administrative privilege. The broader V1 specification inventory includes daily reports, claims, missions, quarterly reports, announcements, system assistant, system configuration, provisioning, data portability and launch requirements.

## Architecture evidence

Source and release records support a browser application using Supabase Auth, PostgreSQL, migrations, RLS, trusted RPCs and Edge Functions. Privileged lifecycle transitions are intentionally mediated through trusted server-side operations; direct client writes to protected lifecycle fields are constrained. The diagram on the public case study is an explanatory boundary map, not a complete deployment topology or claim that every module is accepted.

## Workstream disposition

| Area | Evidence state | Public wording |
|---|---|---|
| WS-01 | Baseline and specifications established | Requirements and baseline documented |
| WS-02 | Preview/deployment foundation has staged evidence; production target/URL remains unverified in current matrix | Deployment foundation; production status not claimed |
| WS-03 | Accepted 2026-11-10 for defined security scope | Security workstream accepted |
| WS-03.5 Stage A/B | Stage A and Stage B merged; focused visual evidence recorded | Provisional product identity applied; focused checks passed |
| WS-04 | PR #21 merged 2026-11-14; focused Gate 1 evidence passed: 189 pgTAP, Storage/concurrent-invitation API 2/2, invitation setup 4/4, Admin cancellation 1/1, HoD delegated-bundle cancellation 1/1 | Gate 1 implementation merged; do not infer acceptance of every lifecycle scenario or the entire workstream |
| WS-05 | PR #25 merged with stale-pending browser/database regression; PR #27 open for quarterly-report guardrails; PR #26 Draft for quarterly deadlines/RLS; PR #22 Draft for mission-bundle cancellation | Active workstream; selected fixes merged, remaining changes under review |
| WS-06 | PR #24 merged 2026-11-14; exact-head acceptance 9/9 unit tests, Edge Function type-check and browser import/re-import 1/1 | Focused CSV import gate passed; not overall V1 acceptance |
| WS-07 | Required exports absent in inspected matrix | Not accepted |
| WS-08 | PWA levels and installability qualification remain | Not fully accepted |
| WS-09 | DB+Storage restore drill and storage backup evidence remain | Not accepted |
| WS-10 | Release-wide QA evidence and PO acceptance incomplete | Not accepted |

## Status source references (14 November 2026)\n\n- [WS-04 Gate 1 PR #21](https://github.com/osama865/IAH/pull/21) — merged; exact-head checks recorded in its PR description.\n- [WS-06 CSV import PR #24](https://github.com/osama865/IAH/pull/24) — merged; exact-head browser acceptance 1/1 and unit tests 9/9.\n- [WS-05 core workflow PR #25](https://github.com/osama865/IAH/pull/25) — merged focused stale-pending correction.\n- [WS-05 mission-bundle cancellation PR #22](https://github.com/osama865/IAH/pull/22), [quarterly-report guardrails PR #27](https://github.com/osama865/IAH/pull/27), and [quarterly deadline/RLS PR #26](https://github.com/osama865/IAH/pull/26) — remain open; do not describe WS-05 as complete.\n\n## Visual evidence

No approved public application screenshot was available in the portfolio evidence set. The public case study therefore uses a labelled architecture diagram and workflow diagram, not fabricated application UI. Existing internal CI screenshots contain synthetic or authenticated views and require redaction/publication approval before use.

## Missing evidence / publication limits

- No public demo approved for release.
- No overall V1 acceptance record.
- No current WS-04 acceptance record or merged accepted head.
- SMTP delivery remains unverified in WS-03 acceptance record.
- No complete commercial-readiness run or DB+Storage recovery drill evidence.
- The Product Owner's role in product direction, requirements, prioritisation, evidence review and release governance is supported. Personal authorship of individual application modules and exact architecture decisions remains unconfirmed.
- Private identifiers, employee records, internal project references, credentials and security-sensitive predicates are excluded from public copy.

## Source links

- [Private INJAZ repository](https://github.com/osama865/IAH)
- [WS-03 acceptance record](https://github.com/osama865/IAH/blob/main/docs/release/WS-03-ACCEPTANCE-RECORD.md)
- [WS-04 Gate 1 PR #21](https://github.com/osama865/IAH/pull/21)
- [WS-03.5 Stage B PR #20](https://github.com/osama865/IAH/pull/20)
- [WS-05 correction PR #22](https://github.com/osama865/IAH/pull/22)

This document is a publication evidence ledger, not a product acceptance record.
