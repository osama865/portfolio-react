# Phase 3 — deployment and rollback checklist

**Baseline:** `04a408b0c7b31356b21501ad31359048f6683514`  
**Status:** preparation only; production actions are not authorized.

## Before production approval

- [ ] Confirm ownership and DNS authority for `osamaibrahim.com`.
- [ ] Obtain explicit approval to merge PR #2 and release the reviewed commit.
- [ ] Independently review the final PR diff and exact head SHA.
- [ ] Confirm P1 issue register items are closed or explicitly accepted by the Product Owner.
- [ ] Confirm the production Cloudflare Pages project is separate from legacy `o-portfolio` and isolated preview `osama-portfolio-preview`.
- [ ] Confirm Pages root directory: `astro`.
- [ ] Confirm build command: `npm run build`.
- [ ] Confirm output directory: `dist`.
- [ ] Confirm Node.js runtime: 22.
- [ ] Confirm production deployment branch and access controls.
- [ ] Confirm a known-good prior deployment exists and can be selected for rollback.

## Environment configuration

Configure only in the production environment after approval:

| Variable | Production setting |
|---|---|
| `PUBLIC_SITE_URL` | `https://osamaibrahim.com` after domain ownership is confirmed |
| `PUBLIC_SITE_INDEXABLE` | `true` only after content and production release approval |

Preview environments must keep `PUBLIC_SITE_INDEXABLE` unset or `false`. Never use a Cloudflare preview URL as a canonical URL.

## Pre-release build verification

Run from `astro/` using Node 22:

```sh
npm ci
npm run check
npm run build
npm run preview -- --host 127.0.0.1
```

Record the exact commit SHA, workflow run, artifact, dependency audit and build result.

## Controlled deployment sequence

1. Obtain explicit approval to merge PR #2; do not infer approval from Phase 2 passing.
2. Merge only the reviewed PR and verify the resulting commit on the intended release branch.
3. Deploy that exact commit to the separate production Pages project.
4. Verify the deployed build marker or equivalent immutable commit identity before smoke testing.
5. Verify English and Arabic home, project archive, writing archive, INJAZ, Life-Advise, representative project/writing details, theme persistence, locale switching, mobile navigation and 404 behavior.
6. Verify canonical and reciprocal hreflang, `og:url`, sitemap, robots and response headers.
7. Confirm production is indexable only after all checks pass.
8. Record deployment ID, commit SHA, test evidence and release time.

## Rollback

- Identify the immediately preceding known-good production deployment before release.
- If a production smoke test fails, use Cloudflare Pages deployment history to roll back to that known-good deployment.
- Do not use DNS edits or overwrite the prior deployment as a rollback mechanism.
- After rollback, verify the prior site's HTTP response, key routes, locale switching, theme and indexing headers.
- Record the failed commit, deployment ID, observed fault, rollback deployment ID and verification results.
- Keep the failed release artifacts and logs for diagnosis; do not silently amend the release record.

## Release stop conditions

Stop and do not enable indexing if any of the following occurs:

- deployed SHA differs from the approved SHA;
- canonical or hreflang points to a preview or unintended host;
- robots or X-Robots-Tag unexpectedly blocks or enables indexing;
- any primary English or Arabic route fails;
- navigation, locale switching or theme persistence fails;
- P1 content, Arabic editorial or accessibility sign-off remains unresolved;
- rollback target cannot be identified.

**No production deployment, DNS change, merge or Cloudflare production setting change is performed by this checklist.**
