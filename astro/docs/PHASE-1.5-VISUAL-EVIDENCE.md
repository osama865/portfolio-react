# Phase 1.5 visual evidence

The `portfolio-review-evidence` GitHub Actions artifact is the review bundle. It contains local production-preview screenshots, deployed Cloudflare-preview screenshots, the Playwright HTML report, failure traces/screenshots when present, the npm audit JSON, and this evidence index.

## Screenshot naming

| Prefix / file stem | Source | Viewport | Content |
|---|---|---|---|
| `local-desktop-home-light` | Local Astro production preview | Desktop Chromium | Homepage, light theme |
| `local-desktop-home-dark` | Local Astro production preview | Desktop Chromium | Homepage, dark theme |
| `local-mobile-home-light` | Local Astro production preview | Pixel 7 emulation | Homepage, light theme |
| `local-mobile-home-dark` | Local Astro production preview | Pixel 7 emulation | Homepage, dark theme |
| `*-work-archive` | Local / deployed | Desktop and mobile | Work archive and filters |
| `*-writing-archive` | Local / deployed | Desktop and mobile | Writing archive |
| `*-writing-entry` | Local / deployed | Desktop and mobile | Individual article |
| `*-about` | Local / deployed | Desktop and mobile | About page |
| `*-engineering-approach` | Local / deployed | Desktop and mobile | Engineering Approach |
| `*-project-case-study` | Local / deployed | Desktop and mobile | INJAZ case study |
| `*-mobile-navigation-open` | Local / deployed | Pixel 7 emulation | Expanded responsive navigation |
| `deployed-*` | Isolated Cloudflare Pages preview | Desktop and mobile | Same page set captured from the deployed site |

All screenshots are taken from the built application with reduced motion enabled so the captures are stable and fully revealed. They are visual inspection evidence, not a substitute for interaction assertions.

## Interactive evidence

The Playwright HTML report records the desktop/mobile suite and deployed-preview interaction tests. The deployed suite checks the served build SHA, theme neutrality for ordinary clicks, navigation, project filtering and cards, Writing navigation, exactly-one theme mutation, aria state, and localStorage persistence. Traces and failure screenshots are retained on failures.

## Commit identity and preview readiness

The generated HTML exposes the build's commit SHA in `meta[name="portfolio-build-commit"]` and `html[data-build-commit]`. CI polls the isolated preview until it serves the exact expected PR head SHA before starting deployed browser checks. A successful HTTP response alone is not considered deployment readiness.
