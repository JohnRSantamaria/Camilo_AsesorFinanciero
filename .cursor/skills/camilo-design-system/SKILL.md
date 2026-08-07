---
name: camilo-design-system
description: >-
  Design system for Camilo Meza Asesoría Financiera (Next.js + Tailwind).
  Use when editing UI, styles, colors, typography, dark mode, buttons, or visual
  polish on the landing page.
---

# Design System — Camilo Meza AF

## Colors (Tailwind tokens only)

Defined in `tailwind.config.js`. Do not introduce one-off hex colors in components unless extending the theme first.

| Token | Value | Use |
|-------|-------|-----|
| `dark` | `#1b1b1b` | Dark backgrounds, dark text on light |
| `light` | `#f5f5f5` | Light backgrounds |
| `primary` | `#c29739` | Brand gold, headings accent |
| `primaryLight` | `#eabf36` | Gradients, highlights |
| `primaryDark` | `#efdc97` | Soft gold accents |
| `secondary` | `#fffad6` | Soft cream surfaces |

Utility examples: `bg-primary`, `text-primary`, `from-primary`, `dark:bg-dark`, `bg-light`.

## Typography

- Primary font: **Raleway** via `next/font/google` on the home page (`pages/index.tsx`).
- Do not switch to Inter, Roboto, Arial, or system stacks for marketing UI.
- Section titles often use `AnimatedText` with `text-primary font-bold`.

## Dark mode

- `darkMode: 'class'` in Tailwind.
- Theme toggled with `useThemeSwitcher` (`hooks/useThemeSwitcher.ts`) via `document.documentElement.classList` and `localStorage`.
- Pair light/dark styles: e.g. `bg-light dark:bg-dark`, `bg-stone-200 dark:bg-zinc-800`.

## Primary CTA button

Main conversion button (Hero “Agenda una asesoría financiera”):

```
bg-gradient-to-t from-primary via-primaryLight to-primaryDark
text-white uppercase font-semibold tracking-widest
hover:shadow-md hover:scale-105 active:scale-95
transition-transform duration-300
```

Reserve this gradient for the main conversion CTA. Secondary actions may use `components/common/Button.tsx` (`bg-primary`).

## Layout atmosphere

- Page shell: `bg-light dark:bg-dark`.
- Prefer gradients or subtle surface contrast over flat single-color hero areas when redesigning.
- Mobile-first breakpoints: base → `sm:` → `md:` → `lg:` → `xl:`.

## Hard rules

1. Stay inside the Tailwind brand palette above.
2. Keep Raleway as the display/UI font for the landing.
3. Always support `dark:` variants for new surfaces and text.
4. Match existing spacing rhythm (`gap-4`, `gap-8`, `px-4`, section `min-h-screen`).
