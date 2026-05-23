# Ailectra Landing — Multi-Page Marketing Site

Build the complete multi-page marketing landing site for Ailectra with futuristic sections, per-section animated backgrounds (each wrapped in `relative isolate overflow-hidden`), responsive layout, reusable components, i18n support, and SEO metadata.

## Current State

**Already built (Phase 1-2 foundation):**
- Next.js App Router with `[locale]` routing (`en`, `id`)
- Tailwind CSS v4 with complete design system tokens in `globals.css`
- `next-intl` i18n with `en.json` / `id.json` messages
- `next-themes` with dark default
- shadcn/ui base components (Button, Card, Dialog, etc.)
- Common components: `Section`, `SectionHeading`, `GradientText`, `Container`
- Effects: `MotionReveal`, `StaggerContainer`, `StaggerItem`
- A basic placeholder home page at `(marketing)/page.tsx`

**Not yet built:**
- SiteHeader (navbar) — currently inline in page
- SiteFooter — currently inline in page
- MobileNav
- All marketing section components (HeroSection, FeatureBento, HowItWorks, etc.)
- All background effect components (BackgroundBeams, DotPattern, GridPattern, etc.)
- Sub-pages: Features, Integrations, Security, Pricing, About, Contact
- Marketing layout with shared header/footer
- Expanded i18n messages for all landing content
- SEO metadata per page

## Open Questions

> [!IMPORTANT]
> **Locale prefix**: The current `routing.ts` uses `localePrefix: "never"` — this means URLs will be `/features` not `/en/features`. The spec says routes should be `/[locale]/features`. Should I change `localePrefix` to `"always"` to match the spec, or keep `"never"` for cleaner URLs?

> [!NOTE]
> **Three.js hero**: The spec calls for a Three.js AI Orbit in the hero section. Given the complexity and bundle-size impact, I'll implement a **CSS/SVG-based animated orbit** for MVP that can be swapped for Three.js later. The Three.js orbit placeholder will be created as a separate dynamic import component.

## Proposed Changes

The work is organized into 5 sequential phases. All section components use the existing `Section` wrapper with `relative isolate overflow-hidden`.

---

### Phase A — Layout Shell (SiteHeader + SiteFooter + MobileNav + Marketing Layout)

#### [NEW] [site-header.tsx](file:///c:/Experience/projects/ailectra/src/components/layout/site-header.tsx)
- Transparent blur navbar for marketing pages
- Logo + nav links (Features, Integrations, Security, Pricing)
- CTA "Get Started" + ThemeToggle + LanguageSwitcher
- Fully responsive, uses i18n `nav.*` keys
- Sticky with backdrop blur

#### [NEW] [mobile-nav.tsx](file:///c:/Experience/projects/ailectra/src/components/layout/mobile-nav.tsx)
- Sheet/drawer navigation for mobile breakpoints
- Same nav links + CTA + language/theme controls

#### [NEW] [site-footer.tsx](file:///c:/Experience/projects/ailectra/src/components/layout/site-footer.tsx)
- Multi-column footer with logo, nav columns, social links placeholder
- Copyright + legal links
- Glass border-top treatment

#### [NEW] [layout.tsx](file:///c:/Experience/projects/ailectra/src/app/[locale]/(marketing)/layout.tsx)
- Wraps marketing pages with SiteHeader + SiteFooter
- JSON-LD WebApplication schema
- Lenis smooth scroll provider

---

### Phase B — Background Effect Components

All effects placed in `src/components/effects/`, exported via barrel file.

#### [NEW] [background-beams.tsx](file:///c:/Experience/projects/ailectra/src/components/effects/background-beams.tsx)
- Animated gradient beams using CSS/SVG paths
- Used for Hero section
- `pointer-events-none absolute inset-0 -z-10 overflow-hidden`

#### [NEW] [dot-pattern.tsx](file:///c:/Experience/projects/ailectra/src/components/effects/dot-pattern.tsx)
- Repeating dot grid with subtle opacity fade
- Used for Features section

#### [NEW] [grid-pattern.tsx](file:///c:/Experience/projects/ailectra/src/components/effects/grid-pattern.tsx)
- Perspective grid with glow center
- Used for Security section

