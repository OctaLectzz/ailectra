# PRD — Ailectra

## 1. Product Overview

**Ailectra** adalah platform web futuristik untuk mengelola banyak AI tools dan banyak akun AI dalam satu dashboard. Produk ini berfungsi sebagai **AI Access Hub**: user login ke Ailectra, menambahkan koneksi akun AI, lalu membuka akun/tool tertentu dari card yang sudah tersimpan.

Produk harus terasa modern, kontemporer, futuristik, visual, tetapi tetap nyaman dipakai. Jangan sampai landing page keren tapi dashboard berat, lambat, dan bikin user capek.

## 2. Product Vision

Membuat satu tempat yang rapi, aman, dan visually impressive untuk mengakses semua AI tools user.

Tagline kerja:

> **Ailectra — One Access for Every AI**

## 3. Problem Statement

User yang aktif memakai AI biasanya punya banyak akun dan tools:

- Lovable untuk app builder.
- Claude untuk reasoning dan writing.
- ChatGPT untuk general AI.
- Gemini untuk Google ecosystem.
- Perplexity untuk research.
- Cursor, V0, Bolt, Replit AI untuk coding.

Masalahnya, akun tersebar, kredensial susah diatur, dan switching antar layanan terasa tidak efisien.

## 4. Goals

### Product Goals

- Menyediakan landing page multi-page yang futuristik dan animatif.
- Menyediakan authentication Google OAuth dan manual email/password.
- Menyediakan dashboard setelah login.
- Menyediakan fitur daftar AI tools.
- Menyediakan fitur tambah koneksi akun AI.
- Menampilkan koneksi sebagai card.
- Menyediakan launch flow yang aman saat card diklik.
- Menyediakan dark/light mode, default dark.
- Menyediakan multi-language English dan Indonesian, default English.
- Menyediakan SEO lengkap dan OG image.
- Menyediakan struktur folder dan reusable components yang rapi.

### Technical Goals

- Full-stack menggunakan Next.js.
- TypeScript strict.
- Prisma ORM dengan PostgreSQL.
- Tailwind CSS token-based theme.
- shadcn/ui sebagai base UI.
- Aceternity UI, Magic UI, React Bits, Motion/Framer Motion, Three.js untuk landing dan visual.
- Lenis untuk smooth scrolling.
- App Router dengan route groups.
- Server Actions dan Route Handlers seperlunya.
- Validasi data dengan Zod.
- Security-first untuk credential vault.

## 5. Non-Goals

Versi awal tidak membuat:

- Browser extension.
- Auto-login ilegal ke website pihak ketiga.
- Cookie/session hijacking.
- Password sharing tanpa enkripsi.
- Enterprise SSO.
- Team workspace kompleks.
- Payment production-ready.

## 6. Target Users

### Primary

AI power user, developer, freelancer, mahasiswa, dan kreator yang memakai banyak AI tools.

### Secondary

Tim kecil yang ingin mengelola daftar AI tools dan akses secara lebih terstruktur.

## 7. User Personas

### Persona A — Developer/Freelancer

- Memakai Cursor, Claude, Lovable, ChatGPT, V0.
- Punya beberapa akun untuk project berbeda.
- Butuh akses cepat dan catatan akun.
- Peduli keamanan.

### Persona B — Student/Creator

- Memakai beberapa AI gratis/berbayar.
- Butuh dashboard simpel.
- Suka tampilan visual, futuristik, dan smooth.

### Persona C — AI Power User

- Punya banyak akun AI.
- Ingin switch cepat.
- Ingin tahu akun mana yang terakhir dipakai.

## 8. Core Flow

### 8.1 Public Flow

1. User membuka `/`.
2. User melihat hero futuristik, animasi, value proposition.
3. User pindah ke `/features`, `/integrations`, `/security`, `/pricing`, `/about`.
4. User klik CTA.
5. User masuk ke `/login` atau `/register`.

### 8.2 Auth Flow

