# Agent Rules — Ailectra

## 1. Always Follow

- Use TypeScript.
- Use Tailwind.
- Use existing design tokens.
- Use reusable components.
- Use server components unless interactivity is needed.
- Validate all mutation input with Zod.
- Check session and ownership for protected data.
- Keep dark mode default.
- Keep English default.
- Keep UI responsive.

## 2. Never Do

- Do not store raw secrets.
- Do not bypass third-party AI login.
- Do not scrape private session/cookies.
- Do not hardcode secrets.
- Do not create giant page components.
- Do not ignore mobile layout.
- Do not put all translations inline.
- Do not use random colors outside design system.
- Do not spam heavy animation in dashboard.

## 3. Preferred Patterns

### Server Action

```ts
"use server"

export async function action(input: unknown) {
  const session = await auth()
  if (!session?.user?.id) return { ok: false, message: "Unauthorized" }

  const parsed = schema.safeParse(input)
  if (!parsed.success) return { ok: false, fieldErrors: parsed.error.flatten().fieldErrors }

  // mutation
  return { ok: true, message: "Done" }
}
```

### Client Form

- React Hook Form.
- Zod resolver.
- Sonner toast.
- Loading state.

### Data Query

- Put in `server/queries`.
- Never return secret fields.

## 4. UI Consistency

- Marketing sections use `Section`.
- Dashboard pages use `DashboardShell`.
- Cards use shadcn `Card`.
- Buttons use shadcn `Button`.
- Effects use wrapper with `overflow-hidden`.

## 5. Done Definition

A task is done only if:
- Works.
- Typed.
- Responsive.
- Secure.
- Uses translations.
- Follows design.
- No obvious console error.
