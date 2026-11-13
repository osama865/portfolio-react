# Phase 1.5 visual evidence

The `portfolio-review-evidence` GitHub Actions artifact is the review bundle. It contains local production-preview screenshots, deployed Cloudflare-preview screenshots, the Playwright HTML report, deployed-interaction traces and failure screenshots when present, the npm audit JSON, and this evidence index.

## Screenshot naming

| File stem | Source | Viewport | Theme | Content |
|---|---|---|---|---|
| `local-desktop-home-light` | Local Astro production preview | Desktop Chromium | Light | Homepage |
| `local-desktop-home-dark` | Local Astro production preview | Desktop Chromium | Dark | Homepage |
| `local-mobile-home-light` | Local Astro production preview | Pixel 7 emulation | Light | Homepage |
| `local-mobile-home-dark` | Local Astro production preview | Pixel 7 emulation | Dark | Homepage |
| `*-work-archive` | Local / deployed | Desktop and Pixel 7 | Dark | Work archive and filters |
| `*-writing-archive` | Local / deployed | Desktop and Pixel 7 | Dark | Writing archive |
| `*-writing-entry` | Local / deployed | Desktop and Pixel 7 | Dark | Individual article |
| `*-about` | Local / deployed | Desktop and Pixel 7 | Dark | About page |
| `*-engineering-approach` | Local / deployed | Desktop and Pixel 7 | Dark | Engineering Approach |
| `*-project-case-study` | Local / deployed | Desktop and Pixel 7 | Dark | INJAZ case study |
| `*-mobile-navigation-open` | Local / deployed | Pixel 7 emulation | Dark | Expanded responsive navigation |

The `local-*` files come from Playwright's local Astro production preview; the `deployed-*` files come from Chromium against the isolated Cloudflare Pages preview. Each file name includes its source, viewport and page/theme state. Destination captures are dark because the visual suite selects dark mode after capturing the homepage light state. All captures use reduced motion so content is fully revealed and stable.

## Interactive evidence

The Playwright HTML report records the desktop/mobile suite and deployed-preview interaction tests. The deployed suite checks the served build SHA, theme neutrality for ordinary clicks, navigation, project filtering and cards, Writing navigation, exactly-one theme mutation, aria state, and localStorage persistence. Deployed interaction tests retain traces even when passing; failures also retain screenshots and traces.

## Commit identity and preview readiness

The generated HTML exposes the build's commit SHA in `meta[name="portfolio-build-commit"]` and `html[data-build-commit]`. CI polls the isolated preview until it serves the exact expected PR head SHA before starting deployed browser checks. A successful HTTP response alone is not considered deployment readiness.
