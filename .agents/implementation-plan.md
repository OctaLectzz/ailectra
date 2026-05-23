# Implementation Plan — Ailectra

## 0. Keputusan Stack

Gunakan stack berikut sebagai default:

```txt
Framework       : Next.js App Router
Language        : TypeScript
Database        : PostgreSQL
ORM             : Prisma
Auth            : Auth.js / NextAuth
Styling         : Tailwind CSS
UI Base         : shadcn/ui
Animation       : Motion / Framer Motion
Smooth Scroll   : Lenis
3D              : Three.js + React Three Fiber
Landing Effects : Aceternity UI + Magic UI + React Bits
Validation      : Zod
Forms           : React Hook Form + Zod Resolver
Icons           : lucide-react
Charts          : Recharts / Tremor style custom chart
State           : Zustand only if needed
i18n            : next-intl
Theme           : next-themes
Testing         : Vitest + React Testing Library + Playwright
Lint/Format     : ESLint + Prettier
```

Prisma dipilih sebagai default karena integrasi Auth.js Prisma Adapter lebih lurus dan cocok untuk MVP. Drizzle boleh dipakai kalau prioritas utama adalah SQL-like query dan bundle minimal, tapi jangan campur Prisma dan Drizzle dalam MVP.

## 1. Project Bootstrap

### 1.1 Buat Project

```bash
pnpm create next-app@latest ailectra \
  --ts \
  --tailwind \
  --eslint \
  --app \
  --src-dir \
  --import-alias "@/*"
```

### 1.2 Install Dependencies

```bash
pnpm add next-auth @auth/prisma-adapter
pnpm add @prisma/client zod bcryptjs
pnpm add next-intl next-themes
pnpm add react-hook-form @hookform/resolvers
pnpm add framer-motion three @react-three/fiber @react-three/drei
pnpm add lenis lucide-react
pnpm add recharts
pnpm add zustand
pnpm add clsx tailwind-merge class-variance-authority
pnpm add sonner
pnpm add -D prisma tsx vitest @testing-library/react @testing-library/jest-dom playwright prettier
```

> Catatan: package `framer-motion` masih banyak dipakai, tetapi dokumentasi baru juga memakai nama Motion. Gunakan satu pola import yang konsisten sesuai versi package yang dipasang.

### 1.3 Init shadcn/ui

```bash
pnpm dlx shadcn@latest init
```

Tambahkan komponen awal:

```bash
pnpm dlx shadcn@latest add button card input label textarea dialog dropdown-menu sheet tabs badge separator avatar form table tooltip select switch skeleton alert progress sonner
```

### 1.4 Init Prisma

```bash
pnpm prisma init
```

Gunakan PostgreSQL:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/ailectra"
AUTH_SECRET="generate-secret-here"
AUTH_GOOGLE_ID=""
AUTH_GOOGLE_SECRET=""
APP_URL="http://localhost:3000"
ENCRYPTION_KEY="32-byte-base64-key"
```

## 2. Folder Structure

Gunakan struktur ini:

```txt
src/
  app/
    [locale]/
      (marketing)/
        page.tsx
        features/
          page.tsx
        integrations/
          page.tsx
        security/
          page.tsx
        pricing/
          page.tsx
        about/
          page.tsx
        contact/
          page.tsx
      (auth)/
        login/
          page.tsx
        register/
          page.tsx
        error/
          page.tsx
      (dashboard)/
        dashboard/
          page.tsx
          tools/
            page.tsx
          accounts/
            page.tsx
          accounts/
            new/
              page.tsx
          history/
            page.tsx
          security/
            page.tsx
          settings/
            page.tsx
      layout.tsx
      not-found.tsx
    api/
      auth/
        [...nextauth]/
          route.ts
      launch/
        [connectionId]/
          route.ts
    opengraph-image.tsx
    sitemap.ts
    robots.ts
    layout.tsx

  components/
    ui/
    common/
    layout/
    marketing/
    dashboard/
    auth/
    forms/
    effects/
    charts/
    three/
    providers/

  config/
    site.ts
    navigation.ts
    ai-providers.ts
    theme.ts

  db/
    prisma.ts
    seed.ts

  features/
    auth/
    accounts/
    providers/
    launch/
    settings/
    i18n/

  i18n/
    request.ts
    routing.ts
    messages/
      en.json
      id.json

  lib/
    auth.ts
    env.ts
    encryption.ts
    rate-limit.ts
    seo.ts
    utils.ts
    validators.ts

  server/
    actions/
      account-actions.ts
      settings-actions.ts
    queries/
      account-queries.ts
      provider-queries.ts

  styles/
    globals.css

