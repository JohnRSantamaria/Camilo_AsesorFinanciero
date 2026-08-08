---
name: ui-components-patterns
description: >-
  Component and layout patterns for Camilo Meza AF landing (Pages Router).
  Use when adding or refactoring sections, nav, cards, links, buttons, or page
  structure in components/ or pages/.
---

# UI Component Patterns — Camilo Meza AF

## Page composition (`pages/index.tsx`)

Keep this order inside `Layout`:

1. `NavbarMenu` (desktop)
2. `MobileNabBarMenu` (mobile)
3. `Hero`
4. `Services`
5. `AboutMe`
6. `ContactMe`
7. Fixed scroll-to-top control
8. `Footer` (outside or after main content as today)

Do not invent a new dashboard-style first viewport. This is a marketing landing.

## Layout wrappers

| Component | Role |
|-----------|------|
| `components/Layout.tsx` | Page chrome / shared layout |
| `components/SectionsLayout.tsx` | Full-viewport section (`min-h-screen`, `px-4`, optional `id`) |

New major sections should wrap content in `SectionsLayout` with a stable `id` for anchor nav.

## Typography / motion

- Section titles: `components/framerMotion/AnimatedText.tsx`
- Pass optional `className` for size overrides (Hero already does this)

## Navigation links

- Desktop: `components/links/CustomLink.tsx`
- Mobile: `components/links/CustomMobileLink.tsx`
- Prefer these over ad-hoc `Link` styling for in-page nav.

## Buttons

| Use case | Pattern |
|----------|---------|
| Primary conversion CTA | Hero-style gradient button (see design-system skill) |
| Secondary actions | `components/common/Button.tsx` (`bg-primary`, hover shadow, `active:scale-95`) |

Avoid duplicating one-off button styles when `Button` or the Hero CTA pattern already fits. If both exist, extract shared classes rather than diverging further.

## Service cards

Pattern in `components/Services.tsx` (`CardServices`):

- Container: `bg-stone-200 dark:bg-zinc-800 rounded-md shadow-md`
- Title + image (`next/image`) + short description
- Grid: `grid-cols-1 lg:grid-cols-2 gap-8`

Reuse this card shell for similar content blocks.

## Icons / assets

- Icons under `components/icons/` and `react-icons`
- Images via `next/image` and imports from `public/Image/`
- Path alias: `@/*` → project root

## Hard rules

1. Reuse `SectionsLayout` + `AnimatedText` for new sections.
2. Keep nav dual structure (desktop + mobile menus).
3. Prefer existing link/button components over new primitives.
4. Match card surfaces to Services (`stone-200` / `zinc-800`) unless design-system tokens are extended.
