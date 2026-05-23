# Component System — Ailectra

## 1. Component Philosophy

Komponen harus reusable, typed, dan tidak terlalu terikat ke satu page. Jangan membuat page besar berisi ratusan baris JSX berulang.

## 2. Component Layers

### UI Base

Folder:

```txt
src/components/ui
```

Isi dari shadcn/ui:
- Button.
- Card.
- Dialog.
- Form.
- Input.
- Select.
- Switch.
- Tabs.
- Tooltip.
- Table.
- Badge.
- Skeleton.

Jangan terlalu modifikasi langsung kecuali perlu token theme.

### Common Components

Folder:

```txt
src/components/common
```

Komponen:
- `Container`
- `Section`
- `SectionHeading`
- `GradientText`
- `IconBadge`
- `EmptyState`
- `ConfirmDialog`
- `LoadingState`
- `ErrorState`
- `ThemeToggle`
- `LanguageSwitcher`

### Layout Components

Folder:

```txt
src/components/layout
```

Komponen:
- `SiteHeader`
- `SiteFooter`
- `MobileNav`
- `DashboardShell`
- `DashboardSidebar`
- `DashboardHeader`
- `UserMenu`

### Marketing Components

Folder:

```txt
src/components/marketing
```

Komponen:
- `HeroSection`
- `FeatureBento`
- `HowItWorks`
- `IntegrationOrbit`
- `SecurityVault`
- `DashboardPreview`
- `AnimatedStats`
- `FaqSection`
- `CtaSection`
- `PricingCards`

### Dashboard Components

Folder:

```txt
src/components/dashboard
```

Komponen:
- `StatsCard`
- `ProviderCard`
- `ConnectionCard`
- `ConnectionGrid`
- `LaunchHistoryTable`
- `SecurityStatusCard`
- `RecentActivity`
- `DashboardChart`

### Effects Components

Folder:

```txt
src/components/effects
```

Komponen:
- `BackgroundBeams`
- `AuroraBackground`
- `DotPattern`
- `GridPattern`
- `Spotlight`
- `BorderBeam`
- `ParticlesBackground`
- `MotionReveal`
- `StaggerContainer`

### Three Components

Folder:

```txt
src/components/three
```

Komponen:
- `AIOrbitCanvas`
- `NeuralSphere`
- `ProviderNodesScene`

Import Three.js secara dynamic agar tidak membebani initial page.

## 3. Component API Example

### Section

```tsx
type SectionProps = {
  children: React.ReactNode
  className?: string
  background?: React.ReactNode
}

export function Section({ children, className, background }: SectionProps) {
  return (
    <section className={cn("relative isolate overflow-hidden py-16 lg:py-24", className)}>
      {background ? <div className="absolute inset-0 -z-10">{background}</div> : null}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
```

### ConnectionCard

```tsx
type ConnectionCardProps = {
  id: string
  label: string
  providerName: string
  providerLogo?: string
  accountEmail?: string
  lastLaunchedAt?: Date | string | null
  onLaunch?: (id: string) => void
}
```

## 4. Reusability Rules

- Jangan duplikat button custom di setiap page.
- Jangan hardcode provider card di banyak tempat.
- Semua empty state pakai `EmptyState`.
- Semua section marketing pakai `Section`.
- Semua reveal animation pakai `MotionReveal`.
- Semua icon-only button wajib `aria-label`.

## 5. Naming Convention

- Component: PascalCase.
- Hook: useSomething.
- Server action: `createConnectionAction`.
- Query: `getUserConnections`.
- Validator: `createConnectionSchema`.
- Config object: `aiProviders`.

## 6. Client/Server Split

Server:
- Fetch data.
- Validate auth.
- Render static content.

Client:
- Forms.
- Motion.
- Dialog.
- Theme.
- Language switch.
- Charts.
- Three canvas.

## 7. Styling Rules

- Gunakan Tailwind.
- Gunakan CSS variables.
- Hindari arbitrary color berlebihan.
- Pakai `cn()` untuk condition class.
- Jangan inline style kecuali canvas/animation butuh.

## 8. Animation Components

`MotionReveal`:

```tsx
"use client"

import { motion, useReducedMotion } from "framer-motion"

export function MotionReveal({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
```

## 9. Dashboard Chart

Gunakan Recharts untuk MVP:

- Launch frequency.
- Provider usage.
- Connected accounts by provider.

Animasi chart halus, jangan lebay.
