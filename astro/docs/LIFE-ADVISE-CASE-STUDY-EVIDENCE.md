# Life-Advise case-study evidence

**Assessment:** 2026-11-13  
**Presentation:** historical engineering journey and recovery in progress.  
**Canonical repository scope:** original Meteor, later React client, Express backend reference only.

## Repository snapshots reviewed

| Generation | Repository | Inspected commit | Role |
|---|---|---|---|
| Original Meteor | [Life-Advise](https://github.com/osama865/Life-Advise) | `83c351d7d5626ab34d1aaad218022d58d8d86d55` | Historical reference |
| React client | [life-advice-client](https://github.com/osama865/life-advice-client) | `e0f5e38c7cb2f49f76ccf7f858d9b88cf07747ce` | Modernisation starting point |
| Express backend | [life-advise-server](https://github.com/osama865/life-advise-server) | `ed3620126b655ce92c3267f935fe749aa5c71c88` | Backend reference |

The separate `Life-Advise-API` and `Life-Advice-hackathon` repositories are excluded from the canonical public narrative.

## Original generation

The Meteor repository manifest includes Meteor, React 17, Dexie, `react-indexed-db` and `web-push`. Source review identified:

- `database/client/indexDB.js`: Dexie database definition and insert/find/findOne/update/remove helpers.
- `database/client/dexie.js`: a separate Dexie experiment.
- `imports/startup/client/serviceWorker.js`: service-worker registration and push subscription setup.
- `public/sw.js`: install/activate/fetch caching, fallback handling and push/notification handlers.

These source files establish offline-oriented design and browser-storage experimentation. They do not prove complete offline operation, durable synchronisation, successful push delivery or production readiness. The registration code contains a historical localhost subscription endpoint and requires modernization review. A Meteor client guard also appears to use `Meteor.isClient` as a callable; runtime compatibility has not been established.

## React generation

The inspected React snapshot uses React 17, React Router 6, Dexie and dexie-react-hooks. Routes include saved, random, home, notification, all-advice and proof surfaces. The random-advice component fetches online content and displays an offline state.

A likely clean-build blocker exists: `src/DB/index.js` re-exports `UseIndexedDB` from `./indexedDB`, and the saved-advice component imports that export, but the inspected repository tree did not contain the target module. This is a static source finding; a clean build was not run, so it remains a likely blocker rather than a reproduced build failure.

## Data preservation

Two recovered snapshots were inspected in the earlier recovery evidence set:

- `all.json`: 6,254 records.
- `test3.json`: 6,255 records.
- Both snapshots contain 5,538 unique text/author/language tuples.

These counts describe those exact files only. They are not a verified total of the historic collection. The public case study intentionally omits the unverified 20,000–50,000 historical estimate. Before publishing snapshot counts, retain the snapshot date, file provenance and integrity notes with the evidence.

## Runtime observations and limitations

- The previously listed deployment `https://life-advise.pages.dev` returned HTTP 522 during the 2026-11-13 assessment.
- No current clean build, browser E2E, cold-start offline, saved-record persistence, reconnect reconciliation or push-notification acceptance was performed.
- The original service worker caches application shell resources and includes notification handlers; this is not proof that the complete advice dataset or saved collection is available offline.
- The Express backend repository is a source reference; current client/server integration and operational service status are not verified.

## Recovery direction

1. Reconcile module boundaries and make the React client reproducibly build.
2. Establish canonical data snapshots and provenance.
3. Verify online API contracts and remove obsolete endpoint assumptions.
4. Test IndexedDB saved records, cold-start offline use, service-worker fallback and reconnect behaviour independently.
5. Test notifications only after provider and browser permission configuration are understood.
6. Keep historic Meteor source preserved as a separate generation; do not silently rewrite history as one continuous production app.

## Visual evidence

No provenance-safe application screenshots were found in the evidence set. The public case study uses an explicitly explanatory architecture/evolution diagram and a timeline. Neither is presented as a product screenshot.

## Attribution limits

Repository ownership and source history support that this is the user's project history, but they do not prove sole authorship of every component. Exact personal contributions to Meteor, React, Dexie, service-worker, Express backend and API integration require Product Owner confirmation. See `PROJECT-ATTRIBUTION-MATRIX.md`.

## Sources

- [Original Meteor repository](https://github.com/osama865/Life-Advise)
- [React client repository](https://github.com/osama865/life-advice-client)
- [Express backend reference](https://github.com/osama865/life-advise-server)
