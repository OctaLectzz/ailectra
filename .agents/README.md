# Ailectra — Antigravity Agent Pack

Paket ini berisi dokumen perencanaan lengkap untuk membangun **Ailectra**, website futuristik untuk mengelola akses beberapa AI dan beberapa akun AI dalam satu dashboard.

## Ringkasan Produk

**Ailectra** adalah AI access hub. User bisa login ke platform, melihat dashboard, menambahkan koneksi akun AI seperti Lovable, Claude, ChatGPT, Gemini, Perplexity, Cursor, Bolt, V0, Replit AI, dan lainnya. Koneksi ditampilkan sebagai card. Saat card diklik, sistem menjalankan launch flow yang aman: OAuth resmi, API key resmi, deep link, atau secure credential vault dengan persetujuan user.

> Batas aman: jangan membajak cookie, mengambil session browser, bypass login, atau melakukan auto-login ilegal ke platform pihak ketiga. Kalau provider tidak menyediakan OAuth/API/deep-link resmi, tampilkan secure launch modal dan biarkan user menyelesaikan login secara manual.

## Isi File

- `prd.md` — Product Requirements Document.
- `implementation-plan.md` — rencana implementasi teknis bertahap.
- `design.md` — design system, warna, typography, background, motion, UI direction.
- `task-instruction.md` — instruksi utama untuk agent.
- `task-intruction.md` — alias typo sesuai request, mengarah ke instruksi utama.
- `architecture.md` — arsitektur Next.js full-stack.
- `database-schema.md` — schema Prisma dan model data.
- `security-auth.md` — authentication, credential vault, encryption, launch safety.
- `seo-i18n.md` — SEO, OG image, sitemap, robots, i18n EN/ID.
- `component-system.md` — reusable components dan komposisi UI.
- `landing-pages.md` — rancangan multi-page landing.
- `dashboard-spec.md` — rancangan dashboard setelah login.
- `animation-ux.md` — Lenis, Framer Motion, Three.js, background effects.
- `api-contracts.md` — route handler, server action, dan contract API.
- `testing-quality.md` — testing, linting, accessibility, performance.
- `roadmap.md` — milestone MVP sampai advanced.
- `agent-rules.md` — coding rules untuk agent.
- `AGENTS.md` — instruksi root untuk coding agents.
- `.antigravity/rules/global.md` — rule global Antigravity.
- `.antigravity/workflows/feature-build.md` — workflow build fitur.
- `.antigravity/workflows/security-review.md` — workflow review keamanan.
- `.antigravity/skills/nextjs-fullstack-skill.md` — skill ringkas Next.js full-stack.

## Keputusan Teknis Utama

- Framework: Next.js App Router.
- Bahasa: TypeScript.
- Styling: Tailwind CSS.
- ORM default: Prisma.
- Database default: PostgreSQL.
- Auth: Auth.js/NextAuth dengan Google OAuth dan Credentials.
- UI: shadcn/ui sebagai base, ditambah Aceternity UI, Magic UI, React Bits, Motion/Framer Motion, Three.js, React Three Fiber.
- Theme: dark/light, default dark.
- Language: English dan Indonesian, default English.
- Smooth scroll: Lenis.
- SEO: metadata per route, sitemap, robots, OG image.
