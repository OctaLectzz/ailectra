# Design System — Ailectra

## 1. Design Direction

Tema utama: **futuristic, contemporary, modern, premium, secure, AI-native**.

Website harus terasa seperti dashboard AI masa depan, bukan template SaaS biasa. Namun jangan terlalu ramai sampai user pusing. Landing page boleh ekspresif, dashboard harus lebih tenang dan fungsional.

## 2. Brand Personality

- Futuristic.
- Clean.
- Confident.
- Intelligent.
- Secure.
- Fast.
- Premium but friendly.

## 3. Visual Keywords

- Neon glass.
- Soft glow.
- AI orbit.
- Neural graph.
- Data stream.
- Cyber gradient.
- Dark surface.
- Holographic cards.
- Smooth motion.
- Light grid.
- Floating panels.

## 4. Color Palette

### 4.1 Core Colors

```css
:root {
  --background: 222 47% 98%;
  --foreground: 224 38% 8%;

  --primary: 263 92% 62%;
  --primary-foreground: 0 0% 100%;

  --secondary: 190 96% 50%;
  --secondary-foreground: 222 47% 8%;

  --accent: 316 96% 64%;
  --accent-foreground: 0 0% 100%;

  --muted: 220 18% 92%;
  --muted-foreground: 222 16% 40%;

  --card: 0 0% 100%;
  --card-foreground: 224 38% 8%;

  --border: 220 18% 84%;
  --input: 220 18% 84%;
  --ring: 263 92% 62%;

  --success: 153 76% 45%;
  --warning: 38 92% 52%;
  --destructive: 0 84% 60%;
}

.dark {
  --background: 232 48% 5%;
  --foreground: 220 28% 96%;

  --primary: 263 92% 68%;
  --primary-foreground: 0 0% 100%;

  --secondary: 188 100% 56%;
  --secondary-foreground: 232 48% 5%;

  --accent: 316 96% 68%;
  --accent-foreground: 0 0% 100%;

  --muted: 232 28% 13%;
  --muted-foreground: 220 16% 72%;

  --card: 232 36% 8%;
  --card-foreground: 220 28% 96%;

  --border: 232 24% 18%;
  --input: 232 24% 18%;
  --ring: 263 92% 68%;

  --success: 153 76% 48%;
  --warning: 38 92% 56%;
  --destructive: 0 84% 64%;
}
```

### 4.2 Named Colors

- Primary: **Quantum Violet** `#8B5CF6`.
- Secondary: **Cyan Pulse** `#22D3EE`.
- Accent: **Neon Magenta** `#F472B6`.
- Background Dark: **Void Navy** `#050712`.
- Surface Dark: **Deep Space** `#0B1020`.
- Surface Elevated: **Nebula Panel** `#11172A`.
- Text Light: **Cloud White** `#F7FAFC`.
- Text Muted: **Mist Gray** `#A8B3CF`.
- Success: **Signal Green** `#22C55E`.
- Warning: **Solar Amber** `#F59E0B`.
- Error: **Plasma Red** `#EF4444`.

## 5. Gradients

### Primary Gradient

```css
background: linear-gradient(135deg, #8B5CF6 0%, #22D3EE 55%, #F472B6 100%);
```

### Hero Glow

```css
background:
  radial-gradient(circle at 20% 20%, rgba(139, 92, 246, 0.35), transparent 32%),
  radial-gradient(circle at 80% 30%, rgba(34, 211, 238, 0.28), transparent 30%),
  radial-gradient(circle at 50% 80%, rgba(244, 114, 182, 0.22), transparent 28%);
```

### Card Glow

```css
background:
  linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.03)),
  radial-gradient(circle at top, rgba(139,92,246,.18), transparent 45%);
```

## 6. Typography

Gunakan:

- Heading: `Space Grotesk` atau `Geist Sans`.
- Body: `Inter` atau `Geist Sans`.
- Mono/Data: `Geist Mono`.

Hierarchy:

