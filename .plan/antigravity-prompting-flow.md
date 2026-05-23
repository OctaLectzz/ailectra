# Ailectra — Antigravity Prompting Flow & Agent Roles

Dokumen ini berisi alur prompting yang disarankan untuk membangun project **Ailectra** di Antigravity. Tujuannya biar agent tidak asal ngoding, tidak lompat-lompat, dan tetap patuh ke dokumen project yang sudah dibuat: PRD, implementation plan, design system, security, database, SEO, i18n, dashboard, dan animation UX.

---

## 1. Cara Pakai di Antigravity

Gunakan alur ini secara bertahap. Jangan langsung kasih satu prompt raksasa lalu berharap hasilnya sempurna. Itu biasanya bikin agent ngaco, struktur berantakan, atau fitur security kelewat.

Urutan paling aman:

1. Kasih context project.
2. Minta agent baca semua dokumen.
3. Minta agent bikin ringkasan pemahaman.
4. Minta agent membuat checklist implementasi.
5. Eksekusi per fase.
6. Review security.
7. Review UI/UX.
8. Test.
9. Refactor.
10. Final build.

---

## 2. Agent yang Digunakan

Di Antigravity, kamu bisa memperlakukan “agent” sebagai role/prompt persona kerja. Kalau Antigravity kamu mendukung multi-agent eksplisit, pakai nama-nama ini. Kalau tidak, tetap pakai sebagai mode prompt bergantian.

### 2.1 Product Planner Agent

Tugas:
- Membaca `prd.md`.
- Memastikan fitur sesuai requirement.
- Memecah fitur menjadi milestone.
- Menjaga scope MVP agar tidak melebar.

Dipakai saat:
- Awal project.
- Menentukan prioritas fitur.
- Saat ada fitur baru.

Prompt singkat:
```txt
Act as the Product Planner Agent for Ailectra. Read prd.md, implementation-plan.md, and roadmap.md. Summarize the product scope, MVP boundaries, user flows, and acceptance criteria. Do not write code yet.
```

---

### 2.2 System Architect Agent

Tugas:
- Membaca `architecture.md`.
- Menentukan struktur folder.
- Menentukan module boundary.
- Menentukan server component/client component split.
- Menjaga agar Next.js full-stack tetap rapi.

Dipakai saat:
- Setup awal.
- Sebelum coding besar.
- Saat struktur mulai kacau.

Prompt singkat:
```txt
Act as the System Architect Agent for Ailectra. Read architecture.md, implementation-plan.md, AGENTS.md, and agent-rules.md. Create the recommended folder structure and explain the responsibility of each folder. Do not implement UI yet.
```

---

### 2.3 Database Agent

Tugas:
- Membaca `database-schema.md`.
- Membuat Prisma schema.
- Membuat migration.
- Membuat seed provider AI.
- Menjamin relasi user dan connection benar.

Dipakai saat:
- Setup Prisma.
- Membuat schema.
- Membuat model baru.
- Men-debug query database.

Prompt singkat:
```txt
Act as the Database Agent for Ailectra. Read database-schema.md and security-auth.md. Implement the Prisma schema, database client, and seed file for AI providers. Use PostgreSQL and Prisma. Make sure all user-owned data has proper relations and indexes.
```

---

### 2.4 Auth & Security Agent

Tugas:
- Setup Auth.js/NextAuth.
- Google OAuth.
- Manual email/password.
- Password hashing.
- Session.
- Route protection.
- Encryption credential vault.
- Audit log.
- Rate limit basic.

Dipakai saat:
- Setup auth.
- Membuat login/register.
- Membuat protected dashboard.
- Membuat fitur credential/token.

Prompt singkat:
```txt
Act as the Auth & Security Agent for Ailectra. Read security-auth.md, database-schema.md, and implementation-plan.md. Implement Auth.js with Google OAuth and manual credentials. Add password hashing, protected dashboard routes, session helpers, and secure rules for credential storage. Never store raw secrets.
```

