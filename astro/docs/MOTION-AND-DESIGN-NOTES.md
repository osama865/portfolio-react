# Phase 1.5 — Visual language and motion notes

## Visual direction

The existing IBM Plex Sans, IBM Plex Sans Arabic and IBM Plex Mono families remain. The new narrative uses an editorial headline scale, narrow reading measure, numbered section metadata, margin notes, rules and linked writing entries. The project archive and case-study content remain structured and scannable; not every section is a card.

The homepage quote is typeset as the primary editorial element. It is not accompanied by a three-part explanation. Work and Writing are parallel discovery paths, not competing identities.

## Implemented motion

- **Opening:** headline lines and supporting intro use a short opacity/vertical transition with staggered delays.
- **Reading:** selected section headings and entries reveal once when entering the viewport; content remains visible by default if JavaScript or IntersectionObserver is unavailable.
- **Project and writing links:** restrained hover/focus colour, underline and small image movement; no pointer-only affordances.
- **Navigation and theme:** existing menu and theme controls remain functional; transitions are short and non-blocking.
- **Reduced motion:** `prefers-reduced-motion: reduce` disables scroll behaviour, reveal transitions and hover movement. The script does not hide content for reduced-motion users.

## Technical constraints

CSS-first; no animation framework or new runtime dependency. The reveal script uses native IntersectionObserver and is progressive enhancement. Content remains present in static HTML and readable without JavaScript. Avoid long entrance sequences and layout-affecting transforms.

## Verification still required

The full Playwright suite, keyboard checks, both theme states and mobile/desktop screenshots must run on the committed Phase 1.5 head. Motion behaviour should be checked with reduced motion enabled in the browser, not inferred from the CSS declaration alone.
