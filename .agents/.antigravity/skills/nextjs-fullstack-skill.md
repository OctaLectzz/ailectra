# Skill — Next.js Full-stack for Ailectra

## Use When

Building routes, dashboard pages, server actions, Prisma queries, auth pages, landing pages, or reusable components.

## Rules

- Server components by default.
- Client components for motion/forms/theme/language/dialog/canvas.
- Keep components small.
- Validate input with Zod.
- Check session and ownership.
- Use `cn()` for classes.
- Use Tailwind tokens.
- Add EN/ID translations.
- Keep dark mode first.

## Preferred Structure

```txt
features/[domain]/
  components/
  actions.ts
  queries.ts
  validators.ts
  types.ts
```

## Output Quality

Code must pass typecheck and lint. Do not leave TODOs for core functionality.