#### [NEW] [spotlight.tsx](file:///c:/Experience/projects/ailectra/src/components/effects/spotlight.tsx)
- Mouse-following spotlight gradient
- Used for Dashboard Preview section

#### [NEW] [aurora-background.tsx](file:///c:/Experience/projects/ailectra/src/components/effects/aurora-background.tsx)
- Animated aurora/northern-lights gradient blobs
- Used for About page, Dashboard Preview

#### [NEW] [particles-background.tsx](file:///c:/Experience/projects/ailectra/src/components/effects/particles-background.tsx)
- Lightweight CSS/canvas particle system
- Used for Features hero on sub-page

---

### Phase C — Marketing Section Components

All sections placed in `src/components/marketing/`, each is a self-contained component.

#### [NEW] [hero-section.tsx](file:///c:/Experience/projects/ailectra/src/components/marketing/hero-section.tsx)
- Eyebrow badge "AI Access Hub"
- Staggered title reveal with GradientText
- Description + dual CTA buttons
- BackgroundBeams effect layer
- Animated CSS orbit with provider icons (SVG-based MVP)

#### [NEW] [logo-cloud.tsx](file:///c:/Experience/projects/ailectra/src/components/marketing/logo-cloud.tsx)
- Infinite scrolling marquee of provider logos (Lovable, Claude, ChatGPT, Gemini, Perplexity, Cursor, V0, Bolt, Replit AI)
- SVG icons with hover glow effect
- CSS animation marquee, no external lib needed

#### [NEW] [feature-bento.tsx](file:///c:/Experience/projects/ailectra/src/components/marketing/feature-bento.tsx)
- 6 feature cards in bento grid layout (2×3 on desktop, stacked on mobile)
- Cards: Multi-account vault, Quick launch, Secure credential storage, Launch history, Theme & language, AI provider directory
- Glass card with hover lift + border glow
- DotPattern background

#### [NEW] [how-it-works.tsx](file:///c:/Experience/projects/ailectra/src/components/marketing/how-it-works.tsx)
- 4 numbered steps with animated connecting beam
- Stagger reveal on scroll
- SVG beam animation between steps

#### [NEW] [animated-graph.tsx](file:///c:/Experience/projects/ailectra/src/components/marketing/animated-graph.tsx)
- SVG + Framer Motion implementation
- Center node = Ailectra, outer nodes = AI providers
- Pulsing connection lines, floating nodes
- Hover glow + label reveal

#### [NEW] [security-vault.tsx](file:///c:/Experience/projects/ailectra/src/components/marketing/security-vault.tsx)
- Vault card with lock icon glow animation
- Key security messages: encrypted vault, user-controlled, no session hijacking
- GridPattern background

#### [NEW] [dashboard-preview.tsx](file:///c:/Experience/projects/ailectra/src/components/marketing/dashboard-preview.tsx)
- Mock dashboard UI with glass cards
- Connected account cards, usage chart, recent launches
- Spotlight background effect

#### [NEW] [faq-section.tsx](file:///c:/Experience/projects/ailectra/src/components/marketing/faq-section.tsx)
- Accordion-style FAQ with 5 questions
- Minimal radial gradient background
- Smooth expand/collapse with Framer Motion

#### [NEW] [cta-section.tsx](file:///c:/Experience/projects/ailectra/src/components/marketing/cta-section.tsx)
- Full-width gradient CTA with beam effects
- "Ready to organize your AI workspace?"
- Dual buttons: Get Started + View Security

#### [NEW] [pricing-cards.tsx](file:///c:/Experience/projects/ailectra/src/components/marketing/pricing-cards.tsx)
- 3 tier cards: Free, Pro (Coming Soon), Team (Coming Soon)
- Glass cards with featured highlight on Pro

---

### Phase D — Pages Assembly

#### [MODIFY] [page.tsx](file:///c:/Experience/projects/ailectra/src/app/[locale]/(marketing)/page.tsx)
- Replace inline content with composed section components
- Sections: Hero → Logo Cloud → Feature Bento → How It Works → Animated Graph → Security Vault → Dashboard Preview → FAQ → CTA

#### [NEW] [features/page.tsx](file:///c:/Experience/projects/ailectra/src/app/[locale]/(marketing)/features/page.tsx)
- Feature hero with particles background
- Detailed feature cards
- Workflow section
- Dashboard mockup screenshots
- CTA

