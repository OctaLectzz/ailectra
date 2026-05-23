# Animation and UX Effects — Ailectra

## 1. Animation Goals

Animasi harus membuat website terasa futuristik dan premium, bukan sekadar ramai. Animasi wajib mendukung experience, bukan mengganggu.

## 2. Lenis Smooth Scroll

Buat provider:

```txt
src/components/providers/lenis-provider.tsx
```

Rules:
- Aktif di marketing pages.
- Dashboard boleh aktif, tapi jangan sampai mengganggu table/form.
- Disable atau normalisasi jika user prefers reduced motion.

## 3. Framer Motion / Motion

Use cases:
- Section reveal.
- Staggered text.
- Card hover.
- Page transition optional.
- Dialog/micro-interaction.
- Animated graph SVG.

Patterns:
- Use variants.
- Use viewport once.
- Use reduced motion.

## 4. Three.js

Use only where it matters:
- Hero AI orbit.
- Neural sphere.
- Provider nodes.

Rules:
- Dynamic import with SSR disabled.
- Limit particles.
- Pause/slow animation when tab inactive if possible.
- Fallback static SVG for low performance/mobile.

## 5. Animated Graph

Graph idea:
- Center node: Ailectra.
- Outer nodes: Lovable, Claude, ChatGPT, Gemini, Perplexity, Cursor.
- Lines pulse slowly.
- Nodes float subtly.
- On hover, node glows and shows label.

Implementation:
- MVP: SVG + Motion.
- Advanced: Three.js particles.

## 6. Background Effects

Recommended mapping:

| Page/Section | Effect |
|---|---|
| Home Hero | Aceternity Background Beams + Three AI Orbit |
| Home Features | Dot Pattern + Bento Grid |
| Home How It Works | Magic UI Animated Beam |
| Home Integrations | Marquee + Orbit |
| Home Security | Grid Pattern + Spotlight |
| Home Dashboard Preview | Aurora + Glass Cards |
| Features Hero | React Bits particles |
| Integrations | Moving border cards |
| Security | Vault glow + matrix-like grid |
| Pricing | Subtle radial gradient |
| About | Soft aurora |
| Contact | Minimal grid |

## 7. Overflow Safety

Every animated background must be contained:

```tsx
<div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
  <Effect />
</div>
```

Parent section:

```tsx
<section className="relative isolate overflow-hidden">
```

Jangan biarkan canvas/background absolute keluar tanpa containment.

## 8. Performance Budget

- Jangan lebih dari 1 heavy canvas di satu viewport.
- Jangan render Three.js di semua pages.
- Gunakan lazy loading.
- Gunakan memoization untuk data static.
- Hindari animasi blur besar terlalu banyak.
- Mobile: kurangi jumlah particles.

## 9. Interaction Details

### Buttons

- Hover: slight lift + glow.
- Tap: scale 0.98.
- Disabled: no glow.

### Cards

- Hover: y -4 sampai -8.
- Border glow subtle.
- No aggressive rotation on dashboard.

### Forms

- Error state animate subtle.
- Submit loading spinner.
- Success toast.

### Nav

- Active route pill.
- Mobile sheet transition.

## 10. Reduced Motion

Semua motion components harus support reduced motion. Kalau user mengaktifkan reduced motion:
- Matikan parallax.
- Matikan smooth scroll.
- Matikan looping animation.
- Gunakan static gradient.