---

### 2.5 UI/UX Design Agent

Tugas:
- Membaca `design.md`.
- Menerapkan warna, theme, typography.
- Menentukan style component.
- Menjaga desain futuristik tapi tetap nyaman.
- Dark/light mode default dark.

Dipakai saat:
- Setup global CSS.
- Membuat design tokens.
- Membuat komponen layout.
- Review tampilan.

Prompt singkat:
```txt
Act as the UI/UX Design Agent for Ailectra. Read design.md and component-system.md. Implement the design tokens, Tailwind theme variables, typography, dark/light mode styling, and reusable UI primitives. Keep the default theme dark.
```

---

### 2.6 Frontend Landing Agent

Tugas:
- Membuat landing multi-page.
- Membuat Home, Features, Integrations, Security, Pricing, About, Contact.
- Menggunakan shadcn/ui, Aceternity UI, Magic UI, React Bits.
- Membuat CTA, bento grid, hero, FAQ, dashboard preview.

Dipakai saat:
- Build halaman marketing.
- Polishing landing.
- Menambahkan efek visual section.

Prompt singkat:
```txt
Act as the Frontend Landing Agent for Ailectra. Read landing-pages.md, design.md, animation-ux.md, and seo-i18n.md. Build the multi-page marketing site with futuristic sections, responsive layout, reusable components, and section-specific animated backgrounds. Every background effect must be wrapped with relative isolate overflow-hidden.
```

---

### 2.7 Motion & 3D Agent

Tugas:
- Setup Lenis.
- Framer Motion/Motion reveal.
- Three.js / React Three Fiber hero.
- Animated graph.
- Background effects.
- Reduced motion support.

Dipakai saat:
- Membuat animasi landing.
- Membuat AI orbit.
- Membuat graph animasi.
- Optimasi efek agar tidak berat.

Prompt singkat:
```txt
Act as the Motion & 3D Agent for Ailectra. Read animation-ux.md and design.md. Implement Lenis smooth scroll, Motion reveal components, animated graph visuals, and a lightweight Three.js AI orbit for the hero. Respect prefers-reduced-motion and lazy-load heavy canvas components.
```

---

### 2.8 Dashboard Agent

Tugas:
- Membuat dashboard shell.
- Sidebar.
- Overview.
- AI Tools.
- Connected Accounts.
- Add Connection.
- Launch History.
- Security.
- Settings.

Dipakai saat:
- Build fitur setelah login.
- Membuat CRUD AI connection.
- Membuat dashboard cards.

Prompt singkat:
```txt
Act as the Dashboard Agent for Ailectra. Read dashboard-spec.md, component-system.md, api-contracts.md, and implementation-plan.md. Build the protected dashboard pages, sidebar layout, overview cards, provider grid, connected account grid, add connection form, launch history table, and settings page.
```

---

### 2.9 API & Server Actions Agent

Tugas:
- Membuat server actions.
- Membuat route handlers.
- Validasi Zod.
- Ownership check.
- Launch endpoint.
- Error handling.

Dipakai saat:
- Membuat mutation.
- Membuat endpoint `/api/launch/[connectionId]`.
- Menghubungkan form ke database.

Prompt singkat:
```txt
Act as the API & Server Actions Agent for Ailectra. Read api-contracts.md, security-auth.md, and database-schema.md. Implement typed server actions, route handlers, Zod validators, ownership checks, and safe error handling. Never return encryptedSecret or raw secrets unless a reveal flow explicitly requires confirmation.
```

---

### 2.10 SEO & i18n Agent

Tugas:
- Setup next-intl.
- Default English.
- Indonesian support.
- Metadata per page.
- OG image.
- Sitemap.
- Robots.
- JSON-LD.

Dipakai saat:
- Setup multi-language.
- Optimasi SEO.
- Membuat OG image.

