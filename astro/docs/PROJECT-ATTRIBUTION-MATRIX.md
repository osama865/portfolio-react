# Project attribution matrix

**Purpose:** distinguish project facts from personal contribution claims.  
**Status:** provisional; unresolved attribution is deliberately not converted into public authorship claims.

## INJAZ

| Contribution area | Evidence-supported project fact | Personal attribution status |
|---|---|---|
| Product direction & ownership | Product scope, V1 boundary, workstreams, release gates and acceptance decisions are documented in approved specifications and review records | Supported: Product Owner; defines direction, scope and priorities and owns acceptance decisions |
| Requirements/specification | Approved specifications and stable scenario catalog exist; identity spec v1.1 names Osama Ibrahim as author and records Product Owner approval | Supported: named author and Product Owner approval for the identity/lifecycle specification |
| Architecture & technical decisions | Architecture uses browser application, Supabase Auth, PostgreSQL, RLS, migrations, RPCs and Edge Functions | Not attributed: proposals may originate with development agents; personal design authorship remains unverified |
| Direct implementation | Code exists in private repository across application, migrations, functions and tests; development agents implemented portions | Not attributed at module level; do not claim personal authorship of all code |
| Code review & QA | Independent evidence reviews, acceptance gates, issue tracking and focused acceptance decisions are recorded | Supported: Product Owner evidence review and acceptance oversight; hands-on test authorship is not claimed |
| Release management & engineering leadership | Workstream governance, prioritisation, release gates, no-merge/no-deploy controls and carry-forward of unresolved issues are documented | Supported: prioritisation and release governance as Product Owner |

## Life-Advise

| Generation / area | Evidence-supported fact | Attribution status |
|---|---|---|
| Original motivation | User confirms the project began in 2021 during a month-long internet outage | Supported: project initiation and motivation are personally confirmed |
| Meteor application | Repository includes Meteor/React source, Dexie helpers and service-worker implementation | Identify personally authored modules vs adapted/tutorial-derived code |
| IndexedDB / Dexie | Dexie dependencies and helper modules are present | Personal design/implementation contribution requires confirmation |
| React client | Separate React repository and routes exist; likely missing IndexedDB module import target | Identify personally authored vs adapted components |
| Express backend | Separate backend repository exists | Confirm which routes/services were personally written and current integration responsibility |
| Data collection/preservation | User confirms manually gathering and curating advice/quote records; two recovered snapshots have measured counts | Supported: manual collection/curation; exact historic total and recovered snapshot provenance remain unverified |
| Modernisation/recovery | Current source review identified module and runtime evidence gaps | Distinguish user's recovery work from reviewer analysis and future work |

## Product Owner confirmations required

1. INJAZ: Which specific application modules, migrations, Edge Functions or tests did you personally write or materially modify?
2. INJAZ: Which architecture decisions originated with you, which were proposed by a development AI, and which did you approve after review?
3. INJAZ: Which tests have you personally authored/executed versus independently reviewed?
4. Life-Advise: Identify personal authorship versus adaptation for Meteor, React, Dexie, service worker, backend and API components.
5. Life-Advise: Confirm the origin and provenance of the recovered JSON snapshots before publishing their counts.

Until these are answered, public copy describes the user's evidenced Product Owner role for INJAZ and project history for Life-Advise, without claiming sole code authorship.
