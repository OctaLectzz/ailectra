# Ailectra System Architecture & Directory Responsibilities

This document outlines the directory structure established for the **Ailectra** codebase. It specifies the distinct responsibilities of each module, ensuring strict separation of concerns, high maintainability, and clean boundaries between components, server actions, and features.

---

## 1. Directory Tree Overview

Below is the directory mapping created under the `src/` root directory to fulfill the requirements of `architecture.md`, `implementation-plan.md`, and `agent-rules.md`.

```txt
src/
├── app/                      # Next.js App Router root
│   ├── [locale]/             # Dynamic routing for multi-language layouts (en/id)
│   │   ├── (marketing)/      # Marketing/landing pages (Home, Features, Pricing, About)
│   │   ├── (auth)/           # Authentication layout and route pages (Login, Register, Error)
│   │   └── (dashboard)/      # Protected customer-facing workspace routes
│   │       └── dashboard/    # Main console panel, credentials connections, launching metrics
│   ├── api/                  # Server-side route handler endpoints (launch payload, auth callbacks)
│   │   ├── auth/             # Credentials & provider integration pipeline
│   │   └── launch/           # Session auditing and redirection routing
│   └── favicon.ico, layout.tsx, not-found.tsx, opengraph-image.tsx...
│
├── components/               # Pure UI and reusable visual component units
│   ├── ui/                   # Direct shadcn/ui components
│   ├── common/               # Base system-wide common assets (buttons, inputs)
│   ├── layout/               # Header, footers, sidebars, mobile shell wrapping
│   ├── marketing/            # Marketing features (features grids, pricing widgets)
│   ├── dashboard/            # Overview panels, cards, list tables
│   ├── auth/                 # Sign-in grids, security warnings, recovery panels
│   ├── forms/                # Reusable React Hook Form configurations
│   ├── effects/              # Custom animations and background isolation elements
│   ├── charts/               # Recharts/Tremor visual reporting elements
│   ├── three/                # High-aesthetic interactive Three.js orbits & canvases
│   └── providers/            # React Context elements (next-themes, next-intl, Lenis scroll)
│
├── config/                   # Site-wide variables and metadata definitions
├── db/                       # Database client instance wrappers and seeding scripts
│
├── features/                 # Modular, domain-specific logic structures
│   ├── auth/                 # Validators, actions, hooks relating to security
│   ├── accounts/             # Connection metadata creation, state, components
│   ├── providers/            # Directory listings and custom parameters mapping
│   ├── launch/               # Trigger hooks, strategy resolution logic
│   ├── settings/             # Themes, profiles, customization options
│   └── i18n/                 # Localization providers and messaging mappings
│
├── i18n/                     # next-intl configuration, translation catalogs
│   ├── messages/             # JSON dictionaries (en.json, id.json)
│   ├── request.ts            # Server-side next-intl setup config
│   └── routing.ts            # Locale patterns routing rules
│
├── lib/                      # Pure, framework-agnostic helper functions & security vaults
│
├── server/                   # Clean server actions and secure prisma query abstractions
│   ├── actions/              # Input validation and database mutations (write operations)
│   └── queries/              # Secure filters for rendering (read operations)
│
└── styles/                   # Global style configuration
    └── globals.css           # Global variables and tailwind instructions
```

---

## 2. Detailed Folder Responsibilities