Prompt singkat:
```txt
Act as the SEO & i18n Agent for Ailectra. Read seo-i18n.md, landing-pages.md, and design.md. Implement next-intl with English as default and Indonesian support. Add localized metadata, sitemap, robots, JSON-LD, canonical URLs, language alternates, and a futuristic OG image.
```

---

### 2.11 QA & Testing Agent

Tugas:
- Typecheck.
- Lint.
- Unit tests.
- E2E test.
- Accessibility.
- Responsive check.
- Build check.

Dipakai saat:
- Setelah fitur selesai.
- Sebelum final.
- Saat ada bug.

Prompt singkat:
```txt
Act as the QA & Testing Agent for Ailectra. Read testing-quality.md and agent-rules.md. Review the app for TypeScript errors, lint issues, broken flows, accessibility problems, responsive layout issues, auth problems, and unsafe secret handling. Add tests where appropriate.
```

---

### 2.12 Refactor & Cleanup Agent

Tugas:
- Merapikan file.
- Memecah komponen besar.
- Menghapus duplikasi.
- Memastikan reusable component dipakai.
- Menjaga naming convention.

Dipakai saat:
- Setelah fitur besar selesai.
- Sebelum final build.
- Kalau file mulai berantakan.

Prompt singkat:
```txt
Act as the Refactor & Cleanup Agent for Ailectra. Read component-system.md, agent-rules.md, and architecture.md. Refactor large files, remove duplicated UI, extract reusable components, clean imports, and keep the project structure consistent without changing product behavior.
```

---

## 3. Alur Prompting Utama dari Nol Sampai Jadi

### Phase 0 — Project Context Injection

Gunakan prompt ini pertama kali.

```txt
You are working on Ailectra.

Ailectra is a futuristic AI access hub built with Next.js App Router, TypeScript, Prisma, PostgreSQL, Tailwind CSS, shadcn/ui, Auth.js, next-intl, next-themes, Lenis, Motion/Framer Motion, Three.js, Aceternity UI, Magic UI, and React Bits.

Read these files first:
- AGENTS.md
- prd.md
- implementation-plan.md
- design.md
- architecture.md
- database-schema.md
- security-auth.md
- seo-i18n.md
- component-system.md
- landing-pages.md
- dashboard-spec.md
- animation-ux.md
- api-contracts.md
- testing-quality.md
- agent-rules.md

Do not write code yet. First, summarize:
1. product goal,
2. MVP scope,
3. technical stack,
4. folder structure,
5. security constraints,
6. implementation phases.
```

Expected output:
- Agent paham project.
- Belum ngoding.
- Kalau ada salah paham, kamu bisa koreksi dulu.

---

### Phase 1 — Bootstrap Project

Agent yang dipakai:
- System Architect Agent
- UI/UX Design Agent

Prompt:

```txt
Act as the System Architect Agent and UI/UX Design Agent.

Based on implementation-plan.md, architecture.md, design.md, and AGENTS.md, bootstrap the Ailectra project.

Tasks:
1. Ensure the project uses Next.js App Router with TypeScript and src directory.
2. Set up Tailwind CSS.
3. Set up the recommended folder structure.
4. Add shadcn/ui base setup.
5. Add global CSS variables from design.md.
6. Add dark/light theme using next-themes with dark as default.
7. Add base layout providers.
8. Add reusable utility `cn`.
9. Do not implement database/auth yet.

After implementation, report changed files and any setup notes.
```

Acceptance:
```txt
- App runs.
- Dark mode default.
- Light mode switch possible.
- Folder structure exists.
- No TypeScript errors.
```

---

### Phase 2 — i18n Setup

Agent yang dipakai:
- SEO & i18n Agent

Prompt:

```txt
Act as the SEO & i18n Agent.

Read seo-i18n.md, implementation-plan.md, and architecture.md. Implement next-intl with:
- English default locale.
- Indonesian second locale.
- Route structure using /en and /id.
- Translation files for English and Indonesian.
- Language switcher component.
- Localized navigation labels.
- Basic localized metadata helper.

Do not build all landing pages yet. Focus only on i18n foundation.
```

