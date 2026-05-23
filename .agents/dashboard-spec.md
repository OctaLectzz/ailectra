# Dashboard Specification — Ailectra

## 1. Dashboard Goal

Dashboard adalah tempat utama user mengelola AI providers dan connected accounts. Harus cepat, jelas, dan aman.

## 2. Layout

Desktop:
- Sidebar kiri.
- Header atas.
- Content grid.

Mobile:
- Top header.
- Sidebar via Sheet.
- Cards full width.

## 3. Navigation

Menu:
- Overview.
- AI Tools.
- Connected Accounts.
- Add Connection.
- Launch History.
- Security.
- Settings.
- Help.

## 4. Overview Page

Widgets:
- Total connected accounts.
- Total providers.
- Launches this week.
- Security status.
- Recent connections.
- Recent launch history.
- Animated usage chart.

## 5. AI Tools Page

Features:
- Provider grid.
- Search provider.
- Filter category.
- Badge auth method.
- Status badge.

Provider card:
- Logo.
- Name.
- Category.
- Short description.
- Connected account count.
- Add account button.

## 6. Connected Accounts Page

Features:
- Grid of account cards.
- Search by provider/account label.
- Filter provider.
- Launch button.
- Edit.
- Delete.

Card content:
- Provider logo.
- Label.
- Email/username.
- Auth type.
- Last launched.
- Status.
- CTA Launch.

## 7. Add Connection Page

Form fields:
- Provider select.
- Label.
- Account email.
- Username.
- Auth type.
- External URL.
- Secret/API key/password optional.
- Notes.

Validation:
- Label required.
- Provider required.
- Auth type required.
- External URL valid if provided.
- Secret optional but encrypted if submitted.

UX:
- Explain safe options.
- Show warning for manual credentials.
- Confirm checkbox for storing sensitive secret.

## 8. Launch History Page

Table columns:
- Time.
- Provider.
- Account label.
- Launch type.
- Status.
- Message.

Filters:
- Provider.
- Status.
- Date range optional.

## 9. Security Page

Sections:
- Credential vault status.
- Recent security events.
- Active sessions placeholder.
- Export/delete data placeholder.
- Rate limit/security notes.

## 10. Settings Page

Tabs:
- Profile.
- Preferences.
- Security.
- Danger Zone.

Preferences:
- Theme.
- Language.
- Default launch behavior.

## 11. Empty States

### No Connections

Title:
`No AI accounts connected yet`

Description:
`Add your first AI account and launch it from Ailectra.`

CTA:
`Add Connection`

### No Launch History

Title:
`No launches yet`

Description:
`Your recent AI account launches will appear here.`

## 12. Dashboard Motion

Use subtle:
- Card hover lift.
- Sidebar active indicator.
- Dialog fade/scale.
- Chart animation.

Avoid:
- Background beams everywhere.
- Heavy Three.js in dashboard.
- Infinite flashy animation.

## 13. Dashboard Security UX

For manual credentials:
- Mask by default.
- Reveal requires confirmation.
- Copy action logs `secret.reveal`.
- Show last updated.
- Let user delete credential.
