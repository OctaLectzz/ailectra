# Architecture — Ailectra

## 1. Architecture Type

**Ailectra** menggunakan arsitektur full-stack Next.js:

- Frontend: React Server Components + Client Components.
- Backend: Server Actions + Route Handlers.
- Database: PostgreSQL.
- ORM: Prisma.
- Auth: Auth.js.
- Styling: Tailwind CSS.
- UI: shadcn/ui plus animated component libraries.

## 2. Route Groups

```txt
app/[locale]/
  (marketing)/
  (auth)/
  (dashboard)/
```

### Marketing Routes

Public routes:
- `/`
- `/features`
- `/integrations`
- `/security`
- `/pricing`
- `/about`
- `/contact`

### Auth Routes

- `/login`
- `/register`
- `/error`

### Dashboard Routes

Protected:
- `/dashboard`
- `/dashboard/tools`
- `/dashboard/accounts`
- `/dashboard/accounts/new`
- `/dashboard/history`
- `/dashboard/security`
- `/dashboard/settings`

## 3. Rendering Strategy

### Server Components

Gunakan server components untuk:
- Page layout.
- Data fetching.
- Provider list.
- Account list.
- Dashboard stats.
- SEO pages.

### Client Components

Gunakan client components untuk:
- Theme toggle.
- Language switcher.
- Forms.
- Dialog/modal.
- Animated UI.
- Lenis provider.
- Three.js canvas.
- Interactive charts.

## 4. Data Flow

```txt
Client Form
  -> Server Action
    -> Zod validation
    -> Auth ownership check
    -> Prisma mutation
    -> revalidatePath
    -> return state/toast
```

## 5. Launch Flow Architecture

```txt
ConnectionCard click
  -> POST /api/launch/[connectionId]
    -> get session
    -> validate connection owner
    -> detect launch type
    -> create LaunchHistory
    -> return launch payload
  -> client handles:
    - redirect URL
    - modal
    - copy action
    - error toast
```

## 6. Auth Architecture

Auth.js handles:
- Google OAuth.
- Credentials login.
- Session.
- Prisma Adapter.

Manual register should:
- Validate input.
- Check duplicate email.
- Hash password.
- Create user.
- Redirect login.

## 7. Middleware / Proxy

Responsibilities:
- Locale redirect.
- Protected dashboard route.
- Auth check.
- Keep public pages accessible.

## 8. Module Boundaries

### `features/auth`

- Login form.
- Register form.
- Auth validators.
- Auth actions.

### `features/accounts`

- Connection CRUD.
- Connection cards.
- Account validators.

### `features/providers`

- AI provider list.
- Provider cards.
- Provider seed.

### `features/launch`

- Launch route.
- Launch payload.
- Launch history.

### `features/settings`

- Theme/language settings.
- Profile settings.

## 9. Config Files

### `config/site.ts`

Contains:
- site name.
- tagline.
- base URL.
- default metadata.
- social links.

### `config/navigation.ts`

Contains:
- marketing nav.
- dashboard nav.
- footer nav.

### `config/ai-providers.ts`

Contains default providers for seed and fallback UI.

## 10. Error Handling

- Form errors: return field-level errors.
- Server errors: generic user-safe message.
- Auth errors: route `/error`.
- Database errors: log safe code, not secret.
- Launch errors: show toast/modal explanation.

## 11. Observability

MVP:
- AuditLog model.
- LaunchHistory.
- Server console for non-sensitive dev logs.

Future:
- Sentry.
- PostHog.
- Analytics.
- Error dashboard.

## 12. Performance Strategy

- Use server components.
- Lazy load heavy animation.
- Dynamic import Three.js canvas.
- Disable heavy effects on mobile if necessary.
- Use `prefers-reduced-motion`.
- Optimize images.
- Keep dashboard animation minimal.