Acceptance:
```txt
- /en works.
- /id works.
- Default locale is English.
- Language switcher works.
- Common navigation text uses translation messages.
```

---

### Phase 3 — Prisma Database

Agent yang dipakai:
- Database Agent

Prompt:

```txt
Act as the Database Agent.

Read database-schema.md, security-auth.md, and implementation-plan.md. Implement Prisma with PostgreSQL.

Tasks:
1. Create prisma/schema.prisma based on database-schema.md.
2. Add Auth.js required models.
3. Add UserSettings, AiProvider, AiConnection, LaunchHistory, and AuditLog.
4. Add enums.
5. Add indexes.
6. Create Prisma client helper in src/db/prisma.ts.
7. Create seed file for initial AI providers:
   - Lovable
   - Claude
   - ChatGPT
   - Gemini
   - Perplexity
   - Cursor
   - V0
   - Bolt
   - Replit AI
   - Grok
   - DeepSeek
8. Add package scripts for migration, seed, and studio.

Do not implement UI yet.
```

Acceptance:
```txt
- Prisma schema valid.
- Migration can run.
- Seed can run.
- Prisma client helper exists.
```

---

### Phase 4 — Authentication

Agent yang dipakai:
- Auth & Security Agent
- API & Server Actions Agent

Prompt:

```txt
Act as the Auth & Security Agent and API & Server Actions Agent.

Read security-auth.md, database-schema.md, architecture.md, and api-contracts.md. Implement authentication for Ailectra.

Tasks:
1. Set up Auth.js / NextAuth.
2. Add Prisma Adapter.
3. Add Google OAuth provider.
4. Add Credentials provider for email/password.
5. Add bcrypt password hashing.
6. Add login page.
7. Add register page.
8. Add auth error page.
9. Add logout flow.
10. Protect /[locale]/dashboard routes.
11. Add session helper.
12. Create default user settings after manual registration if needed.
13. Add safe validation with Zod.

Security rules:
- Never store raw password.
- Never expose passwordHash to client.
- Never log secrets.
```

Acceptance:
```txt
- Manual register works.
- Manual login works.
- Google login prepared.
- Dashboard protected.
- Logout works.
```

---

### Phase 5 — Reusable Components

Agent yang dipakai:
- UI/UX Design Agent
- Refactor & Cleanup Agent

Prompt:

```txt
Act as the UI/UX Design Agent and Refactor & Cleanup Agent.

Read component-system.md and design.md. Build reusable components before building pages.

Create:
- Container
- Section
- SectionHeading
- GradientText
- EmptyState
- ConfirmDialog
- LoadingState
- ErrorState
- ThemeToggle
- LanguageSwitcher
- SiteHeader
- SiteFooter
- MobileNav
- MotionReveal
- Background wrapper components

Rules:
- Use Tailwind tokens.
- Use shadcn/ui where appropriate.
- Keep components typed.
- Keep background wrappers safe using relative isolate overflow-hidden.
```

Acceptance:
```txt
- Components are reusable.
- No duplicated layout code.
- Dark/light styles work.
```

---

### Phase 6 — Landing Pages

Agent yang dipakai:
- Frontend Landing Agent
- Motion & 3D Agent
- SEO & i18n Agent

Prompt:

```txt
Act as the Frontend Landing Agent, Motion & 3D Agent, and SEO & i18n Agent.

Read landing-pages.md, design.md, animation-ux.md, component-system.md, and seo-i18n.md. Build the multi-page landing experience for Ailectra.

Pages:
- /[locale]
- /[locale]/features
- /[locale]/integrations
- /[locale]/security
- /[locale]/pricing
- /[locale]/about
- /[locale]/contact

Home sections:
1. Hero with futuristic AI orbit or animated graph.
2. Provider logo cloud.
3. Feature bento grid.
4. How it works.
5. Animated graph section.
6. Security vault section.
7. Dashboard preview.
8. Integrations preview.
9. FAQ.
10. CTA.

Requirements:
- Use shadcn/ui as base.
- Use Aceternity UI, Magic UI, React Bits, Motion, and Three.js where suitable.
- Use Lenis smooth scroll.
- Every section with background effect must use relative isolate overflow-hidden.
- Use EN/ID translations.
- Add metadata for each page.
- Keep mobile performance acceptable.
```

