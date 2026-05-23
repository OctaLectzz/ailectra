# Testing and Quality — Ailectra

## 1. Required Checks

Before merge:

```bash
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

## 2. Unit Tests

Test:
- Zod validators.
- Encryption/decryption.
- Utility functions.
- Metadata helper.
- Provider config.

## 3. Integration Tests

Test:
- Create connection action.
- Update connection action.
- Delete connection action.
- Ownership checks.
- Launch API.

## 4. E2E Tests

Use Playwright.

Flows:
- Visit home.
- Switch language.
- Switch theme.
- Register manual.
- Login manual.
- Dashboard protected redirect.
- Add connection.
- Launch connection.
- Delete connection.

## 5. Accessibility

Check:
- Keyboard navigation.
- Dialog focus.
- Contrast.
- Button labels.
- Form labels.
- Reduced motion.

## 6. Performance

Check:
- Lighthouse.
- No huge JS bundle from Three.js on every page.
- Dynamic import heavy components.
- Image optimization.
- No layout shift from animated sections.

## 7. Security QA

Check:
- No secret in repo.
- No secret in logs.
- No plaintext credential in DB.
- Protected route works.
- User cannot access another user's connection.
- Reveal secret requires explicit confirmation.
- Launch route filters by `userId`.

## 8. Code Quality Rules

- Avoid files over 250 lines.
- Avoid any type.
- Avoid duplicate JSX sections.
- Prefer typed config.
- Prefer small composable components.
- Prefer server components by default.
