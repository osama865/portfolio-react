# Writing identity and profile research

**Research date:** 13 November 2026  
**Scope:** the four profile URLs supplied by the Product Owner. This report records only public content that could be inspected; it is not a full account export.

## Access and identity verification

| Profile | Result | Evidence and limitation |
|---|---|---|
| LinkedIn | Partially accessible | The exact profile URL was blocked to direct extraction (HTTP 999 / bot protection). Search indexing returned a matching Osama Ibrahim profile at the supplied slug, with a full-stack developer summary, Al-Neelain University and project history. This is partial corroboration, not a complete profile review. |
| Medium | Accessible | The profile identifies the author as Osama / `@osama1010`, with a bio describing full-stack work in React and Node.js and writing about technologies used while developing web apps. The public profile exposes at least ten article entries. |
| DEV | Accessible | The profile identifies Osama / `@osam1010`, repeats the same professional summary, and exposes 17 published posts and 16 comments. Article pages identify the author as Osama. |
| X | Partially accessible | The supplied profile resolves to Osama Ibrahim / `@Osam1010`; its public page exposes a professional bio and several posts, including a Node.js framework-choice link and older technical posts. The available sample is not a complete timeline. |

## Verified publications

The Writing archive contains 17 distinct DEV publications, deduplicating pieces also present on Medium. Each entry links to one original publication and uses a verified title/date from the author's public profile or article metadata.