prisma/
  schema.prisma
  seed.ts

public/
  images/
    og/
    logos/
    providers/
```

## 3. Phase 1 — Foundation

### Tasks

- Setup Next.js App Router.
- Setup TypeScript strict.
- Setup Tailwind.
- Setup shadcn/ui.
- Setup theme provider dengan default dark.
- Setup next-intl dengan default English.
- Setup Prisma client.
- Setup env validation.
- Setup base layout.
- Setup global styles dan CSS variables.

### Acceptance Criteria

- App bisa run.
- Dark mode default aktif.
- Switch light/dark bekerja.
- Locale `/en` dan `/id` bekerja.
- Tidak ada TypeScript error.
- Tidak ada hydration warning dari theme.

## 4. Phase 2 — Design System

### Tasks

- Definisikan CSS variables untuk color tokens.
- Buat `SiteHeader`, `SiteFooter`, `MobileNav`.
- Buat `Container`, `Section`, `GradientText`, `SectionHeading`.
- Buat `MotionReveal`, `AnimatedCounter`, `BackgroundLayer`.
- Buat utility `cn`.
- Buat reusable card components.

### Acceptance Criteria

- Komponen bisa dipakai di semua page.
- Tidak ada duplikasi layout section berlebihan.
- Warna dark/light konsisten.

## 5. Phase 3 — Landing Multi-Page

### Pages

- Home `/`
- Features `/features`
- Integrations `/integrations`
- Security `/security`
- Pricing `/pricing`
- About `/about`
- Contact `/contact`

### Home Sections

1. Hero with animated AI orbit.
2. Logo cloud provider AI.
3. Feature bento grid.
4. How it works.
5. Animated graph section.
6. Security vault section.
7. Dashboard preview.
8. Integrations preview.
9. FAQ.
10. CTA.

### Background Rule

Setiap section boleh punya background berbeda, tetapi wajib:

```tsx
<section className="relative isolate overflow-hidden">
  <BackgroundEffect className="absolute inset-0 -z-10" />
  <div className="relative z-10">...</div>
</section>
```

Jangan pakai effect background tanpa wrapper `relative isolate overflow-hidden`, karena nanti background kepotong aneh atau bocor ke section lain.

### Acceptance Criteria

- Landing responsive.
- Animasi smooth.
- Tidak ada horizontal scroll.
- Background setiap section tidak terpotong.
- CTA jelas.
- SEO metadata per page ada.

## 6. Phase 4 — Auth

### Tasks

- Setup Auth.js.
- Setup Prisma Adapter.
- Setup Google provider.
- Setup Credentials provider.
- Setup password hashing.
- Setup `/login`, `/register`, `/error`.
- Setup protected dashboard route.
- Setup session helper.
- Setup middleware/proxy locale + auth protection.

### Acceptance Criteria

- User bisa register manual.
- User bisa login manual.
- User bisa login Google.
- User bisa logout.
- Dashboard tidak bisa diakses tanpa session.
- Error auth tampil manusiawi.

## 7. Phase 5 — Database

### Tasks

- Buat Prisma models:
  - User.
  - Account.
  - Session.
  - VerificationToken.
  - AiProvider.
  - AiConnection.
  - LaunchHistory.
  - UserSettings.
  - AuditLog.
- Buat migration.
- Buat seed AI provider.
- Buat Prisma indexes.

### Acceptance Criteria

- Migration sukses.
- Seed provider sukses.
- Dashboard bisa mengambil provider list.
- Relasi user-connection benar.

## 8. Phase 6 — Dashboard

### Pages

- `/dashboard`
- `/dashboard/tools`
- `/dashboard/accounts`
- `/dashboard/accounts/new`
- `/dashboard/history`
- `/dashboard/security`
- `/dashboard/settings`

### Components

- `DashboardShell`
- `DashboardSidebar`
- `DashboardHeader`
- `StatsCard`
- `ProviderCard`
- `ConnectionCard`
- `AddConnectionForm`
- `LaunchHistoryTable`
- `SecurityStatusCard`
- `LanguageSwitcher`
- `ThemeToggle`

### Acceptance Criteria

- Dashboard usable di desktop dan mobile.
- Card AI connection muncul.
- Empty state jelas.
- Loading skeleton ada.
- Form validasi aman.

## 9. Phase 7 — Connection CRUD

### Tasks

- Buat server action create connection.
- Buat server action update connection.
- Buat server action delete connection.
- Buat query list connections.
- Encrypt secret sebelum disimpan.
- Jangan tampilkan secret asli setelah disimpan.
- Tambahkan `lastLaunchedAt`.

### Acceptance Criteria

- User hanya melihat data miliknya.
- Secret tersimpan terenkripsi.
- Validation error jelas.
- Delete perlu confirmation dialog.

## 10. Phase 8 — Launch Flow

### Launch Types

```ts
type LaunchType =
  | "OFFICIAL_OAUTH"
  | "API_KEY"
  | "DEEPLINK"
  | "MANUAL_SECURE"
  | "EXTERNAL_URL";