```txt
Hero title     : text-5xl md:text-7xl font-semibold tracking-tight
Page title     : text-4xl md:text-6xl font-semibold tracking-tight
Section title  : text-3xl md:text-5xl font-semibold tracking-tight
Card title     : text-lg md:text-xl font-medium
Body           : text-base leading-7
Small          : text-sm
Caption        : text-xs
```

## 7. Spacing

- Section padding desktop: `py-24 lg:py-32`.
- Section padding mobile: `py-16`.
- Container: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`.
- Card radius: `rounded-2xl` atau `rounded-3xl`.
- Button radius: `rounded-full` untuk marketing, `rounded-xl` untuk dashboard.

## 8. Component Style

### Buttons

- Primary: gradient, glow subtle.
- Secondary: glass border.
- Ghost: hover surface.
- Danger: red muted.

### Cards

- Glass effect.
- Border halus.
- Hover lift.
- Soft shadow.
- Dashboard cards lebih flat agar readable.

### Forms

- Input dark surface.
- Clear error message.
- Password visibility toggle.
- Field description untuk credential/token.

### Navigation

- Landing: transparent blur navbar.
- Dashboard: solid sidebar.
- Mobile: sheet/drawer.

## 9. Background Effects per Section

Gunakan variasi agar tidak monoton:

| Section | Recommended Effect |
|---|---|
| Hero | Aceternity Background Beams / React Bits particles / Three.js orbit |
| Features | Magic UI Bento Grid + dot pattern |
| Integrations | Logo orbit + moving border |
| Security | Grid background + vault glow |
| Dashboard Preview | Spotlight background |
| Testimonials | Subtle aurora |
| FAQ | Minimal radial gradient |
| CTA | Beam collision / neon rings |

Wajib wrapper:

```tsx
<section className="relative isolate overflow-hidden">
  <Effect className="absolute inset-0 -z-10" />
  <div className="relative z-10">...</div>
</section>
```

## 10. Motion Rules

### Landing Motion

- Hero title: staggered reveal.
- CTA: hover scale 1.02.
- Cards: while hover y -6.
- Logos: slow float/orbit.
- Graph: animated lines/nodes.
- Section reveal: opacity + y.

### Dashboard Motion

- Minimal.
- Sidebar transition.
- Card hover subtle.
- Dialog animate in/out.
- Skeleton loading.

### Reduced Motion

Semua komponen animasi harus cek:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}
```

Di React, sediakan util/hook:

```ts
const shouldReduceMotion = useReducedMotion()
```

## 11. UI Library Usage

### shadcn/ui

Dipakai untuk:
- Button.
- Input.
- Dialog.
- Dropdown.
- Sheet.
- Tabs.
- Card.
- Table.
- Form.
- Select.
- Switch.
- Tooltip.
- Sonner.

### Aceternity UI

Dipakai untuk:
- Background beams.
- Spotlight.
- Bento grid.
- Card hover effect.
- Floating dock optional.
- Moving border.

### Magic UI

Dipakai untuk:
- Globe.
- Marquee.
- Animated beam.
- Border beam.
- Number ticker.
- Shimmer button.

### React Bits

Dipakai untuk:
- Animated text.
- Particle/background.
- Scroll velocity.
- Splash cursor optional.
- Tilted cards.

### Framer Motion / Motion

Dipakai untuk:
- Reveal.
- Stagger.
- Layout animation.
- Hover/tap.
- Page transition.

### Three.js

Dipakai untuk:
- AI orbit.
- Neural sphere.
- Holographic grid.
- Provider nodes around center.

## 12. Dashboard Visual Direction

Dashboard jangan full neon berlebihan. Gunakan:

- Dark panels.
- Clear hierarchy.
- One accent per interaction.
- Provider icons jelas.
- Card status jelas.
- Empty states friendly.

## 13. Accessibility

- Contrast minimal AA.
- Jangan hanya warna untuk status.
- Semua button punya aria-label jika icon-only.
- Dialog focus trap.
- Keyboard navigation.
- Reduced motion.
- Alt text untuk image/logo.
