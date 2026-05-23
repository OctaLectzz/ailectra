# Implementation Plan — Ailectra Dashboard Shell

This plan outlines the design and implementation of the Ailectra Dashboard shell, navigation system, responsive layouts, data grids, form components, and server actions/queries boundary.

## User Review Required

> [!IMPORTANT]
> - Since database migrations and seeding have run but Google Client IDs may not be fully configured on the user environment, the layout and queries will handle mock session validation fallback when no active session is found (e.g., in local development, using a fallback mock user session) so the application remains navigable and functional for the user.
> - A custom visual SVG chart is implemented for the dashboard's analytics widget rather than pulling in external visual libraries, ensuring robust React 19 compatibility and custom futuristic neon glow styling.

## Open Questions

None. The layout grid, sidebar spec, and launch strategies are fully defined in the [.agents](file:///c:/Experience/projects/ailectra/.agents) specification documents.

## Proposed Changes

We will build the dashboard experience in three stages: **Layout Components**, **Subpages & Forms**, and **Queries/Actions Backend Hook**.

---

### Layout Components

#### [NEW] [dashboard-shell.tsx](file:///c:/Experience/projects/ailectra/src/components/layout/dashboard-shell.tsx)
* Main page container for layout grid positioning.

#### [NEW] [dashboard-sidebar.tsx](file:///c:/Experience/projects/ailectra/src/components/layout/dashboard-sidebar.tsx)
* Vertical sidebar menu featuring:
  * Navigation links to Overview, AI Tools, Connected Accounts, Launch History, Security, and Settings.
  * Collapsible drawers for mobile screens.
  * User profile details card.

#### [NEW] [dashboard-header.tsx](file:///c:/Experience/projects/ailectra/src/components/layout/dashboard-header.tsx)
* Top navigation bar with theme selector, language selector (EN/ID), page titles, and user profile action triggers.

---

### Subpages & Forms

#### [NEW] [stats-card.tsx](file:///c:/Experience/projects/ailectra/src/components/dashboard/stats-card.tsx)
* Dashboard grid widgets for numeric indicators with subtle border glows.

#### [NEW] [dashboard-chart.tsx](file:///c:/Experience/projects/ailectra/src/components/dashboard/dashboard-chart.tsx)
* Interactive custom SVG line/area chart showing recent launch activity statistics with CSS neon glow filters.

#### [NEW] [provider-card.tsx](file:///c:/Experience/projects/ailectra/src/components/dashboard/provider-card.tsx)
* Individual cards for the AI Tools grid, detailing categories, description, and action buttons.

#### [NEW] [connection-card.tsx](file:///c:/Experience/projects/ailectra/src/components/dashboard/connection-card.tsx)
* Detail card for linked accounts containing metadata, launch indicators, dynamic strategy trigger actions, and delete prompts.

#### [NEW] [add-connection-form.tsx](file:///c:/Experience/projects/ailectra/src/components/dashboard/add-connection-form.tsx)
* Multi-field credential linking form incorporating Zod validation, credential storing disclosures, and secure submit alerts.

#### [NEW] [launch-history-table.tsx](file:///c:/Experience/projects/ailectra/src/components/dashboard/launch-history-table.tsx)
* Data grids displaying timestamps, slugs, states, and errors with filter toggles.

---

### App Pages

#### [NEW] [layout.tsx](file:///c:/Experience/projects/ailectra/src/app/[locale]/(dashboard)/layout.tsx)
* Route group wrapper supplying the shell layout to all subroutes.

#### [NEW] [page.tsx](file:///c:/Experience/projects/ailectra/src/app/[locale]/(dashboard)/dashboard/page.tsx)
* Overview panel showing stats, custom charts, and recent links.

#### [NEW] [page.tsx](file:///c:/Experience/projects/ailectra/src/app/[locale]/(dashboard)/dashboard/tools/page.tsx)
* Provider directory view.

#### [NEW] [page.tsx](file:///c:/Experience/projects/ailectra/src/app/[locale]/(dashboard)/dashboard/accounts/page.tsx)
* Connected accounts view.

#### [NEW] [page.tsx](file:///c:/Experience/projects/ailectra/src/app/[locale]/(dashboard)/dashboard/accounts/new/page.tsx)
* Creation form page.

#### [NEW] [page.tsx](file:///c:/Experience/projects/ailectra/src/app/[locale]/(dashboard)/dashboard/history/page.tsx)
* Activity logs table.

#### [NEW] [page.tsx](file:///c:/Experience/projects/ailectra/src/app/[locale]/(dashboard)/dashboard/security/page.tsx)
* Credentials vault security configuration page.

#### [NEW] [page.tsx](file:///c:/Experience/projects/ailectra/src/app/[locale]/(dashboard)/dashboard/settings/page.tsx)
* Preferences tab (LanguageSwitcher, ThemeToggle) and profile configurations.

---

### Backend Skeletons & Queries

#### [NEW] [account-queries.ts](file:///c:/Experience/projects/ailectra/src/server/queries/account-queries.ts)
* Read user connection databases and launch statistics.

#### [NEW] [provider-queries.ts](file:///c:/Experience/projects/ailectra/src/server/queries/provider-queries.ts)
* Read seeded AI provider configurations.

#### [NEW] [account-actions.ts](file:///c:/Experience/projects/ailectra/src/server/actions/account-actions.ts)
* Server actions to validate, encrypt, and record connection mutations.

#### [NEW] [settings-actions.ts](file:///c:/Experience/projects/ailectra/src/server/actions/settings-actions.ts)
* Server actions to update user configurations.

#### [NEW] [validators.ts](file:///c:/Experience/projects/ailectra/src/lib/validators.ts)
* Zod validation schemes matching contract API properties.

#### [MODIFY] [en.json](file:///c:/Experience/projects/ailectra/src/i18n/messages/en.json) & [id.json](file:///c:/Experience/projects/ailectra/src/i18n/messages/id.json)
* Append translations for `dashboard` menus, tabs, inputs, table logs, and dialog actions.

---

## Verification Plan

### Automated Tests
* Run `npm run typecheck` to verify correct imports and Prisma type compatibility.
* Run `npm run build` to verify standard rendering performance and routes generation.

### Manual Verification
* Access `/en/dashboard` and verify layout, sidebar toggles on desktop and mobile viewports.
* Toggle theme between dark/light and languages between English/Indonesian to ensure instant translation updates.
* Populate the new connection form, submit it, and verify that the connection card appears on the connected accounts page.
* Select a connection card, select trigger, and confirm the creation of a row in the launch history table.
