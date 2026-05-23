# Workflow — Feature Build

Use this workflow when adding a new feature to Ailectra.

## Steps

1. Read relevant docs.
2. Identify route, component, server action, query, schema, and translation needs.
3. Add or update Zod schema.
4. Add database migration if needed.
5. Implement server query/action.
6. Implement UI using reusable components.
7. Add translations EN/ID.
8. Add loading/error/empty states.
9. Add tests if logic is important.
10. Run:
   - `pnpm typecheck`
   - `pnpm lint`
   - `pnpm test`
   - `pnpm build` if possible

## Done Output

```txt
Done:
- ...

Changed files:
- ...

Notes:
- ...
```