Acceptance:
```txt
- All landing pages exist.
- Background effects are contained.
- No horizontal overflow.
- SEO metadata exists.
- English and Indonesian text works.
```

---

### Phase 7 — Dashboard Shell

Agent yang dipakai:
- Dashboard Agent
- UI/UX Design Agent

Prompt:

```txt
Act as the Dashboard Agent and UI/UX Design Agent.

Read dashboard-spec.md, component-system.md, design.md, and architecture.md. Build the protected dashboard shell.

Create:
- DashboardShell
- DashboardSidebar
- DashboardHeader
- UserMenu
- Responsive mobile dashboard navigation
- Dashboard overview page

Overview widgets:
- Total connected accounts
- Total providers
- Launches this week
- Security status
- Recent connections
- Recent launch history
- Animated usage chart placeholder

Rules:
- Dashboard must be clean, fast, and less flashy than landing.
- Use subtle motion only.
- Must be responsive.
```

Acceptance:
```txt
- /dashboard works after login.
- Sidebar works.
- Mobile nav works.
- Overview renders.
```

---

### Phase 8 — AI Providers & Connections CRUD

Agent yang dipakai:
- Dashboard Agent
- API & Server Actions Agent
- Database Agent
- Auth & Security Agent

Prompt:

```txt
Act as the Dashboard Agent, API & Server Actions Agent, Database Agent, and Auth & Security Agent.

Read dashboard-spec.md, api-contracts.md, database-schema.md, and security-auth.md. Implement AI provider directory and connected account CRUD.

Tasks:
1. Build AI Tools page with provider grid.
2. Build Connected Accounts page.
3. Build Add Connection page/form.
4. Implement createConnectionAction.
5. Implement updateConnectionAction.
6. Implement deleteConnectionAction.
7. Implement getProviders query.
8. Implement getUserConnections query.
9. Encrypt secret before storing.
10. Never return raw encryptedSecret to client.
11. Add empty states and loading states.

Rules:
- All user-owned data must be filtered by session.user.id.
- Validate inputs with Zod.
- Log audit events for create/update/delete.
```

Acceptance:
```txt
- User can add connection.
- Connection card appears.
- User can edit/delete their own connection.
- Secret is encrypted.
- Another user cannot access the connection.
```

---

### Phase 9 — Launch Flow

Agent yang dipakai:
- API & Server Actions Agent
- Auth & Security Agent
- Dashboard Agent

Prompt:

```txt
Act as the API & Server Actions Agent, Auth & Security Agent, and Dashboard Agent.

Read api-contracts.md, security-auth.md, and dashboard-spec.md. Implement the safe launch flow for connected AI accounts.

Tasks:
1. Create POST /api/launch/[connectionId].
2. Validate session.
3. Validate connection ownership.
4. Determine launch strategy:
   - OFFICIAL_OAUTH
   - API_KEY
   - DEEPLINK
   - MANUAL_SECURE
   - EXTERNAL_URL
5. Create LaunchHistory record.
6. Return safe launch payload.
7. On the client, launch external URL or open secure modal.
8. Add launch button to ConnectionCard.
9. Update lastLaunchedAt.
10. Show toast success/error.

Security rules:
- Do not bypass third-party login.
- Do not inject password into third-party websites.
- Do not use or steal browser cookies.
- Do not expose raw secret by default.
```

Acceptance:
```txt
- Clicking a connection card triggers launch flow.
- Launch history is recorded.
- Unsafe auto-login is not implemented.
- Manual secure flow is shown when needed.
```

---

