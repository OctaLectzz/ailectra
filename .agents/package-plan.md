# Package Plan — Ailectra

## Core

```bash
pnpm add next react react-dom typescript
```

Normally included by create-next-app.

## Auth and Database

```bash
pnpm add next-auth @auth/prisma-adapter @prisma/client bcryptjs zod
pnpm add -D prisma tsx
```

## UI

```bash
pnpm add lucide-react clsx tailwind-merge class-variance-authority sonner
pnpm dlx shadcn@latest init
```

## Forms

```bash
pnpm add react-hook-form @hookform/resolvers
```

## Theme and i18n

```bash
pnpm add next-themes next-intl
```

## Animation and Visuals

```bash
pnpm add framer-motion lenis three @react-three/fiber @react-three/drei recharts
```

## Testing

```bash
pnpm add -D vitest @testing-library/react @testing-library/jest-dom playwright prettier
```

## Optional

```bash
pnpm add zustand
```

Use Zustand only if state starts becoming messy.
