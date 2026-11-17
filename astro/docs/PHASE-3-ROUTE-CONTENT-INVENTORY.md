# Phase 3 — route and content inventory

**Baseline:** `04a408b0c7b31356b21501ad31359048f6683514`  
**Audit date:** 14 November 2026  
**Scope:** generated Astro portfolio routes and retained content records.

## Route inventory

The generated route set contains 36 routes per locale, 72 total:

| Route family | English | Arabic | Total |
|---|---:|---:|---:|
| Home | 1 | 1 | 2 |
| Project archive | 1 | 1 | 2 |
| About | 1 | 1 | 2 |
| Engineering Approach | 1 | 1 | 2 |
| Contact | 1 | 1 | 2 |
| Writing archive | 1 | 1 | 2 |
| Project details | 13 | 13 | 26 |
| Writing details | 17 | 17 | 34 |
| **Total** | **36** | **36** | **72** |

The exact-head deployed route sweep verified all 13 English and 13 Arabic project-detail routes, and all 17 English and 17 Arabic writing-detail routes at desktop, tablet and mobile widths. The generated static editorial routes are covered by the local exhaustive route suite. The artifact includes representative bilingual desktop/mobile screenshots, both homepage themes and an open mobile-navigation capture.

## Content inventory

### Projects

There are 13 retained project records:

1. INJAZ — first featured case study; in development.
2. Life-Advise — second featured case study; historical project with a later recovery effort.
3. Netflix interface — archive; historical reference.
4. Restaurant website — archive; historical reference.
5. Amazon storefront concept — archive; historical/incomplete concept.
6. Personal portfolio · legacy — archive; legacy React site.
7. Hotel room rental — archive; historical project; mismatched old deployment link excluded.
8. Chat room — archive; historical client project.
9. Galarey — archive; historical project.
10. Weather PWA — archive; historical project.
11. Food recipes PWA — reserve; not promoted pending runtime and offline evidence.
12. Gym landing page — archive; historical template.
13. AOS animation tests — archive; historical experiment.

The third featured position remains intentionally unfilled. No ranking change is proposed by this audit.

### Writing

There are 17 distinct writing-entry records. English and Arabic route counterparts exist for all 17. External articles remain at their original-language destinations; Arabic portfolio summaries are not represented as full translations of those external articles.

### Attribution and claims

- INJAZ distinguishes Product Owner responsibilities from implementation contributions made by development agents. It does not claim sole authorship of all application code, database changes or technical proposals.
- Life-Advise describes manual collection, selection and organisation of the advice/quotation material, without claiming personal authorship of every code module.
- Historical repository presence and historical URLs are not treated as proof of a currently maintained or production-ready service.
- Food Recipes remains reserve; no runtime/offline readiness claim is made.

## Link evidence

The exact-head audit checked 51 configured external destinations:

| Disposition | Count | Interpretation |
|---|---:|---|
| Reachable | 44 | HTTP response received; this does not establish that every destination is a maintained demo |
| DNS/network error | 4 | Historical references: Netflix, Restaurant, Chat Room and AOS |
| Access restricted | 2 | Amazon historical destination (403) and X profile (403) |
| Server error / blocked response | 1 | LinkedIn profile returned HTTP 999 |
| **Total** | **51** | |

All four network-error destinations are historical references, not internal portfolio routes. Restricted/profile responses are not evidence that the corresponding project or account has been deleted. GitHub source links checked by the audit were reachable. Internal route integrity is separately covered by the exhaustive route suite.

## Route/content acceptance notes

- Route presence and responsive browser checks: automated evidence passed.
- Project and writing counts: regression assertions preserve 13 projects, 17 writing entries and two featured case studies.
- Arabic content: implemented, but independent fluent editorial review is still required before language-quality sign-off.
- Claims and attribution: source-backed case-study qualifications are present; do not expand claims without new evidence.
- External destinations: retain historical/unverified labels where applicable; do not describe HTTP 200 alone as proof of a working project experience.