### Phase 10 — SEO, OG, Sitemap, Robots

Agent yang dipakai:
- SEO & i18n Agent

Prompt:

```txt
Act as the SEO & i18n Agent.

Read seo-i18n.md, landing-pages.md, and design.md. Implement complete SEO for Ailectra.

Tasks:
1. Add metadata for every public page.
2. Add title template.
3. Add localized alternates.
4. Add canonical URLs.
5. Add Open Graph metadata.
6. Add Twitter card metadata.
7. Add /opengraph-image with futuristic visual.
8. Add sitemap.ts.
9. Add robots.ts.
10. Add JSON-LD WebApplication schema.

Rules:
- Dashboard routes must not be indexed.
- Metadata must support EN and ID.
```

Acceptance:
```txt
- OG image renders.
- sitemap.xml works.
- robots.txt works.
- Public pages have metadata.
```

---

### Phase 11 — Animation Polish & Performance

Agent yang dipakai:
- Motion & 3D Agent
- QA & Testing Agent

Prompt:

```txt
Act as the Motion & 3D Agent and QA & Testing Agent.

Read animation-ux.md, design.md, and testing-quality.md. Polish animations and performance.

Tasks:
1. Add Lenis smooth scroll provider.
2. Add section reveal animations.
3. Add animated graph.
4. Add hero AI orbit if not done.
5. Add hover/tap micro-interactions.
6. Add reduced motion support.
7. Lazy-load heavy Three.js components.
8. Check mobile performance.
9. Fix horizontal overflow.
10. Make sure all animated backgrounds are contained.

Do not add heavy effects to dashboard unless subtle.
```

Acceptance:
```txt
- Landing feels smooth.
- Reduced motion respected.
- No broken mobile layout.
- No heavy canvas everywhere.
```

---

### Phase 12 — Testing, Security Review, Final Refactor

Agent yang dipakai:
- QA & Testing Agent
- Auth & Security Agent
- Refactor & Cleanup Agent

Prompt:

```txt
Act as the QA & Testing Agent, Auth & Security Agent, and Refactor & Cleanup Agent.

Read testing-quality.md, security-auth.md, agent-rules.md, and component-system.md. Perform final review.

Tasks:
1. Run or prepare fixes for typecheck.
2. Run or prepare fixes for lint.
3. Check build errors.
4. Check auth flow.
5. Check protected routes.
6. Check connection CRUD.
7. Check launch flow.
8. Check encrypted secret handling.
9. Check user ownership rules.
10. Check responsive layout.
11. Check i18n.
12. Check dark/light mode.
13. Refactor duplicated components.
14. Split oversized files.
15. Remove unused imports and dead code.

Final output:
- List completed checks.
- List changed files.
- List remaining risks.
```

Acceptance:
```txt
- App builds.
- No major security issue.
- No obvious broken UX.
- Code structure still clean.
```

---

## 4. Prompt Super Lengkap untuk Start Project

Kalau kamu mau langsung lempar prompt awal ke Antigravity, pakai ini.

```txt
You are the lead coding agent for Ailectra.

Project:
Ailectra is a futuristic AI access hub. Users can sign in, view a dashboard, add AI providers such as Lovable, Claude, ChatGPT, Gemini, Perplexity, Cursor, V0, Bolt, Replit AI, Grok, and DeepSeek, connect multiple accounts per AI provider, and launch the correct AI account through a safe launch flow.

Tech stack:
- Next.js App Router for frontend and backend
- TypeScript
- Prisma ORM
- PostgreSQL
- Tailwind CSS
- shadcn/ui
- Aceternity UI
- Magic UI
- React Bits
- Framer Motion / Motion
- Three.js / React Three Fiber
- Lenis
- Auth.js / NextAuth
- next-intl
- next-themes
- Zod

Default:
- Theme: dark
- Language: English
- Supported languages: English and Indonesian

Read these files first:
- AGENTS.md
- prd.md
- implementation-plan.md
- design.md
- architecture.md
- database-schema.md
- security-auth.md
- seo-i18n.md
- component-system.md
- landing-pages.md
- dashboard-spec.md
- animation-ux.md
- api-contracts.md
- testing-quality.md
- agent-rules.md

Important security rules:
- Do not bypass third-party AI login.
- Do not steal or reuse browser cookies.
- Do not inject credentials into third-party login pages.
- Do not store raw secrets.
- Use official OAuth/API/deep-link/manual secure flow only.
- Encrypt sensitive credentials before storing.
- Check user ownership for all user-owned data.

First task:
Do not write code yet. Summarize your understanding of the project, MVP scope, stack, folder structure, implementation phases, and risks. Then propose the first 10 concrete coding tasks in order.
```

