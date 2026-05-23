# UI/UX Design Agent — Implementation Plan

Implement the complete design system, Tailwind theme, typography, dark/light mode, and reusable UI primitives for Ailectra. Default theme: **dark**.

## User Review Required

> [!IMPORTANT]
> This plan will install multiple npm packages and initialize shadcn/ui. Ensure you're ready for `npm install` before approving.

> [!WARNING]
> The current `globals.css` will be fully rewritten with the Ailectra design tokens. The existing Next.js boilerplate styling will be replaced.

## Open Questions

> [!IMPORTANT]
> **Font choice**: The spec says `Space Grotesk` or `Geist Sans` for headings. This plan uses **Space Grotesk** for headings + **Inter** for body + **Geist Mono** for code. Geist Sans is already configured via `next/font` — should we keep it as a fallback or drop it entirely?

> [!NOTE]
> **LanguageSwitcher**: The i18n routing is set up (`next-intl` with `en`/`id`). The LanguageSwitcher component will use `useRouter` + `usePathname` from `next-intl` for locale switching. Should it be a dropdown or a toggle button for 2 languages?

---

## Proposed Changes

### 1. Dependencies

Install the following packages:

```bash
npm install clsx tailwind-merge class-variance-authority framer-motion @react-three/fiber @react-three/drei three lucide-react
npm install -D @types/three
```

Then initialize **shadcn/ui**:
```bash
npx -y shadcn@latest init
```

Then install base shadcn components:
```bash
npx -y shadcn@latest add button card dialog input select switch tabs tooltip badge skeleton sheet dropdown-menu separator
```

---

### 2. Design System — CSS & Tailwind Theme

#### [MODIFY] [globals.css](file:///c:/Experience/projects/ailectra/src/styles/globals.css)

Full rewrite with:

- **`@import "tailwindcss"`** at top
- **`:root` light theme** — all HSL CSS variables from `design.md` §4.1
- **`.dark` dark theme** — all dark-mode HSL CSS variables
- **`@theme inline`** block — maps every CSS variable to Tailwind tokens:
  - Colors: `--color-background`, `--color-foreground`, `--color-primary`, `--color-primary-foreground`, `--color-secondary`, `--color-secondary-foreground`, `--color-accent`, `--color-accent-foreground`, `--color-muted`, `--color-muted-foreground`, `--color-card`, `--color-card-foreground`, `--color-border`, `--color-input`, `--color-ring`, `--color-success`, `--color-warning`, `--color-destructive`
  - Named colors: `--color-void-navy`, `--color-deep-space`, `--color-nebula-panel`
  - Fonts: `--font-heading` (Space Grotesk), `--font-body` (Inter), `--font-mono` (Geist Mono)
  - Border radius: `--radius-*` tokens
  - Animations: `--animate-*` for glow-pulse, float, shimmer
- **Gradients** as utility classes: `.gradient-primary`, `.gradient-hero-glow`, `.gradient-card-glow`
- **Glass effect**: `.glass` utility
- **Reduced motion** media query
- **Base body styles** with smooth font rendering

---

### 3. Utility Functions

#### [NEW] [utils.ts](file:///c:/Experience/projects/ailectra/src/lib/utils.ts)

- `cn(...inputs)` — merges Tailwind classes using `clsx` + `tailwind-merge`

---

### 4. Theme Provider

#### [NEW] [theme-provider.tsx](file:///c:/Experience/projects/ailectra/src/components/providers/theme-provider.tsx)

- `"use client"` wrapper around `next-themes` `ThemeProvider`
- Props: `attribute="class"`, `defaultTheme="dark"`, `enableSystem`, `disableTransitionOnChange`

---

### 5. Root Layout Update

#### [MODIFY] [layout.tsx](file:///c:/Experience/projects/ailectra/src/app/layout.tsx)

- Import `Space_Grotesk` and `Inter` from `next/font/google` (keep `Geist_Mono`)
- Set CSS variables: `--font-heading`, `--font-body`, `--font-mono`
- Wrap `{children}` with `<ThemeProvider>`
- Update metadata (title: "Ailectra — One Access for Every AI")
- Add `suppressHydrationWarning` to `<html>` for theme
- Import from `@/styles/globals.css`

---

### 6. shadcn/ui Configuration

#### [NEW] [components.json](file:///c:/Experience/projects/ailectra/components.json)

- Style: `"new-york"`
- CSS variables: `true`
- Base color: custom (our Quantum Violet palette)
- Path aliases configured for `@/components/ui`, `@/lib/utils`

---

### 7. Common Components

All in `src/components/common/`:

#### [NEW] [container.tsx](file:///c:/Experience/projects/ailectra/src/components/common/container.tsx)
- Reusable `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` wrapper
- Accepts `className`, `as` (element tag), `children`

#### [NEW] [section.tsx](file:///c:/Experience/projects/ailectra/src/components/common/section.tsx)
- `<section>` with `relative isolate overflow-hidden` + padding
- `background` prop slot for effects layer (`absolute inset-0 -z-10`)
- `children` rendered in `relative z-10` Container

