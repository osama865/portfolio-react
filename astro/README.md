# New Astro portfolio

This directory contains the new static Astro portfolio experience. The original Create React App application remains at the repository root as legacy material and is not modified by this site.

## Static assets

Astro uses **`astro/public/`** as its public asset directory (the `publicDir` configured by `astro/astro.config.mjs`). The required images and favicon have been copied into `astro/public/assets/` and `astro/public/favicon.ico` so Astro builds independently of the legacy application's root `public/` directory.

The original repository-level `public/` directory, including its Create React App files and assets, remains intact and is not read by the Astro build. This separation prevents the legacy `public/index.html` from overwriting Astro's generated homepage.

## Local development

```sh
cd astro
npm ci
npm run dev
```

## Checks

```sh
npm run check
npm run build
npm run test:e2e
```

## Evidence policy

Historical project URLs are references, not proof of current availability. Life-Advise is marked as in recovery. INJAZ is marked as in development. Public demo and production status are shown only after deployment has been verified.
