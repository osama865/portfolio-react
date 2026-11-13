# INJAZ case-study evidence

**Assessment:** 2026-11-13  
**Source:** private repository `osama865/IAH`; live branch evidence, not the 2026-11-04 ZIP baseline.  
**Public claim boundary:** Product in development; no public demo or overall V1 acceptance claim.

## Current evidence reviewed

- **WS-03 acceptance record:** `docs/release/WS-03-ACCEPTANCE-RECORD.md`, dated 2026-11-10. WS-03 is explicitly accepted for its database, authorisation and security scope on reviewed code head `4d7695cf8725f6a578543e252a088388852968cc`. The record cites four successful CI workflows, authorised staging migration history, authenticated Admin invitation/pending-list/cancellation evidence, audit actor attribution and cleanup. Actual SMTP email delivery remained unverified due to provider rate limiting. The record explicitly excludes WS-04 and overall V1 acceptance.
- **WS-03.5 Stage B:** PR #20 merged 2026-11-13. Candidate `ba49d92008d58c2d84f23179b60add8bb3703bb9`. PR description records three successful exact-head workflows: authenticated Admin/Employee visual acceptance, public responsive preview, and synthetic print/PDF regression. The authenticated audit covered eight role/viewport/theme landing combinations and 40 dark-theme navigation views with zero contrast findings. These are focused visual/preservation checks, not universal accessibility certification or full regression.
- **WS-04 current branch:** `ws04/identity-lifecycle-gate1`, head `3632e9f36ece522ef5e7a1570222c7cb1ca0272e`; PR #21 is Draft and unmerged. Its description reports focused changes for required active departments, server-side department validation, trusted profile assignment, invitation-fragment retry, atomic resend cooldown and offboarding guard coverage. It adds pgTAP, disposable integration checks and focused Playwright invitation/setup tests.
- **WS-04 limitations from PR #21:** approved seven-day invite expiry versus provider recommendation remains a Product Owner decision; broader Admin invite delivery/resend, pending-invite cancellation, offboarding, optional mission/claim cleanup and reactivation E2E remain incomplete; mission cancellation status/reason reconciliation remains unresolved. PR #21 does not accept WS-04.
- **WS-05 boundary:** PR #22 is Draft, unmerged and based on the WS-04 branch. It addresses a mission-bundle cancellation defect and is a separate workstream, not WS-04 acceptance.
- **Requirements matrix:** `docs/release/V1-REQUIREMENTS-MATRIX.md` on the current WS-04 branch. It records WS-03 accepted, WS-04 Gate 1 not passed, and outstanding P1 work in CSV parsing/preview (WS-06), exports (WS-07), and DB+Storage backup/recovery (WS-09). Overall V1 readiness is not accepted.
- **Issue register:** `docs/release/V1-ISSUE-REGISTER.md` on the current WS-04 branch. It retains cross-workstream and release blockers; unresolved issues must not be represented as completed.

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
| WS-04 | PR #21 Draft/unmerged; Gate 1 not accepted | Identity/lifecycle remediation in progress |
| WS-05 | PR #22 Draft/unmerged | Mission workflow correction under review |
| WS-06 | CSV parser/preview issues remain in matrix | Not accepted |
| WS-07 | Required exports absent in inspected matrix | Not accepted |
| WS-08 | PWA levels and installability qualification remain | Not fully accepted |
| WS-09 | DB+Storage restore drill and storage backup evidence remain | Not accepted |
| WS-10 | Release-wide QA evidence and PO acceptance incomplete | Not accepted |

## Visual evidence

No approved public application screenshot was available in the portfolio evidence set. The public case study therefore uses a labelled architecture diagram and workflow diagram, not fabricated application UI. Existing internal CI screenshots contain synthetic or authenticated views and require redaction/publication approval before use.

## Missing evidence / publication limits

- No public demo approved for release.
- No overall V1 acceptance record.
- No current WS-04 acceptance record or merged accepted head.
- SMTP delivery remains unverified in WS-03 acceptance record.
- No complete commercial-readiness run or DB+Storage recovery drill evidence.
- Personal authorship of individual modules and exact architecture authorship remain unconfirmed.
- Private identifiers, employee records, internal project references, credentials and security-sensitive predicates are excluded from public copy.

## Source links

- [Private INJAZ repository](https://github.com/osama865/IAH)
- [WS-03 acceptance record](https://github.com/osama865/IAH/blob/main/docs/release/WS-03-ACCEPTANCE-RECORD.md)
- [WS-04 Gate 1 PR #21](https://github.com/osama865/IAH/pull/21)
- [WS-03.5 Stage B PR #20](https://github.com/osama865/IAH/pull/20)
- [WS-05 correction PR #22](https://github.com/osama865/IAH/pull/22)

This document is a publication evidence ledger, not a product acceptance record.
