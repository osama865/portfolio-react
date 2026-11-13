# Portfolio project content and evidence audit

**Verification date:** 13 November 2026  
**Scope:** the 12 legacy records carried forward from the original React portfolio, plus the INJAZ case study.  
**Rule:** repository existence, an old URL, or a successful HTTP response is not proof that a project is currently production-ready. Links below are retained as historical references unless explicitly stated otherwise.

## Summary

- 12 legacy project records are retained; INJAZ is the thirteenth record.
- The original React portfolio remains the legacy production experience.
- The Cloudflare deployment bot reported a successful deployment under project `o-portfolio`, but both the production URL and branch-preview URL returned the same legacy React portfolio content when inspected. This does not demonstrate an Astro deployment.
- GitHub repository evidence was inspected where a source repository is linked. Where the original portfolio did not provide a source repository, technology claims remain attributed to the original record and are not treated as independently verified.
- The old hotel URL was removed from the project card because it currently serves a Beach Resort page, not the room-rental project.
- No project is labelled as a currently verified live demo in this portfolio.

## Project-by-project evidence

| Project | Source evidence | Previously listed destination | Current presentation decision |
|---|---|---|---|
| INJAZ | Current project implementation and product work; no public source repository is linked here | None | In development. TypeScript, Supabase and PostgreSQL are the recorded implementation stack. No public demo claim. |
| Life-Advise | `osama865/life-advice-client` exists. Its package manifest confirms React 17 and Dexie 3. | `life-advise.pages.dev` returned Cloudflare 522 on the verification date. | Historical / recovery in progress. The case study now records the unavailable former demo and the verified React/Dexie evidence. |
| Netflix interface | The original portfolio lists `o-netflix.pages.dev` as its “SourceLink”; this is a Pages URL, not a GitHub source repository. | `os-netflix.pages.dev` was also listed as the live URL. Both destinations could not be independently fetched by the current verifier. | Historical project. React/Firebase remain attributed to the original portfolio description, not independently source-verified. Both old URLs are presented as historical links, not a verified demo or source repository. |
| Restaurant website | `osama865/assemble-rest` exists. Its repository tree includes `index.html` and `php/form-process.php`. No root `package.json` was found. | `assemble-res.pages.dev` could not be independently fetched by the current verifier. | Historical website. Stack labels include HTML, CSS, JavaScript and PHP based on repository files. Deployment is unverified. |
| Amazon storefront concept | `osama865/Amazon` exists. Its package manifest confirms React 16, Firebase 8 and other legacy dependencies. | `o-amzn.pages.dev` returned HTTP 403 to the verifier. | Historical / incomplete concept, as described by the original portfolio. React/Firebase are supported by the manifest; no working demo claim. |
| Personal portfolio · legacy | `osama865/portfolio-react` is the preserved React repository. | `o-portfolio.pages.dev` currently serves the legacy React site. The branch preview URL under the same Pages project returned the same legacy content. | Explicitly labelled legacy. The current deployment is not the new Astro site. |
| Hotel room rental | `osama865/Hotel` exists. Its package manifest confirms React 16 and Contentful 7. | `os-hotel.pages.dev` currently presents a “Beach Resort” page, not the room-rental project. | Historical project. The mismatched public URL has been removed from the case study; the repository link remains. |
| Chat room | `osama865/Chat-Room-client` exists. Its package manifest confirms React 16. | `o-chatting.pages.dev` could not be independently fetched by the current verifier. | Historical client project. Node.js and Socket.io were mentioned in the original portfolio, but are not confirmed by the linked client repository and are not listed as verified stack items. |
| Galarey | `osama865/Galarey` exists. Its package manifest confirms React 16, Firebase 7 and Framer Motion 2. | `galarey.pages.dev` responds with a gallery-like page titled “Panda” and text “Your Pictures”. | Historical gallery project. The old URL is retained as a historical destination, not a verified maintained demo. |
| Weather PWA | `osama865/PWA_Weather` exists. Its package manifest confirms React and Axios; its repository contains `public/manifest.json`. | `o-weather.pages.dev` returned empty content to the verifier. | Historical PWA. React/Axios and the manifest are repository-backed; current deployment is unverified. |
| Food recipes PWA | `osama865/PWA_FOOD_APP` repository exists; its tree contains `index.html` and `manifest.json`. | `o-food.pages.dev` responds with a page titled “Food Ninja” and a food/recipe-oriented interface. | Historical PWA. The repository index confirms HTML, CSS, Materialize JavaScript, Firebase Firestore SDK and a web app manifest. The URL is a historical preview, not a claim of maintained production service. |
| Gym landing page | `osama865/GYM` exists and identifies itself as a gym site template with animation. | `o-gym.pages.dev` responds with a “MAX GYM” page. It includes obvious placeholder trainer names/content. | Historical template. The URL is retained as a historical preview; not represented as a finished client deployment. |
| AOS animation tests | The original portfolio has no source repository URL for this record. | `aos-testing.pages.dev` could not be independently fetched by the current verifier. | Historical experiment. AOS/JavaScript labels remain based on the original portfolio description; neither source nor current demo is verified. |

## Link interpretation

- “Source repository” is used only when a GitHub repository is actually linked and inspected.
- “Previously listed link” and “Previously listed URL” identify old destinations, not proof of current availability.
- A failed fetch is recorded as unverified/unavailable at check time; it is not treated as proof that the project or repository has been deleted.
- The Netflix “SourceLink” in the original data points to a Cloudflare Pages URL, not a GitHub repository. The new portfolio therefore does not label it as source code.
- The old hotel deployment is excluded because its current content does not match the room-rental project.

## Remaining verification

1. Inspect the full source implementation for each historical repository before making deeper architecture or feature claims.
2. Re-check all historical demo destinations from a normal browser and confirm their ownership/content before any is promoted as a live demo.
3. Obtain a correctly isolated Astro preview from a separate Cloudflare Pages project named `osama-portfolio-preview`, with root directory `astro`, build command `npm run build`, output directory `dist`, Node 22 and branch `phase-1/astro-foundation`.
4. Verify the existing `o-portfolio` Cloudflare production branch and deployment history in Cloudflare itself; GitHub branch state alone cannot prove the Pages project setting.


## Astro build isolation correction

The first CI browser run exposed that the Astro config pointed `publicDir` at the legacy React app's root `public/` directory. That directory contains the old Create React App `index.html`, which was copied into Astro's output and overwrote the generated Astro homepage. The Astro app now uses its own `astro/public/` directory, populated with copies of the 29 required legacy assets (28 files under `public/assets/` plus the favicon). The original root `public/` directory remains unchanged. A fresh production-preview browser run is required to confirm that the served homepage is now the Astro version.
