---
name: forms-and-feedback
description: >-
  Formik/Yup forms and SweetAlert2 feedback patterns for Camilo Meza AF.
  Use when editing contact forms, validation, submit states, alerts, or
  user feedback on the landing.
---

# Forms and Feedback — Camilo Meza AF

## Stack

- Forms: Formik + Yup (`components/contactMe.tsx`)
- Alerts: `successAlert` / `errorAlert` from `utils/swal.tsx` (SweetAlert2)
- API: `POST /api/send` with JSON body
- Anti-spam/rate hint: cookie `formSubmitted` (30 minutes) via `js-cookie`

## Form field styling

Match contact form controls:

```
w-full p-2 rounded-lg bg-light dark:bg-dark
focus:outline-none focus:ring-1 focus:ring-primary
```

Form shell surfaces align with service cards:

```
bg-stone-200 dark:bg-zinc-800 rounded-lg
```

Always pair `<label htmlFor="...">` with the field `name` / `id`.

## Validation (Yup)

Keep Spanish messages. Current contact constraints (extend carefully):

- `name`: required, max 50
- `email`: required, email, max 50
- `cellPhone`: optional-style matches for 10 digits / numbers only
- `subject`: required, max 50
- `message`: required, max 500

Show errors with Formik `ErrorMessage`.

## Submit flow

1. `setSubmitting(true)`
2. `fetch('/api/send', { method: 'POST', ... })`
3. On success: set cookie if needed, `successAlert(...)`, reset form
4. On failure: `errorAlert(...)`
5. `finally`: `setSubmitting(false)`

Do not invent a second toast system; reuse Swal helpers.

## Alert helpers

```ts
await successAlert(title, text);
await errorAlert(title, text);
```

Popup styling already targets light/dark backgrounds. Prefer brand-aligned confirm colors already in `swal.tsx` unless redesigning alerts intentionally.

## Copy language

- All user-facing validation and alert strings in **Spanish**.
- Success example tone: “Mensaje enviado” / “Gracias por contactarme…”

## Hard rules

1. Formik + Yup for new or changed forms on this site.
2. Feedback only through `successAlert` / `errorAlert` unless replacing Swal project-wide.
3. Preserve `focus:ring-primary` and label accessibility.
4. Keep submitting/disabled states so users cannot double-submit.