---

## 5. Prompt Setelah Agent Paham Context

Setelah agent memberi ringkasan yang benar, lanjutkan dengan:

```txt
Good. Now start Phase 1 only.

Implement the foundation:
1. Next.js App Router structure.
2. TypeScript strict setup.
3. Tailwind CSS setup.
4. shadcn/ui base setup.
5. global CSS variables from design.md.
6. dark/light mode with default dark using next-themes.
7. base providers.
8. utility `cn`.
9. recommended folder structure.

Do not implement auth, database, landing pages, or dashboard yet.

After finishing, report:
- changed files,
- commands needed,
- any assumptions,
- next recommended phase.
```

---

## 6. Prompt untuk Menjaga Agent Tidak Ngaco

Pakai prompt ini setiap agent mulai keluar jalur.

```txt
Stop and realign with the Ailectra docs.

Rules:
- Follow AGENTS.md and agent-rules.md.
- Do not invent new stack.
- Do not replace Prisma with another ORM.
- Do not remove i18n.
- Do not remove dark/light theme.
- Do not bypass third-party login.
- Keep components reusable.
- Keep files small and organized.
- Use TypeScript and Zod validation.
- Use Tailwind design tokens from design.md.
- Use English as default language and Indonesian as second language.

Now explain what you were about to do and adjust it to match the documentation.
```

---

## 7. Prompt untuk Review Hasil Coding

```txt
Review the current implementation against the Ailectra documentation.

Check:
1. Does it match prd.md?
2. Does it follow implementation-plan.md?
3. Does it follow design.md?
4. Does it follow architecture.md?
5. Does it follow security-auth.md?
6. Does it follow database-schema.md?
7. Does it follow seo-i18n.md?
8. Does it follow component-system.md?
9. Are there security issues?
10. Are there duplicated components?
11. Are there missing translations?
12. Are there responsive layout issues?

Return:
- Passed checks
- Failed checks
- Required fixes
- Suggested next tasks
```

---

## 8. Prompt untuk Debug Error

```txt
Act as the Debugging Agent for Ailectra.

I got this error:

[paste error here]

Context:
- This project uses Next.js App Router, TypeScript, Prisma, Auth.js, next-intl, next-themes, Tailwind, shadcn/ui.
- Follow AGENTS.md and agent-rules.md.
- Do not rewrite unrelated files.
- Do not change the architecture unless necessary.

Task:
1. Explain the cause.
2. Identify the exact files likely involved.
3. Apply the smallest safe fix.
4. Make sure the fix does not break i18n, auth, theme, or Prisma.
5. Report changed files.
```

---

## 9. Prompt untuk Generate Komponen Baru

```txt
Act as the UI/UX Design Agent for Ailectra.

Create a reusable component named [ComponentName].

Requirements:
- TypeScript.
- Tailwind CSS.
- shadcn/ui compatible.
- Uses design tokens from design.md.
- Supports dark and light mode.
- Responsive.
- Accessible.
- No hardcoded random colors.
- If animated, respect prefers-reduced-motion.
- Put it in the correct folder based on component-system.md.

Component purpose:
[describe component purpose]

Return:
- component file,
- usage example,
- any required dependencies.
```

---

