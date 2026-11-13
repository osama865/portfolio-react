# Phase 2 — Production deployment preparation

**Status:** Prepared configuration; production domain and deployment approval remain outstanding.

## Build and output

Run from the `astro/` directory with Node.js 22:

```sh
npm ci
npm run check
npm run build
npm run preview -- --host 127.0.0.1
```

Cloudflare Pages settings for the Astro site:

- Framework preset: Astro (or None with the explicit command below)
- Root / project directory: `astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js: 22
- No adapter or runtime server is required; this is a static Astro build.

Keep the Astro portfolio in its isolated Cloudflare Pages project. Do not repoint or reuse the legacy portfolio project as part of this release.

## Required production configuration

The public domain has not yet been confirmed. Do not substitute a preview hostname.

| Variable | Production value | Preview value |
|---|---|---|
| `PUBLIC_SITE_URL` | The approved HTTPS origin, e.g. `https://portfolio.example.com` (replace with the actual approved domain) | Unset |
| `PUBLIC_SITE_INDEXABLE` | `true`, only after the production domain and content are approved | Unset or `false` |

Set production variables only in the Cloudflare Pages **Production** environment. Preview deployments must not inherit the production indexability flag. When either variable is absent, the build deliberately omits canonical/hreflang/absolute Open Graph URL metadata, emits a disallow-all `robots.txt`, and writes an `X-Robots-Tag: noindex, nofollow` header into the build output.

With both production variables set:

- Each route emits a self-referencing canonical URL.
- English and Arabic pages emit reciprocal `hreflang="en"` and `hreflang="ar"` links plus `x-default`.
- `og:url` uses the same locale-specific canonical URL.
- `sitemap.xml` lists the English and Arabic home, archive, editorial, all 13 project-detail and all 17 writing-detail routes.
- `robots.txt` permits indexing and points crawlers to the sitemap.

No absolute canonical or sitemap URL should point to a Cloudflare preview domain. No social-card image is configured because an approved image has not been supplied.

## Redirects and headers

Astro is configured with `trailingSlash: "always"`; internal navigation uses trailing-slash paths. No custom redirect rules are currently required by the application. Review any legacy URL redirects only after the production domain and existing URL inventory are confirmed; do not invent redirects to unrelated destinations.

Preview builds receive a noindex response header. Production should not receive that header when the two production variables above are configured. Verify the deployed response headers and `robots.txt` before enabling indexing.

## Deployment sequence

1. Obtain explicit approval of the production hostname and final release.
2. Create/use a separate Cloudflare Pages production project for this Astro site; do not change the existing production project.
3. Configure the production root, build command, output directory and Node 22 runtime.
4. Add `PUBLIC_SITE_URL` and `PUBLIC_SITE_INDEXABLE=true` to the production environment only.
5. Keep preview variables unset/false and confirm preview response has `X-Robots-Tag: noindex, nofollow`, disallow-all `robots.txt`, and no canonical URL.
6. Deploy only after PR approval and authorized merge/deployment. Confirm exact commit identity before smoke testing.
7. Verify home, project and writing archives, INJAZ and Life-Advise case studies, representative Arabic routes, locale switching, theme persistence, 404 behavior, canonical/hreflang, sitemap, robots and response headers.

## Rollback

Cloudflare Pages retains previous deployments. If the production smoke test fails, use the Pages deployment history to roll back to the immediately preceding known-good production deployment. Do not amend DNS or overwrite the prior deployment as a rollback strategy. Record the failed commit, deployment ID, observed fault and rollback deployment ID.

## Post-deployment smoke checklist

- [ ] HTTPS and approved hostname resolve correctly.
- [ ] Build commit marker matches the approved release commit.
- [ ] English and Arabic homepage load; language switch preserves route identity.
- [ ] All 13 project detail routes and 17 writing detail routes return successfully in both locales.
- [ ] No horizontal overflow at 360, 768 and 1440 CSS pixels.
- [ ] Theme selection persists after reload; reduced-motion preference is respected.
- [ ] No broken images, internal links, browser console errors or missing assets.
- [ ] Canonical URLs use only the approved production domain.
- [ ] Reciprocal `hreflang` pairs point to matching English/Arabic routes.
- [ ] Sitemap lists all intended public routes; robots permits indexing.
- [ ] Production response does not contain a noindex header.
- [ ] Preview response remains noindex and has no production canonical.
- [ ] External destinations and historical availability labels remain accurate.

## Decisions still required

The one configuration value that cannot be inferred safely is the **canonical production HTTPS origin** (for example, `https://yourdomain.com`). It is required before absolute canonical URLs, reciprocal `hreflang`, `og:url`, sitemap locations and production indexing can be enabled. Production deployment itself remains subject to explicit release approval.
