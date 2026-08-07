---
name: financial-landing-ux
description: >-
  UX checklist for Camilo Meza financial advisory landing (Bogotá, personal and
  business finance). Use when redesigning hero, services, about, contact, CTAs,
  accessibility, or conversion-focused UI.
---

# Financial Landing UX — Camilo Meza AF

## Product context

- Brand: Camilo Meza — asesoría financiera personal y empresarial (Bogotá).
- Surface: single-page marketing site (Pages Router), not a dashboard.
- Primary conversion: schedule/contact for advisory (`Agenda una asesoría financiera`).

## One job per section

| Section | Job |
|---------|-----|
| Hero | Brand + headline + short support + one CTA + dominant visual |
| Services | Explain offerings clearly |
| About | Build trust / personal credibility |
| Contact | Capture lead / message |
| Footer | Secondary links and closing info |

Do not pack stats strips, promo chips, or secondary marketing into the first viewport.

## Hero guidelines

- First viewport should read as one composition.
- Brand/product name should be a strong signal (not only nav text).
- Dominant visual: product/context imagery (existing hero/service images), not abstract purple gradients.
- One primary CTA group; avoid floating badges/overlays on hero media.

## Conversion copy

- Keep the main CTA wording close to: **Agenda una asesoría financiera**.
- Supporting copy should feel professional, clear, and trustworthy (Spanish).
- Avoid emoji-heavy marketing and gimmicky chip clusters.

## Responsive and contrast

- Mobile-first; verify `md:` / `lg:` layouts.
- Light and dark themes must keep readable contrast (`bg-light` / `bg-dark`, card surfaces).
- Touch targets large enough for CTAs on mobile.

## Accessibility

- Meaningful `alt` text on images (describe content, not “imagen”).
- Form fields always have visible `<label>` + matching `htmlFor`.
- Visible focus styles (existing forms use `focus:ring-primary` — keep that pattern).
- Do not remove keyboard reachability from nav/menus/CTAs.

## Hard rules

1. Preserve a calm, professional financial-advisory tone.
2. One primary CTA hierarchy (Hero conversion first).
3. Improve clarity and trust before adding decorative UI chrome.
4. Test both light and dark modes for any UI change.
