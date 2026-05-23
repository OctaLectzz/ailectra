# Task Instruction for Antigravity Agents — Ailectra

## 1. Role

Kamu adalah coding agent yang membangun website full-stack **Ailectra** menggunakan Next.js, TypeScript, Prisma, Tailwind CSS, shadcn/ui, dan library animasi modern.

Bangun dengan kualitas production-minded, bukan sekadar tampilan demo.

## 2. Primary Objective

Implementasikan aplikasi **Ailectra** sesuai dokumen:

1. `prd.md`
2. `implementation-plan.md`
3. `design.md`
4. `architecture.md`
5. `database-schema.md`
6. `security-auth.md`
7. `seo-i18n.md`
8. `component-system.md`
9. `landing-pages.md`
10. `dashboard-spec.md`
11. `animation-ux.md`

## 3. Mandatory Tech Stack

Wajib:

- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- Prisma ORM.
- PostgreSQL.
- Auth.js / NextAuth.
- shadcn/ui.
- next-themes.
- next-intl.
- Lenis.
- Framer Motion / Motion.
- Three.js / React Three Fiber.
- Zod.

Boleh pakai:
- Aceternity UI.
- Magic UI.
- React Bits.
- Recharts.
- Zustand jika state global benar-benar dibutuhkan.
- Sonner untuk toast.

Jangan:
- Menggunakan JavaScript plain untuk file app utama.
- Mengabaikan type-safety.
- Membuat komponen terlalu besar.
- Menaruh semua logic di page component.
- Menyimpan secret mentah.
- Membypass login pihak ketiga.

## 4. Brand and Product Name

Gunakan nama:

```txt
Ailectra
```

Tagline:

```txt
One Access for Every AI
```

Jangan gunakan nama lama seperti AIXess atau Octalectzz untuk UI utama kecuali user meminta.

## 5. Language Requirement

Default language: English.

Supported languages:
- English (`en`)
- Indonesian (`id`)

Semua teks UI penting harus masuk translation messages.

Contoh:

```txt
/en
/id
/en/features
/id/features
/en/dashboard
/id/dashboard
```

## 6. Theme Requirement

Default theme: dark.

Harus tersedia:
- Dark.
- Light.
- System optional.

Gunakan next-themes dan Tailwind class strategy.

## 7. UI Requirement

Landing harus modern, futuristik, kontemporer, animated, dan nyaman dipakai.

Dashboard harus:
- Clean.
- Fast.
- Tidak terlalu ramai.
- Mobile responsive.
- Aman untuk data sensitif.

## 8. Background Effects Rule

Setiap section landing yang memakai efek background wajib:

```tsx
<section className="relative isolate overflow-hidden">
  <BackgroundEffect className="absolute inset-0 -z-10" />
  <div className="relative z-10">
    {children}
  </div>
</section>
```

Jangan membuat background effect absolute tanpa parent `relative isolate overflow-hidden`.

## 9. File Organization Rule

Pakai pola:

```txt
components/     reusable UI
features/       domain-specific modules
server/         actions and queries
lib/            utilities
config/         static configuration
db/             prisma client
i18n/           localization
```

Kalau file lebih dari 250 baris, pertimbangkan split.

## 10. Security Rule

Fitur launch AI account harus aman.

Dilarang:
- Mengambil cookie browser.
- Menyimpan session platform AI pihak ketiga.
- Inject password otomatis ke website pihak ketiga.
- Bypass CAPTCHA/2FA/login.
- Menampilkan secret di console/log.
- Menyimpan token/password plaintext.

Diizinkan:
- OAuth resmi.
- API key resmi.
- Deep link resmi.
- Secure vault terenkripsi dengan user consent.
- Manual credential reveal dengan confirmation.

## 11. Implementation Order

Ikuti urutan:

1. Bootstrap project.
2. Setup Tailwind, shadcn, theme.
3. Setup i18n.
4. Setup Prisma.
5. Setup Auth.
6. Build base layout.
7. Build landing pages.
8. Build dashboard shell.
9. Build provider directory.
10. Build connection CRUD.
11. Build launch flow.
12. Add SEO/OG.
13. Add animation polish.
14. Add testing and QA.

## 12. Acceptance Before Marking Done

Sebelum menandai task selesai:

- `pnpm typecheck` pass.
- `pnpm lint` pass.
- `pnpm build` pass jika memungkinkan.
- Tidak ada hardcoded secret.
- Tidak ada console log sensitif.
- UI responsive.
- Dark/light checked.
- English/Indonesian checked.
- Protected route checked.

## 13. Communication Format

Saat menyelesaikan task, tulis ringkas:

```txt
Done:
- item 1
- item 2

Changed files:
- path/file.tsx
- path/file.ts

Notes:
- risk/limitation if any
```

## 14. Coding Style

- Prefer server components by default.
- Client components hanya jika perlu interactivity.
- Gunakan Zod untuk validasi input.
- Gunakan server action untuk mutation sederhana.
- Gunakan route handler untuk endpoint launch atau webhook.
- Gunakan `cn()` untuk className merge.
- Jangan copy-paste komponen besar tanpa menyesuaikan style token.
