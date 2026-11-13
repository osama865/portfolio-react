# Project attribution matrix

**Purpose:** distinguish project facts from personal contribution claims.  
**Status:** provisional; unresolved attribution is deliberately not converted into public authorship claims.

## INJAZ

| Contribution area | Evidence-supported project fact | Personal attribution status |
|---|---|---|
| Product direction & ownership | Product scope, workstreams, release boundary and acceptance decisions are documented through approved specs and review decisions | Product Owner role established; exact wording to confirm |
| Requirements/specification | Approved specifications and stable scenario catalog exist; identity spec v1.1 names Osama Ibrahim as author and records Product Owner approval | Authorship/approval supported by document metadata; confirm extent of drafting vs review |
| Architecture & technical decisions | Architecture uses browser application, Supabase Auth, PostgreSQL, RLS, migrations, RPCs and Edge Functions | Which decisions were personally designed vs proposed by developer AI and accepted remains to confirm |
| Direct implementation | Code exists in private repository across application, migrations, functions and tests | Do not claim personal implementation of all code; module-level contribution unverified |
| Code review & QA | Independent evidence reviews, acceptance gates, issue tracking and focused acceptance decisions are recorded | Product Owner review/oversight supported; exact hands-on test authorship to confirm |
| Release management & engineering leadership | Workstream governance, prioritisation, no-merge/no-deploy controls and carry-forward of unresolved issues are documented | Leadership and governance role supported; confirm public phrasing |

## Life-Advise

| Generation / area | Evidence-supported fact | Attribution status |
|---|---|---|
| Original motivation | User describes the project as beginning in 2021 during a prolonged local internet outage | Historical timeline and approximate outage duration require confirmation |
| Meteor application | Repository includes Meteor/React source, Dexie helpers and service-worker implementation | Identify personally authored modules vs adapted/tutorial-derived code |
| IndexedDB / Dexie | Dexie dependencies and helper modules are present | Personal design/implementation contribution requires confirmation |
| React client | Separate React repository and routes exist; likely missing IndexedDB module import target | Identify personally authored vs adapted components |
| Express backend | Separate backend repository exists | Confirm which routes/services were personally written and current integration responsibility |
| Data collection/preservation | User reports manually collecting advice/quote records; two snapshots have measured counts | Confirm collection process and snapshot provenance before public first-person claim |
| Modernisation/recovery | Current source review identified module and runtime evidence gaps | Distinguish user's recovery work from reviewer analysis and future work |

## Product Owner confirmations required

1. INJAZ: Which specific application modules, migrations, Edge Functions or tests did you personally write or materially modify?
2. INJAZ: Which architecture decisions originated with you, which were proposed by a development AI, and which did you approve after review?
3. INJAZ: Which tests have you personally authored/executed versus independently reviewed?
4. Life-Advise: Confirm the 2021 timeline and approximate outage duration.
5. Life-Advise: Identify personal authorship vs adaptation for Meteor, React, Dexie, service worker, backend and API components.
6. Life-Advise: Confirm the origin/provenance of the recovered JSON snapshots and whether you personally curated the underlying records.

Until these are answered, public copy describes the user's evidenced Product Owner role for INJAZ and project history for Life-Advise, without claiming sole code authorship.