| Parent Folder | Child Directory | Responsibility |
| :--- | :--- | :--- |
| **`src/app`** | `[locale]/` | Handles multi-language routing routing parameters. Nesting routes within this folder allows next-intl to inject localization tokens into the server-rendered templates. |
| | `[locale]/(marketing)/` | Groups marketing routes (`/`, `/features`, `/integrations`, `/security`, `/pricing`, `/about`, `/contact`). Visually rich, heavily animated sections utilizing smooth scroll. |
| | `[locale]/(auth)/` | Groups session credential pathways (`/login`, `/register`, `/error`). Fully responsive credentials interface with proper validation. |
| | `[locale]/(dashboard)/` | Houses high-speed, clean workspace routes (`/dashboard`, `/dashboard/tools`, `/dashboard/accounts`, `/dashboard/history`, `/dashboard/settings`). Protected by middleware. |
| | `api/` | Houses RESTful endpoints and route handlers (e.g. `/api/auth/[...nextauth]` for OAuth callbacks, `/api/launch/[connectionId]` to trigger the launcher). |
| **`src/components`**| `ui/` | Contains highly specialized structural assets managed by shadcn/ui. Developers should rarely edit these directly. |
| | `common/` | Reusable atomic widgets utilized in multiple domains (e.g., customizable inputs, tooltips, buttons). |
| | `layout/` | Global visual layouts (nav headers, console sidebars, responsive overlays, page containers). |
| | `effects/` | Animated elements including particle effects, custom gradients, orbit spheres, and glassmorphism. |
| | `three/` | Dynamic WebGL canvasses using Three.js and `@react-three/fiber` for premium high-wow landing effects (orbit sphere, interconnected graphs). |
| | `providers/` | Wraps children with React Context systems (theme handlers, next-intl dictionary providers, global smooth-scrolling containers). |
| **`src/config`** | *Files under `config/`* | Houses static site configurations (`site.ts` for metadata/taglines, `navigation.ts` for headers/footers matrices, and `ai-providers.ts` for preset details). |
| **`src/db`** | *Files under `db/`* | Holds a single instanced Prisma Client (`prisma.ts`) preventing hot-reloading socket leaks during local development, and database seed scripts (`seed.ts`). |
| **`src/features`** | `[domain-feature]/` | Encapsulates single-domain resources. E.g. `features/accounts` contains form schemas, connection-specific visual cards, and state machines only relevant to Connection management. |
| **`src/i18n`** | `messages/` | Translation JSON dictionaries (`en.json`, `id.json`). No system translation strings should be placed inline. |
| **`src/lib`** | *Files under `lib/`* | Generic utility classes: crypto encryption engines, rate-limiting handlers, SEO meta utilities, and system validators. |
| **`src/server`** | `actions/` | Next.js Server Actions. Primarily handles secure mutate sequences (Zod parsing, Auth check, database transaction, `revalidatePath`). |
| | `queries/` | Safe database fetching queries. Explicitly strips secure credential parameters (like encrypted passwords/tokens) before outputting results. |
| **`src/styles`** | `globals.css` | Global styles, tailwind configs, custom fonts, animations tokens, and scroll behaviors. |

---

## 3. Strict Module Boundaries & Rules

To ensure codebase integrity as Ailectra grows:

1.  **Server Actions vs. Database Queries (`src/server`):**
    *   Do not combine queries (read) and actions (write) in the same files.
    *   **Queries** must never fetch or output sensitive unencrypted database fields (e.g. `encryptedSecret`).
    *   **Actions** must perform input validation using Zod schemas, execute ownership validation, and return structured outcome states rather than throwing raw errors.
2.  **No Raw Secrets Storage:**
    *   Under no circumstances must plain-text passwords or API tokens be committed to the database.
    *   Cryptographic helpers must reside in `src/lib/encryption.ts` and interact only with the environment configuration.
3.  **UI Component Rules (`src/components` vs `src/features`):**
    *   Components in `src/components/` must be highly generic and re-usable. They should accept data through typed props and should not perform raw server actions or database queries.
    *   Feature-bound components (e.g. `AddConnectionForm.tsx` in `src/features/accounts`) can bind closely with schema validations and server actions.
4.  **Aesthetics & Sectioning (Background Effect Rules):**
    *   Every background visual effect (stars particle fields, grid maps) must be isolated with strict positioning rules. 
    *   They must reside in a `relative isolate overflow-hidden` wrapper to prevent canvas leaks or layout disruptions.