1. User memilih login Google atau manual.
2. Untuk Google: OAuth login melalui Auth.js.
3. Untuk manual: email/password diverifikasi.
4. Setelah sukses, user diarahkan ke `/dashboard`.
5. User baru diarahkan ke onboarding singkat.

### 8.3 Dashboard Flow

1. User melihat overview.
2. User membuka menu AI Tools.
3. User memilih provider, misalnya Lovable.
4. User menambahkan connected account.
5. Sistem menyimpan metadata akun dan credential/token terenkripsi jika ada.
6. Connected account muncul sebagai card.
7. User klik card.
8. Sistem membuka launch flow aman:
   - OAuth resmi jika provider mendukung.
   - API key resmi jika provider berbasis API.
   - Deep-link/url resmi jika provider mendukung.
   - Manual secure modal jika provider tidak mendukung auto-login.

## 9. Feature Requirements

### 9.1 Landing Page

Landing harus multi-page:

- `/`
- `/features`
- `/integrations`
- `/security`
- `/pricing`
- `/about`
- `/contact`

Setiap page wajib punya:
- Title.
- Description.
- Canonical.
- Open Graph metadata.
- Alternates language EN/ID.
- CTA section.
- Responsive layout.
- Dark/light compatibility.

### 9.2 Authentication

Wajib:

- Google OAuth.
- Manual email/password.
- Password hashing.
- Session.
- Protected routes.
- Logout.
- Error page.
- Forgot password placeholder.

Direkomendasikan:
- Auth.js.
- Prisma Adapter.
- Zod validation.
- Rate limiting login.

### 9.3 Dashboard

Menu wajib:

- Overview.
- AI Tools.
- Connected Accounts.
- Add Connection.
- Launch History.
- Security.
- Settings.
- Help.

### 9.4 AI Provider Directory

Provider awal:

- Lovable.
- Claude.
- ChatGPT.
- Gemini.
- Perplexity.
- Cursor.
- V0.
- Bolt.
- Replit AI.
- Grok.
- DeepSeek.

Setiap provider punya:
- name.
- slug.
- description.
- logoUrl/icon.
- category.
- websiteUrl.
- authMethods.
- launchType.
- status.
- isFeatured.

### 9.5 Connected Account

Field minimal:

- label.
- provider.
- accountEmail atau username.
- authType.
- encryptedSecret opsional.
- notes opsional.
- color/icon preference.
- lastLaunchedAt.
- createdAt.
- updatedAt.

### 9.6 Launch History

Setiap card diklik:
- Buat record launch history.
- Simpan provider, connected account, waktu, status, IP hash opsional.
- Jangan simpan secret mentah.

### 9.7 Settings

- Theme: system/light/dark, default dark.
- Language: EN/ID, default EN.
- Profile.
- Security.
- Data export placeholder.
- Delete account placeholder.

## 10. UX Requirements

- Futuristic tapi tetap readable.
- Jangan overload animasi di dashboard.
- Landing boleh rich animation.
- Dashboard harus cepat dan clean.
- Semua interactive state harus jelas.
- Semua form punya error message.
- Mobile first.
- Accessibility minimal WCAG-friendly.

## 11. Success Metrics

MVP dianggap berhasil jika:

- User bisa register/login.
- User bisa tambah AI provider connection.
- Card muncul di dashboard.
- User bisa launch provider dari card.
- Theme dan language bekerja.
- SEO dasar lengkap.
- Lighthouse performance tidak jeblok.
- Tidak ada secret yang tersimpan plain text.

## 12. Risks

- Beberapa AI provider tidak menyediakan OAuth resmi.
- Auto-login lintas platform bisa melanggar ToS jika dilakukan sembarangan.
- Animasi berat bisa membuat performa turun.
- Credential vault perlu implementasi serius.
- Multi-language bisa bikin route dan metadata lebih rumit.

## 13. MVP Scope

MVP fokus:

- Landing multi-page.
- Auth.
- Dashboard.
- Provider directory.
- Connected account CRUD.
- Launch flow safe.
- Theme.
- Language.
- SEO/OG.
- Basic audit logs.