```

### Flow

1. User klik connection card.
2. Call `/api/launch/[connectionId]`.
3. Server validasi ownership.
4. Server tulis LaunchHistory.
5. Server return launch strategy.
6. Client redirect/buka modal sesuai strategy.

### Rules

- Jangan inject password ke website pihak ketiga.
- Jangan baca cookie browser.
- Jangan bypass login.
- Kalau provider tidak mendukung auto-login resmi, tampilkan modal:
  - buka website provider
  - tampilkan username/email
  - tombol copy credential hanya jika user verifikasi ulang atau confirm
  - warning keamanan

### Acceptance Criteria

- Launch history tercatat.
- External URL terbuka.
- Ownership aman.
- Tidak ada secret bocor ke console/log.

## 11. Phase 9 — SEO and OG

### Tasks

- Metadata per page.
- Dynamic title template.
- OG image global.
- OG image route/page-specific jika perlu.
- Twitter card metadata.
- Sitemap.
- Robots.
- JSON-LD untuk WebApplication.
- Canonical URL.
- Locale alternates.

### Acceptance Criteria

- `/opengraph-image` render.
- `sitemap.xml` tersedia.
- `robots.txt` tersedia.
- Metadata tidak kosong.

## 12. Phase 10 — Animation and Visual Polish

### Tasks

- Lenis global provider.
- Scroll reveal.
- Animated chart.
- Three.js AI orbit/globe.
- Background beam/grid/particles.
- Hover card animation.
- Dashboard micro interaction.
- Reduced motion support.

### Acceptance Criteria

- Animasi tidak bikin page berat.
- `prefers-reduced-motion` dihormati.
- Mobile tetap ringan.
- Tidak ada layout shift parah.

## 13. Phase 11 — Testing and Quality

### Tasks

- Unit test validators.
- Unit test encryption helper.
- Integration test server actions.
- E2E auth flow.
- E2E connection CRUD.
- E2E launch flow.
- Accessibility check.
- Lighthouse check.

### Acceptance Criteria

- Test utama pass.
- Typecheck pass.
- Lint pass.
- Tidak ada secret di repo.

## 14. Phase 12 — Deployment

### Tasks

- Setup production env.
- Setup PostgreSQL production.
- Run migration.
- Deploy ke Vercel.
- Set Google OAuth redirect URI.
- Set APP_URL production.
- Verify SEO.
- Verify auth.
- Verify database.

### Acceptance Criteria

- Production bisa dibuka.
- Auth Google production jalan.
- Dashboard protected.
- Sitemap dan OG image production jalan.

## 15. Suggested Commands

```bash
pnpm dev
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm prisma migrate dev
pnpm prisma db seed
pnpm prisma studio
```

Tambahkan scripts di `package.json`:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest",
    "db:migrate": "prisma migrate dev",
    "db:push": "prisma db push",
    "db:seed": "tsx prisma/seed.ts",
    "db:studio": "prisma studio"
  }
}
```