#### [NEW] [integrations/page.tsx](file:///c:/Experience/projects/ailectra/src/app/[locale]/(marketing)/integrations/page.tsx)
- Integration hero
- Provider grid with category filter
- Auth method badges
- Coming soon providers
- CTA

#### [NEW] [security/page.tsx](file:///c:/Experience/projects/ailectra/src/app/[locale]/(marketing)/security/page.tsx)
- Security hero with grid pattern
- What Ailectra stores vs never does
- Encryption explanation
- Launch safety
- Security FAQ + CTA

#### [NEW] [pricing/page.tsx](file:///c:/Experience/projects/ailectra/src/app/[locale]/(marketing)/pricing/page.tsx)
- Pricing hero
- 3 plan cards (Free, Pro Coming Soon, Team Coming Soon)
- Feature comparison
- CTA

#### [NEW] [about/page.tsx](file:///c:/Experience/projects/ailectra/src/app/[locale]/(marketing)/about/page.tsx)
- Why Ailectra + Mission
- Product principles
- Roadmap teaser
- Aurora background

#### [NEW] [contact/page.tsx](file:///c:/Experience/projects/ailectra/src/app/[locale]/(marketing)/contact/page.tsx)
- Contact hero with minimal grid
- Contact form placeholder
- Support email placeholder
- FAQ link

---

### Phase E — i18n Expansion + SEO

#### [MODIFY] [en.json](file:///c:/Experience/projects/ailectra/src/i18n/messages/en.json)
- Add all landing section translation keys (hero, features, integrations, security, pricing, about, contact, faq, cta, footer)

#### [MODIFY] [id.json](file:///c:/Experience/projects/ailectra/src/i18n/messages/id.json)
- Indonesian translations for all new keys

#### [NEW] [seo.ts](file:///c:/Experience/projects/ailectra/src/lib/seo.ts)
- `createMetadata()` helper with title, description, canonical, locale alternates, openGraph, twitter

#### Per-page SEO metadata
- Each page exports `generateMetadata()` with title/description per the seo-i18n.md spec

---

## Background Effect Mapping

| Section | Background Effect | Wrapper |
|---|---|---|
| Hero | `BackgroundBeams` | `relative isolate overflow-hidden` ✓ |
| Logo Cloud | None (subtle border only) | `relative isolate overflow-hidden` ✓ |
| Features Bento | `DotPattern` | `relative isolate overflow-hidden` ✓ |
| How It Works | SVG beam (inline) | `relative isolate overflow-hidden` ✓ |
| Animated Graph | None (SVG is content) | `relative isolate overflow-hidden` ✓ |
| Security | `GridPattern` | `relative isolate overflow-hidden` ✓ |
| Dashboard Preview | `Spotlight` | `relative isolate overflow-hidden` ✓ |
| FAQ | Radial gradient (CSS) | `relative isolate overflow-hidden` ✓ |
| CTA | `BackgroundBeams` variant | `relative isolate overflow-hidden` ✓ |

All handled automatically by the existing `Section` component's `relative isolate overflow-hidden` class.

---

## File Count Summary

| Category | New Files | Modified Files |
|---|---|---|
| Layout Components | 4 | 0 |
| Effect Components | 6 | 1 (index.ts) |
| Marketing Components | 10 | 0 |
| Pages | 6 | 1 (home page.tsx) |
| i18n | 0 | 2 (en.json, id.json) |
| Lib | 1 (seo.ts) | 0 |
| Config | 1 (ai-providers.ts) | 0 |
| **Total** | **28** | **4** |

---

## Verification Plan

### Automated Tests
- `npm run dev` — verify all pages render without errors
- Navigate each route: `/`, `/features`, `/integrations`, `/security`, `/pricing`, `/about`, `/contact`
- Verify responsive layout at mobile (375px), tablet (768px), desktop (1280px)
- Verify dark/light mode toggle works across all pages
- Verify no horizontal scroll overflow on any page

### Visual Checks
- Every section background stays contained (no bleed between sections)
- Animations trigger on scroll (viewport intersection)
- Hover effects work on cards and buttons
- Mobile nav drawer opens/closes correctly
- Logo marquee scrolls infinitely