## 10. Prompt untuk Membuat Halaman Baru

```txt
Act as the Frontend Landing Agent or Dashboard Agent, depending on the route.

Create page:
[route]

Read:
- architecture.md
- component-system.md
- design.md
- seo-i18n.md
- relevant spec file

Requirements:
- Use App Router.
- Use TypeScript.
- Use translations EN/ID.
- Add metadata if public page.
- Use reusable components.
- Responsive.
- Dark/light compatible.
- If public landing section uses background effect, wrap with relative isolate overflow-hidden.

Do not duplicate existing components.
```

---

## 11. Pembagian Agent per Fase

| Phase | Agent Utama | Agent Pendukung |
|---|---|---|
| Context Injection | Product Planner | System Architect |
| Bootstrap | System Architect | UI/UX Design |
| Theme & Design Tokens | UI/UX Design | Refactor |
| i18n | SEO & i18n | UI/UX Design |
| Prisma | Database | Auth & Security |
| Auth | Auth & Security | API & Server Actions |
| Landing | Frontend Landing | Motion & 3D, SEO & i18n |
| Dashboard Shell | Dashboard | UI/UX Design |
| Connection CRUD | Dashboard | API, Database, Security |
| Launch Flow | API | Security, Dashboard |
| SEO/OG | SEO & i18n | UI/UX Design |
| Animation Polish | Motion & 3D | QA |
| Testing | QA | Security |
| Refactor | Refactor | System Architect |

---

## 12. Urutan Prompt yang Paling Direkomendasikan

Gunakan urutan ini kalau kamu ingin hasilnya paling rapi:

1. Context Injection.
2. Product Planner summary.
3. System Architect folder structure.
4. Bootstrap foundation.
5. UI/UX design tokens.
6. i18n setup.
7. Prisma schema and seed.
8. Auth setup.
9. Reusable components.
10. Landing pages.
11. Dashboard shell.
12. Provider directory.
13. Connected accounts CRUD.
14. Launch flow.
15. SEO/OG.
16. Animation polish.
17. QA/security review.
18. Refactor.
19. Final build.

---

## 13. Catatan Penting

Bagian paling rawan dari project ini adalah fitur “auto login ke AI provider”. Jangan suruh agent membuat sistem yang membajak session, cookie, atau bypass login pihak ketiga. Itu bahaya dan bisa melanggar aturan platform.

Gunakan istilah yang aman:

- Safe launch flow.
- Official OAuth.
- API key.
- Deep link.
- External URL.
- Manual secure vault.
- Credential reveal with confirmation.

Jangan pakai istilah:

- bypass login.
- cookie injection.
- session stealing.
- auto-fill hidden login.
- bypass 2FA.
- CAPTCHA bypass.

---

## 14. Final Master Prompt untuk Build Bertahap

```txt
You are the lead multi-role Antigravity agent for Ailectra.

Operate using these roles when needed:
- Product Planner Agent
- System Architect Agent
- Database Agent
- Auth & Security Agent
- UI/UX Design Agent
- Frontend Landing Agent
- Motion & 3D Agent
- Dashboard Agent
- API & Server Actions Agent
- SEO & i18n Agent
- QA & Testing Agent
- Refactor & Cleanup Agent

Always follow:
- AGENTS.md
- prd.md
- implementation-plan.md
- design.md
- architecture.md
- database-schema.md
- security-auth.md
- seo-i18n.md
- component-system.md
- landing-pages.md
- dashboard-spec.md
- animation-ux.md
- api-contracts.md
- testing-quality.md
- agent-rules.md

Build the project phase by phase. Before each phase:
1. state the active agent role,
2. list the files you will read,
3. list the tasks,
4. list acceptance criteria.

After each phase:
1. report changed files,
2. report what works,
3. report what remains,
4. report risks.

Never bypass third-party AI login. Never store raw secrets. Always use TypeScript, Prisma, Tailwind, shadcn/ui, next-intl, next-themes, and the documented architecture.
```