#### [NEW] [section-heading.tsx](file:///c:/Experience/projects/ailectra/src/components/common/section-heading.tsx)
- `title`, `subtitle`, `badge` props
- Centered layout with proper typography hierarchy
- Badge uses gradient pill

#### [NEW] [gradient-text.tsx](file:///c:/Experience/projects/ailectra/src/components/common/gradient-text.tsx)
- Inline `<span>` with `bg-clip-text text-transparent` and primary gradient
- Accepts `className` for gradient override

#### [NEW] [icon-badge.tsx](file:///c:/Experience/projects/ailectra/src/components/common/icon-badge.tsx)
- Rounded icon container with muted bg, primary border on hover
- Accepts `icon` (ReactNode), `size`, `className`

#### [NEW] [empty-state.tsx](file:///c:/Experience/projects/ailectra/src/components/common/empty-state.tsx)
- Centered layout with icon, title, description, optional action button
- Used for zero-data dashboard states

#### [NEW] [loading-state.tsx](file:///c:/Experience/projects/ailectra/src/components/common/loading-state.tsx)
- Spinner/skeleton with pulsing animation
- `text` prop for loading message

#### [NEW] [error-state.tsx](file:///c:/Experience/projects/ailectra/src/components/common/error-state.tsx)
- Error icon + message + retry button
- `error`, `onRetry` props

#### [NEW] [theme-toggle.tsx](file:///c:/Experience/projects/ailectra/src/components/common/theme-toggle.tsx)
- `"use client"` — uses `useTheme()` from `next-themes`
- Animated sun/moon icon swap (Framer Motion)
- Accessible button with `aria-label`

#### [NEW] [language-switcher.tsx](file:///c:/Experience/projects/ailectra/src/components/common/language-switcher.tsx)
- `"use client"` — uses `next-intl` router for locale switching
- Dropdown showing available locales with flag emojis
- Highlights current locale

#### [NEW] [index.ts](file:///c:/Experience/projects/ailectra/src/components/common/index.ts)
- Barrel export for all common components

---

### 8. Effects / Animation Components

All in `src/components/effects/`:

#### [NEW] [motion-reveal.tsx](file:///c:/Experience/projects/ailectra/src/components/effects/motion-reveal.tsx)
- As specified in `component-system.md` §8
- Uses `framer-motion` with `useReducedMotion`
- `whileInView` fade-up animation

#### [NEW] [stagger-container.tsx](file:///c:/Experience/projects/ailectra/src/components/effects/stagger-container.tsx)
- Parent container with `staggerChildren` variant
- Each child auto-wrapped in `motion.div` with reveal

#### [NEW] [index.ts](file:///c:/Experience/projects/ailectra/src/components/effects/index.ts)
- Barrel export

---

### 9. Hooks

#### [NEW] [use-reduced-motion.ts](file:///c:/Experience/projects/ailectra/src/lib/hooks/use-reduced-motion.ts)
- Custom hook wrapping `window.matchMedia("(prefers-reduced-motion: reduce)")`
- SSR-safe with `useState` + `useEffect`

---

### 10. Cleanup

#### [DELETE] `.gitkeep` files in populated directories

Remove `.gitkeep` from `src/components/ui/`, `src/components/common/`, `src/components/effects/`, `src/components/providers/`, `src/lib/` after real files are added.

---

## File Summary

| # | Action | File |
|---|--------|------|
| 1 | MODIFY | `src/styles/globals.css` — Full design token system |
| 2 | NEW | `src/lib/utils.ts` — `cn()` utility |
| 3 | NEW | `src/components/providers/theme-provider.tsx` |
| 4 | MODIFY | `src/app/layout.tsx` — Fonts, ThemeProvider, metadata |
| 5 | NEW | `components.json` — shadcn config |
| 6 | NEW | `src/components/common/container.tsx` |
| 7 | NEW | `src/components/common/section.tsx` |
| 8 | NEW | `src/components/common/section-heading.tsx` |
| 9 | NEW | `src/components/common/gradient-text.tsx` |
| 10 | NEW | `src/components/common/icon-badge.tsx` |
| 11 | NEW | `src/components/common/empty-state.tsx` |
| 12 | NEW | `src/components/common/loading-state.tsx` |
| 13 | NEW | `src/components/common/error-state.tsx` |
| 14 | NEW | `src/components/common/theme-toggle.tsx` |
| 15 | NEW | `src/components/common/language-switcher.tsx` |
| 16 | NEW | `src/components/common/index.ts` |
| 17 | NEW | `src/components/effects/motion-reveal.tsx` |
| 18 | NEW | `src/components/effects/stagger-container.tsx` |
| 19 | NEW | `src/components/effects/index.ts` |
| 20 | NEW | `src/lib/hooks/use-reduced-motion.ts` |
| 21 | INSTALL | shadcn/ui base components via CLI |

---

## Verification Plan

### Automated Tests
```bash
npm run build
```
Ensure zero type errors and the build completes cleanly.

### Manual Verification
- Run `npm run dev`, visit `http://localhost:3000`
- Verify dark mode is the default
- Toggle between dark/light mode using `ThemeToggle`
- Inspect design tokens in DevTools (CSS variables)
- Check font rendering (Space Grotesk headings, Inter body)
- Verify reduced motion media query disables animations
