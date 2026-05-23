# Database Schema — Ailectra

## 1. ORM Decision

Default ORM: **Prisma**.  
Database: **PostgreSQL**.

Reason:
- Cocok untuk Next.js full-stack.
- Adapter Auth.js tersedia.
- Schema mudah dibaca agent.
- Migration jelas.
- Relasi user/account/session lebih mudah untuk MVP.

## 2. Prisma Schema Draft

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum ProviderStatus {
  ACTIVE
  BETA
  COMING_SOON
  DISABLED
}

enum AiAuthType {
  OFFICIAL_OAUTH
  API_KEY
  MANUAL_CREDENTIAL
  DEEPLINK
  EXTERNAL_URL
}

enum LaunchType {
  OFFICIAL_OAUTH
  API_KEY
  MANUAL_SECURE
  DEEPLINK
  EXTERNAL_URL
}

enum LaunchStatus {
  SUCCESS
  FAILED
  BLOCKED
  MANUAL_REQUIRED
}

enum ThemePreference {
  DARK
  LIGHT
  SYSTEM
}

enum LocalePreference {
  EN
  ID
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  passwordHash  String?

  accounts      Account[]
  sessions      Session[]

  settings      UserSettings?
  aiConnections AiConnection[]
  launchHistory LaunchHistory[]
  auditLogs     AuditLog[]

  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

model UserSettings {
  id       String @id @default(cuid())
  userId   String @unique

  theme    ThemePreference  @default(DARK)
  locale   LocalePreference @default(EN)

  user     User @relation(fields: [userId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model AiProvider {
  id          String @id @default(cuid())
  name        String
  slug        String @unique
  description String @db.Text
  category    String
  websiteUrl  String
  logoUrl     String?
  color       String?

  status      ProviderStatus @default(ACTIVE)
  isFeatured  Boolean @default(false)

  supportedAuthTypes AiAuthType[]
  launchType         LaunchType @default(EXTERNAL_URL)

  connections AiConnection[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model AiConnection {
  id         String @id @default(cuid())
  userId     String
  providerId String

  label       String
  accountEmail String?
  username     String?
  notes        String? @db.Text

  authType     AiAuthType
  launchType   LaunchType @default(EXTERNAL_URL)

  externalUrl  String?
  encryptedSecret String? @db.Text
  secretHint      String?
  metadata        Json?

  lastLaunchedAt DateTime?

  user      User @relation(fields: [userId], references: [id], onDelete: Cascade)
  provider  AiProvider @relation(fields: [providerId], references: [id], onDelete: Cascade)
  launches  LaunchHistory[]

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([userId])
  @@index([providerId])
  @@index([userId, providerId])
}

model LaunchHistory {
  id           String @id @default(cuid())
  userId       String
  connectionId String
  providerSlug String

  status       LaunchStatus
  launchType   LaunchType
  message      String?
  userAgent    String?
  ipHash       String?

  user       User @relation(fields: [userId], references: [id], onDelete: Cascade)
  connection AiConnection @relation(fields: [connectionId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())

  @@index([userId])
  @@index([connectionId])
  @@index([createdAt])
}

model AuditLog {
  id        String @id @default(cuid())
  userId    String?
  action    String
  entity    String?
  entityId  String?
  metadata  Json?

  user      User? @relation(fields: [userId], references: [id], onDelete: SetNull)

  createdAt DateTime @default(now())

  @@index([userId])
  @@index([action])
  @@index([createdAt])
}
```

## 3. Seed AI Providers

Seed awal:

```ts
const providers = [
  {
    name: "Lovable",
    slug: "lovable",
    category: "AI App Builder",
    websiteUrl: "https://lovable.dev",
    launchType: "EXTERNAL_URL",
    supportedAuthTypes: ["EXTERNAL_URL", "MANUAL_CREDENTIAL"],
    isFeatured: true,
  },
  {
    name: "Claude",
    slug: "claude",
    category: "AI Assistant",
    websiteUrl: "https://claude.ai",
    launchType: "EXTERNAL_URL",
    supportedAuthTypes: ["EXTERNAL_URL", "MANUAL_CREDENTIAL"],
    isFeatured: true,
  },
  {
    name: "ChatGPT",
    slug: "chatgpt",
    category: "AI Assistant",
    websiteUrl: "https://chatgpt.com",
    launchType: "EXTERNAL_URL",
    supportedAuthTypes: ["EXTERNAL_URL", "MANUAL_CREDENTIAL"],
    isFeatured: true,
  },
  {
    name: "Gemini",
    slug: "gemini",
    category: "AI Assistant",
    websiteUrl: "https://gemini.google.com",
    launchType: "EXTERNAL_URL",
    supportedAuthTypes: ["EXTERNAL_URL", "MANUAL_CREDENTIAL"],
    isFeatured: true,
  },
  {
    name: "Perplexity",
    slug: "perplexity",
    category: "AI Search",
    websiteUrl: "https://www.perplexity.ai",
    launchType: "EXTERNAL_URL",
    supportedAuthTypes: ["EXTERNAL_URL", "MANUAL_CREDENTIAL"],
    isFeatured: true,
  },
]
```

## 4. Data Safety Rules

- `encryptedSecret` wajib terenkripsi.
- `passwordHash` hanya untuk akun Ailectra, bukan password AI provider.
- Jangan pernah menampilkan `encryptedSecret`.
- Jangan log `encryptedSecret`, access token, refresh token.
- Kalau user delete account, hapus connections dan sessions.

## 5. Query Rules

Semua query user-owned data wajib filter:

```ts
where: {
  id: connectionId,
  userId: session.user.id
}
```

Jangan query by ID saja untuk data sensitif.

## 6. Indexing

Wajib index:
- `AiConnection.userId`
- `AiConnection.providerId`
- `LaunchHistory.userId`
- `LaunchHistory.connectionId`
- `LaunchHistory.createdAt`
- `AuditLog.userId`
- `AuditLog.action`
