# Osama Ibrahim — Portfolio

A bilingual personal portfolio presenting selected software projects, engineering work, writing, and the thinking behind them. The current portfolio is a static **Astro** experience, with English and Arabic routes and a responsive interface designed for both left-to-right and right-to-left reading.

The repository preserves the original Create React App implementation as historical material. The maintained portfolio site lives in **astro/**; its build is deliberately isolated from the legacy root application and its public assets.

## What the portfolio includes

- **Bilingual experience:** English and Arabic pages, locale-aware navigation, correct document language and direction, and translated portfolio-owned interface copy.
- **Project archive:** all 13 project records retained, with individual project pages and a browsable archive.
- **Featured case studies:** INJAZ and Life-Advise, selected for their depth and the evidence available to explain the work.
- **Writing archive:** 17 writing entries with individual detail pages. External articles remain linked in their original language rather than being represented as translated content.
- **Theme control:** light and dark themes, persisted preference, accessible control labels, and reduced-motion-aware transitions.
- **Responsive presentation:** layouts and navigation tested across desktop, tablet, and mobile viewports.
- **Evidence-led storytelling:** project status, contribution, historical links, and technical claims are deliberately qualified rather than overstated.

## Featured work

### INJAZ | إنجاز

An organizational management platform presented from the perspective of Product Ownership and engineering leadership. The case study describes product direction, requirements, prioritization, release governance, and evidence-based acceptance. Development agents contributed implementation; the portfolio does not claim sole authorship of every code, database, or infrastructure change.

**Status:** INJAZ remains in development. The portfolio documents selected completed work and does not imply that the full product or its V1 release is complete.

### Life-Advise

A long-running advice and quotations project, presented as a historical engineering journey and recovery effort. The case study distinguishes the original project, recovered material, and current recovery work. It does not claim that every historical feature is currently operational.

**Status:** historical project / recovery work.

The remaining project archive includes Food Recipes PWA, Galarey, Amazon, Chat Room, and other work. Food Recipes remains in the archive as a reserve project rather than a featured case study.

## Technology

- [Astro](https://astro.build/) for static site generation
- TypeScript
- HTML and CSS, with component-based Astro pages
- [Playwright](https://playwright.dev/) for browser and route testing
- axe-core accessibility scans within the deployed-preview test suite
- GitHub Actions for reproducible checks and evidence artifacts

Astro dependencies are pinned in astro/package.json and astro/package-lock.json.

## Run locally

Requirements: Node.js compatible with the repository's CI environment (Node 22) and npm.

~~~bash
cd astro
npm ci
npm run dev
~~~

The local development server prints its address (normally http://localhost:4321).

## Quality checks

Run from the astro/ directory:

~~~bash
npm run check        # Astro and TypeScript diagnostics
npm run build        # static production build
npm run test:e2e     # local Playwright suite
npm run test:preview # deployed-preview checks; requires the configured preview
~~~

The accepted automated evidence baseline is recorded in:

- [Phase 2 closeout](astro/docs/PHASE-2-CLOSEOUT.md)
- [Phase 3 quality-gate report](astro/docs/PHASE-3-QUALITY-GATE-REPORT.md)
- [Phase 3 route and content inventory](astro/docs/PHASE-3-ROUTE-CONTENT-INVENTORY.md)
- [Project attribution matrix](astro/docs/PROJECT-ATTRIBUTION-MATRIX.md)
- [Content evidence audit](astro/docs/CONTENT-EVIDENCE-AUDIT.md)
- [Dependency security audit](astro/docs/DEPENDENCY-SECURITY-AUDIT.md)

The recorded exact-baseline automated results include a successful clean install, zero reported dependency vulnerabilities, passing diagnostics and production build, 129 local Playwright passes with 19 recorded skips, 13 deployed-preview passes with 5 recorded skips, and 48 axe smoke scans with zero violations. Lighthouse results and the limitations of automated accessibility checks are documented in the quality report.

These are historical, commit-specific results—not a guarantee that every external destination remains available, a WCAG certification, or evidence of a production deployment. Human Arabic editorial and assistive-technology reviews, domain configuration, and production release activities were outside the portfolio development closeout.

## Repository layout

~~~text
.
├── astro/
│   ├── public/          # Astro-owned static assets
│   ├── src/
│   │   ├── components/  # Shared page and case-study components
│   │   ├── data/        # Project and writing records
│   │   ├── i18n/        # Locale messages and routing support
│   │   ├── layouts/     # Shared site layout
│   │   ├── pages/       # English and Arabic routes
│   │   └── styles/      # Global styling
│   ├── tests/           # Playwright and preview checks
│   └── docs/            # Evidence, attribution, and closeout records
├── public/              # Preserved legacy Create React App assets
└── src/                 # Preserved legacy Create React App source
~~~

The Astro build uses astro/public/ as its public directory. The root-level Create React App files and assets are preserved and are not copied over or used as Astro build inputs.

## Project status

**Portfolio development: complete.** The scope is closed; no further feature-development phase is planned. The repository retains the implementation, automated evidence, attribution notes, and closeout records as the project archive.

Deployment, domain setup, indexing, and other post-development release operations are separate from this completion decision.

## Content and attribution

The portfolio is intentionally evidence-led. Historical project links are references, not proof of current service availability. Product status is stated explicitly. Personal contributions are described only where the project record supports them; collaborative implementation is not presented as sole authorship.

---

Built and maintained by **Osama Ibrahim**.
