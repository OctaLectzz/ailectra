# API Contracts — Ailectra

## 1. Server Actions

### `createConnectionAction`

Input:

```ts
{
  providerId: string
  label: string
  accountEmail?: string
  username?: string
  authType: "OFFICIAL_OAUTH" | "API_KEY" | "MANUAL_CREDENTIAL" | "DEEPLINK" | "EXTERNAL_URL"
  externalUrl?: string
  secret?: string
  notes?: string
}
```

Output:

```ts
{
  ok: boolean
  message: string
  fieldErrors?: Record<string, string[]>
  connectionId?: string
}
```

Rules:
- Must check session.
- Must validate provider exists.
- Must encrypt secret if provided.
- Must create audit log.

### `updateConnectionAction`

Same as create, but requires `connectionId`.

Rules:
- Must check ownership.
- Secret update optional.
- If secret empty, do not overwrite unless explicit delete flag.

### `deleteConnectionAction`

Input:

```ts
{ connectionId: string }
```

Rules:
- Must check ownership.
- Must delete related launch history or rely on cascade.
- Must create audit log.

### `updateSettingsAction`

Input:

```ts
{
  theme?: "DARK" | "LIGHT" | "SYSTEM"
  locale?: "EN" | "ID"
}
```

## 2. Route Handlers

### `POST /api/launch/[connectionId]`

Request:
- No body required for MVP.

Response success:

```ts
{
  ok: true,
  strategy: "redirect" | "manual_modal" | "api_key_info",
  url?: string,
  providerName: string,
  accountLabel: string,
  accountEmail?: string,
  maskedSecret?: string,
  message?: string
}
```

Response error:

```ts
{
  ok: false,
  message: string
}
```

Rules:
- Check auth.
- Check ownership.
- Create LaunchHistory.
- Never return raw secret by default.
- If manual credential reveal is needed, require separate reveal endpoint/action with confirmation.

### `POST /api/connections/[connectionId]/reveal`

Input:

```ts
{
  confirmation: "REVEAL_SECRET"
}
```

Response:

```ts
{
  ok: true,
  secret: string
}
```

Rules:
- Re-auth recommended for production.
- Log `secret.reveal`.
- Rate limit.
- Never cache.

## 3. Query Functions

### `getDashboardStats(userId)`

Returns:
- providerCount.
- connectionCount.
- launchesThisWeek.
- lastLaunchAt.

### `getUserConnections(userId)`

Returns:
- connection list with provider data.
- no encryptedSecret field.

### `getProviders()`

Returns:
- provider list.

### `getLaunchHistory(userId)`

Returns:
- paginated launch history.

## 4. Validation

Use Zod schemas in:

```txt
src/lib/validators.ts
src/features/accounts/validators.ts
src/features/auth/validators.ts
```

## 5. Error Format

Keep user-facing messages simple:

```ts
return {
  ok: false,
  message: "Unable to create connection. Please check your input."
}
```

Internal errors may be logged without secrets.
