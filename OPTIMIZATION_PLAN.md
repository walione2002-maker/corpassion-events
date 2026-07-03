# OPTIMIZATION_PLAN.md
## Deep Technical & UX Audit — Corpassion Events

This document contains a comprehensive, execution-ready plan to transition the Corpassion Events website from its rapid development state into a production-ready state, adhering strictly to the established "Anti-Gravity" design logic. No visual layouts or animations are to be altered.

### 1. Directory Structure Context
```text
corpassion-events/
├── app/
│   ├── api/
│   │   └── checkout/route.ts
│   ├── checkout/
│   │   └── ticket/[id]/page.tsx
│   ├── events/
│   │   ├── [slug]/page.tsx
│   │   └── page.tsx
│   ├── services/page.tsx
│   ├── training-calendar/
│   │   ├── [slug]/page.tsx
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── events/
│   ├── pricing/
│   ├── summit/
│   ├── training/
│   │   ├── EventList.tsx
│   │   ├── FilterBar.tsx
│   │   └── TrainingHero.tsx
│   ├── FeaturedEventCarousel.tsx
│   ├── Footer.tsx
│   ├── GlobalBackground.tsx
│   ├── Header.tsx
│   ├── Hero.tsx
│   ├── Newsletter.tsx
│   ├── Services.tsx
│   └── WhyAttend.tsx
├── data/
│   ├── events.ts
│   └── training.ts
├── lib/
│   └── validations.ts
└── tailwind.config.ts
```

### 2. Bugs Identified & Root Causes

1. **Navigation Bug (`as any` usage)**
   - *Issue*: `components/Header.tsx` uses `(link as any).isNew` which circumvents TypeScript's type safety.
   - *Root Cause*: The `navLinks` array in `data/events.ts` lacks a properly defined TypeScript interface that includes the optional `isNew` property.
2. **Button Padding & Layout Bugs**
   - *Issue 1 (Carousel Button)*: The "Next" button in `FeaturedEventCarousel.tsx` is absolutely positioned at `right-[-20px]`, causing horizontal overflow (horizontal scrollbar) on narrow mobile screens.
   - *Issue 2 (Hero CTAs)*: The subtext inside the buttons in `Hero.tsx` uses `text-[10px]`, which is too small and wraps awkwardly on smaller screens.
3. **Training Calendar Bugs**
   - *Issue*: Month filtering in `app/training-calendar/page.tsx` relies on parsing ISO dates (`2026-07-06`) using `new Date()` and comparing against `.toLocaleString('default', { month: 'long', year: 'numeric' })`.
   - *Root Cause*: `new Date('2026-07-06')` is parsed as UTC midnight, which in Western timezones falls on the 5th of July, potentially causing off-by-one month filtering bugs. The filter bar dropdown options and the active filters become desynced.
4. **Dead Links in Footer**
   - *Issue*: The footer's legal section links to hash routes (`#terms`, `#privacy`, etc.) that do not scroll anywhere or resolve to real pages.
5. **Services Component Type Bug**
   - *Issue*: `components/Services.tsx` uses `(LucideIcons as any)[service.icon]` to dynamically load icons, which breaks type safety and can cause runtime errors if an icon is removed or misspelled.

---

### 3. Execution Plan (Atomic Tasks)

An AI coding agent can sequentially execute these isolated tasks to apply the optimizations.

#### Task 1: Fix Navigation Types in `data/events.ts`
- **Action**: Define `export interface INavLink { label: string; href: string; isNew?: boolean; }` at the top of `data/events.ts`.
- **Action**: Explicitly type the `navLinks` constant as `INavLink[]`.

#### Task 2: Remove `as any` from `components/Header.tsx`
- **Action**: Import `INavLink` from `@/data/events` into `components/Header.tsx`.
- **Action**: Remove the `(link as any).isNew` casting on lines 79 and 148, using simply `link.isNew` now that the type is strictly enforced.
- **Action**: Ensure mobile menu scroll locking is implemented (add `overflow: hidden` to `document.body` when `mobileMenuOpen` is true).

#### Task 3: Fix Button Overflow in `FeaturedEventCarousel.tsx`
- **Action**: Change the Next button's absolute positioning from `right-[-20px]` to `right-2 md:right-[-20px]` so it stays within the viewport on mobile devices.

#### Task 4: Fix Button Subtext in `Hero.tsx`
- **Action**: Update the "Attend", "Exhibit", and "Sponsor" buttons in `components/Hero.tsx`. Increase the subtext sizes from `text-[10px]` to `text-xs`. Ensure the padding and gap properties prevent the text from breaking awkwardly on mobile devices (e.g. use `whitespace-nowrap`).

#### Task 5: Robust Date Parsing in Training Calendar
- **Action**: In `app/training-calendar/page.tsx`, replace the `new Date()` parsing inside the `useMemo` hooks with a safe UTC parser or simple string extraction (e.g. mapping `2026-07` to "July 2026") to ensure the timezone does not shift the month unexpectedly.

#### Task 6: Resolve `as any` in `components/Services.tsx`
- **Action**: Instead of `(LucideIcons as any)[service.icon]`, explicitly type the icon mapping using `keyof typeof LucideIcons` or create a predefined map of the 6 specific icons used in the `services` array in `data/events.ts`.

#### Task 7: Fix Dead Links in `components/Footer.tsx`
- **Action**: Update the `legalLinks` array in `components/Footer.tsx` to point to actual routes: `/legal/terms`, `/legal/privacy`, `/legal/code-of-conduct`, `/legal/refund`.
- **Action**: Create these four pages as simple static placeholders inside an `app/legal/[slug]/page.tsx` dynamic route, maintaining the global theme structure.

#### Task 8: Optimize Social Link Anchors in `components/Footer.tsx`
- **Action**: Ensure all social media `<a>` tags in the footer include `target="_blank"` and `rel="noopener noreferrer"`.

---

### 4. Code Immutability Constraints (Reminders for Executor)
- DO NOT alter the `animate-blob` logic, colors, or sizes in any background components, as they have already been stripped back to user specifications.
- DO NOT modify the Framer Motion configuration.
- DO NOT change layout structures beyond what is necessary for overflow/padding fixes on mobile.
