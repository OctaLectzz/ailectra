# Ailectra — One Access for Every AI

**Ailectra** is a visually premium, high-performance, and futuristic **AI Account Access Hub**. It provides developers, creators, and power users with a unified, secure dashboard to organize, manage, and launch their various AI accounts and connections under one unified console.

---

## 🚀 Key Features

*   **Visually Stunning Landing Experience:** A multi-page, high-wow marketing section featuring smooth Lenis scrolling, glassmorphism UI, elegant gradients, and premium interactive Three.js 3D orbits.
*   **Unified Account Dashboard:** A clean, lightning-fast console interface built with responsiveness and accessibility (mobile-first design).
*   **Pre-Configured AI Provider Directory:** A catalog supporting 11 native AI tools (Lovable, Claude, ChatGPT, Gemini, Perplexity, Cursor, V0, Bolt, Replit AI, Grok, DeepSeek) categorized and styled with brand colors.
*   **Secure Connection Vault:** CRUD interface for connection metadata. Encrypted Secret management utilizes strong server-side `AES-256-GCM` encryption. Plain-text secrets never enter the database or logs.
*   **Safe Launch Flow:** Connection card redirection and copy-credentials workflow designed to respect third-party platform Terms of Service (no browser session hijacking, no password scraping).
*   **Robust Session Management:** Auth.js (NextAuth) authentication supporting secure manual email/password verification (bcrypt hashing) alongside official Google OAuth.
*   **Full Locale Support (i18n):** Language localization for both English (`en`) and Indonesian (`id`) natively driven by dynamic App Router routing.

---

## 🛠️ The Tech Stack

| Domain | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript (Strict) |
| **Database** | PostgreSQL |
| **ORM** | Prisma 7.x |
| **Authentication** | Auth.js (NextAuth) |
| **Driver Adapter** | `@prisma/adapter-pg` + `pg` driver pooling |
| **Styling** | Tailwind CSS v4 |
| **Component Base** | shadcn/ui |
| **Animations** | Motion / Framer Motion |
| **Smooth Scrolling** | Lenis Scroll |
| **WebGL Graphics** | Three.js + `@react-three/fiber` |
| **Validations** | Zod |

---

## 📁 Repository Structure

The project conforms to a clean, decoupled modular architecture:

```txt
src/
├── app/                      # Next.js App Router folders
│   ├── [locale]/             # Dynamic routing for localization (en/id)
│   │   ├── (marketing)/      # Public pages (/, /features, /integrations, /pricing)
│   │   ├── (auth)/           # Authentication layout and forms (Login, Register)
│   │   └── (dashboard)/      # Protected workspace console
│   └── api/                  # REST API Route Handlers (Auth callbacks, Launch hooks)
│
├── components/               # Pure UI and reusable visual assets
│   ├── ui/                   # Direct shadcn/ui library primitives
│   ├── common/               # Global atomic widgets (buttons, input wraps)
│   ├── layout/               # Header headers, dashboard sidebars, overlays
│   ├── effects/              # Animation backdrops and particle vectors
│   ├── three/                # 3D canvasses (spherical orbits)
│   └── providers/            # Theme, Locale, and Smooth Scroll context wraps
│
├── config/                   # Global configuration configurations (site, navigation maps)
├── db/                       # prisma.ts database client instance
├── features/                 # Modular, domain-specific logic structures
│   ├── auth/                 # Validators and hooks relating to security
│   ├── accounts/             # Forms and connection dashboard modules
│   └── launch/               # Trigger hooks and strategical routing parameters
│
├── i18n/                     # next-intl configuration and JSON translation message catalogs
├── lib/                      # Pure, framework-agnostic helper functions (crypto vaults)
├── server/                   # Clean separation of Server Actions (write) and Queries (read)
└── styles/                   # globals.css styling configurations
```

---

## ⚙️ Prisma 7 Database Configuration

This project is built using the new, highly optimized **Prisma 7** architecture, which transitions the database engine to native JavaScript driver adapters for serverless scalability.

1.  **No Direct Schema URLs:** The traditional `url = env(...)` is removed from `prisma/schema.prisma` to keep it environment-neutral.
2.  **`prisma.config.ts` Configuration:** Database connection strings, migrations paths, and config blocks are managed via `prisma.config.ts` using the new `defineConfig` API.
3.  **Driver Adapter Pool:** The Prisma client (`src/db/prisma.ts`) instantiates via the explicit `@prisma/adapter-pg` driver and standard PostgreSQL `Pool` to prevent hot-reloading socket leaks in local development.

---

## 🏁 Quick Start

### 1. Prerequisite Installations
Ensure you have **Node.js** (v20+ recommended) installed.

### 2. Dependency Installations
Run the installation in the project root:
```bash
npm install
```

### 3. Local Environment Set Up
Create a `.env` file at the root. You can copy the variables from `.agents/env.example`:
```env
# Server
APP_URL="http://localhost:3000"
NODE_ENV="development"

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ailectra"

# Authentication
AUTH_SECRET="your-32-character-secret"
AUTH_GOOGLE_ID="your-google-oauth-client-id"
AUTH_GOOGLE_SECRET="your-google-oauth-client-secret"

# Cryptological Encryption
ENCRYPTION_KEY="your-32-byte-base64-key"
```

### 4. Database Setup & Seeding
Perform client compilation, migrations, and seed initial AI Providers catalog:
```bash
# Generate Client bindings
npx prisma generate

# Create and apply migrations
npm run db:migrate

# Seed database with AI Providers catalog
npm run db:seed
```

### 5. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the Ailectra application!

---

## 🛡️ Coding Guidelines & Rules

To ensure type-safety, maintainability, and clean code:
1.  **Strict Type Safety:** Always run `npm run typecheck` to verify zero compiler warnings before proposing branches.
2.  **Encrypted Secrets Vault:** Never store plain-text secrets in the database. Use our server-side `AES-256-GCM` encryption algorithms.
3.  **Separate Server Concerns:** Keep read operations in `server/queries/` and write mutations in `server/actions/`. Never expose `encryptedSecret` in query outputs.
4.  **Aesthetic Boundary Rules:** Every animated background overlay must reside inside a `relative isolate overflow-hidden` wrapper to prevent canvas leaks or page alignment shifts.
