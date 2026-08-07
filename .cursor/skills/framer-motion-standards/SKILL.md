---
name: framer-motion-standards
description: >-
  Framer Motion and intersection-observer animation standards for Camilo Meza AF.
  Use when adding or changing animations, AnimatedText, section entrance effects,
  or motion polish on the landing.
---

# Framer Motion Standards — Camilo Meza AF

## Stack

- `framer-motion` for motion components
- `react-intersection-observer` (`useInView`) for scroll-triggered play
- Reference implementation: `components/framerMotion/AnimatedText.tsx`

## Default `useInView` options

```ts
useInView({
  threshold: 0.5,
  triggerOnce: true,
});
```

Play animations once when ~50% visible. Do not retrigger on every scroll unless there is a clear UX reason.

## Title animation (word stagger)

Match existing `AnimatedText` timing:

| Parameter | Value |
|-----------|-------|
| Container delay | `0.5` |
| `staggerChildren` | `0.08` |
| Word duration | `1` |
| Word initial | `opacity: 0`, `y: 50` |
| Word animate | `opacity: 1`, `y: 0` |

Titles use `motion.h2` with brand color (`text-primary`) unless overridden.

## What to animate

- Prefer section titles and 1–2 intentional entrance motions per section.
- Avoid animating every card, icon, and paragraph.
- Ship presence and hierarchy, not noise.

## Reduced motion

For **new** animations, respect `prefers-reduced-motion`:

- Skip or shorten motion when the user prefers reduced motion.
- Keep content fully readable without animation.

## Hard rules

1. Prefer extending `AnimatedText` over copy-pasting a new stagger implementation.
2. Keep `triggerOnce: true` for landing section titles.
3. Do not add continuous looping decorative animations on marketing sections.
4. Align delays/durations with the table above unless intentionally redesigning the motion language.
