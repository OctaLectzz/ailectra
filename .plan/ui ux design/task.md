# UI/UX Design Agent — Task Tracker

## Phase 1: Dependencies
- [ ] Install runtime packages (clsx, tailwind-merge, cva, framer-motion, three, lucide-react)
- [ ] Initialize shadcn/ui
- [ ] Install shadcn base components

## Phase 2: Design Foundation
- [ ] Rewrite `globals.css` with full design token system
- [ ] Create `src/lib/utils.ts` — `cn()` utility

## Phase 3: Theme & Layout
- [ ] Create `ThemeProvider` wrapper
- [ ] Update root `layout.tsx` with fonts, ThemeProvider, metadata

## Phase 4: Common Components
- [ ] `Container`
- [ ] `Section`
- [ ] `SectionHeading`
- [ ] `GradientText`
- [ ] `IconBadge`
- [ ] `EmptyState`
- [ ] `LoadingState`
- [ ] `ErrorState`
- [ ] `ThemeToggle`
- [ ] `LanguageSwitcher`
- [ ] Barrel export `index.ts`

## Phase 5: Effects & Hooks
- [ ] `MotionReveal`
- [ ] `StaggerContainer`
- [ ] Effects barrel export
- [ ] `useReducedMotion` hook

## Phase 6: Verification
- [ ] `npm run build` passes
- [ ] Dev server renders correctly