| Publication | Date shown on profile | Canonical destination |
|---|---:|---|
| How To Choose The Right Framework For Your Next Node.js App. | 22 Sep 2022 (Medium) / 23 Sep 2022 (DEV) | [Medium](https://medium.com/devops-dev/how-to-choose-the-right-framework-for-your-next-node-js-app-74f72ba1fb56) · [DEV](https://dev.to/osam1010/how-to-choose-the-right-framework-for-your-next-nodejs-app-2c1e) |
| Advanced Node.js Topics: Caching. | 31 Jul 2022 | [Medium](https://medium.com/dev-genius/advanced-node-js-topics-caching-e3d17dc1d738) · [DEV](https://dev.to/osam1010/advanced-nodejs-topics-caching-46a1) |
| Docker: Brief Introduction. | 23 Jul 2022 | [Medium](https://medium.com/@osama1010/docker-brief-introduction-bd46ba58cb84) · [DEV](https://dev.to/osam1010/docker-brief-introduction-b0a) |
| Side Project: Life-Advise Web App. | 26 May 2022 (Medium) / 4 Jun 2022 (DEV) | [Medium](https://medium.com/dev-genius/side-project-life-advise-web-app-aa8fc1fc25d7) · [DEV](https://dev.to/osam1010/side-project-life-advise-web-app-34e0) |
| Javascript 1O1 series: Array’s Methods And Iterators Part(1), Methods. | 24 Apr 2022 | [Medium](https://medium.com/dev-genius/javascript-1o1-series-arrays-methods-and-iterators-part-1-methods-cfd22d194cb) · [DEV](https://dev.to/osam1010/javascript-1o1-series-arrays-methods-and-iterators-part1-methods-24ff) |
| Javascript 1O1 series: Scopes and Execution Contexts. | 21 Apr 2022 | [Medium](https://medium.com/dev-genius/javascript-1o1-series-scopes-and-execution-contexts-d4df43f007b4) · [DEV](https://dev.to/osam1010/javascript-1o1-series-scopes-and-execution-contexts-gki) |
| Javascript 1O1 series: Functions. | 19 Apr 2022 | [Medium](https://medium.com/dev-genius/javascript-1o1-series-functions-e02308cd675c) · [DEV](https://dev.to/osam1010/javascript-1o1-series-functions-4g9c) |
| Javascript 1O1 series: Variables vs Constants, and Let keyword. | 18 Apr 2022 | [DEV](https://dev.to/osam1010/javascript-1o1-series-variables-vs-constants-and-let-keyword-m0p) |
| Javascript 1O1 series: Writing loops with For, While and Do while. | 17 Apr 2022 | [DEV](https://dev.to/osam1010/javascript-1o1-series-writing-loops-with-for-while-and-do-while-1ib3) |
| Great collection of Free resources to learn javascript and web development. | 14/15 Apr 2022 | [Medium](https://medium.com/@osama1010/great-collection-of-free-resources-to-learn-javascript-and-web-development-42eebe1a5769) · [DEV](https://dev.to/osam1010/great-collection-of-free-resources-to-learn-javascript-and-web-development-1cmb) |
| Conditional statements and loops Practices in Javascript. | 14 Apr 2022 | [DEV](https://dev.to/osam1010/conditional-statements-and-loops-practices-in-javascript-3i1n) |
| Javascript console.time(), What is it? | 13 Apr 2022 | [DEV](https://dev.to/osam1010/javascript-consoletime-what-is-it-2g37) |
| Javascript 1O1 series: Conditional statements. if, if else and switch. | 11 Apr 2022 | [DEV](https://dev.to/osam1010/javascript-1o1-series-conditional-statements-if-if-else-and-switch-jeh) |
| Javascript 1O1 series: Learn syntax, variables and datatypes. | 9 Apr 2022 | [DEV](https://dev.to/osam1010/javascript-1o1-series-learn-syntax-variables-and-datatypes-3cic) |
| Javascript 1O1 series: introduction. | 8/9 Apr 2022 | [Medium](https://medium.com/@osama1010/javascript-1o1-series-introduction-808b37e4b3e1) · [DEV](https://dev.to/osam1010/javascript-1o1-series-introduction-3eja) |
| Document.designMode, What is it? | 7 Mar 2022 | [DEV](https://dev.to/osam1010/documentdesignmode-what-is-it-26df) |
| what to write about | 6 Mar 2022 | [DEV](https://dev.to/osam1010/what-to-write-about-1j0o) |

The date display follows the relevant profile listing where dates differ across cross-posted versions; the original page remains the source of truth. Medium's public profile also lists “How To Choose The Right Framework…”, “Advanced Node.js Topics: Caching”, “Docker: Brief Introduction”, “Side Project: Life-Advise Web App”, the JavaScript 1O1 entries and “Great collection of Free resources…”. Duplicates are represented once in the archive with an alternate link.

## Recurring themes

1. **Choosing tools by context.** The framework article compares Express, Koa, Hapi, Fastify, Nest, Ember, Backbone and Meteor, then offers a personal preference tied to project shape rather than claiming one winner.
2. **Practical backend engineering.** Node.js, Redis caching, performance, Docker, APIs and framework selection recur.
3. **Teaching fundamentals.** The JavaScript 1O1 sequence moves from introduction and syntax to conditionals, loops, functions, scopes and arrays.
4. **Learning through building.** Life-Advise is presented as a side project, with its offline-first behaviour and notifications explained.
5. **Occasional meta-writing.** “what to write about” is a brief reflection about the act of writing itself.

## Voice observations from inspected samples

- Conversational and reader-facing, often opening with a question or a practical problem.
- Explanatory and structured: definitions, numbered considerations, pros/cons, examples, then a personal conclusion.
- Accessible rather than academic; technical terms are introduced in plain language.
- Opinionated but qualified. The framework article explicitly leaves the final choice to the reader and explains the conditions behind the author's own preference.
- Encouraging and informal, with occasional rhetorical asides and direct invitations for questions or feedback.
- Early pieces contain inconsistent capitalization, spelling and punctuation. The portfolio should preserve the approachable cadence and practical reasoning, not reproduce historical copy-editing errors.

## Editorial direction for the portfolio

Use clear, curious, practical language. Lead with the question or problem, explain the trade-off, and let the conclusion remain open where the source does. Avoid inflated claims, generic “passionate developer” language, and autobiographical details that are not in evidence.

The homepage quote remains exactly as supplied by the Product Owner and receives no explanatory caption. The introduction should simply identify the work and the writing. The About page may connect engineering and writing through verified habits, but should not convert the quote into three branded pillars.

## Items not claimed

- The LinkedIn profile was not fully inspected.
- X was reviewed only through the public profile's indexed sample, not a complete timeline.
- The archive records 17 distinct DEV posts visible in the profile extraction; it does not claim this is the author's complete lifetime publication count.
- No private posts, unpublished drafts, comments or account analytics were accessed.
