# SEO and i18n — Ailectra

## 1. Default Locale

Default language: English (`en`).

Supported:
- English (`en`)
- Indonesian (`id`)

Route structure:

```txt
/en
/id
/en/features
/id/features
/en/integrations
/id/integrations
/en/security
/id/security
```

## 2. i18n Library

Gunakan `next-intl`.

Suggested files:

```txt
src/i18n/routing.ts
src/i18n/request.ts
src/i18n/messages/en.json
src/i18n/messages/id.json
```

## 3. Translation Structure

```json
{
  "site": {
    "name": "Ailectra",
    "tagline": "One Access for Every AI"
  },
  "nav": {
    "features": "Features",
    "integrations": "Integrations",
    "security": "Security",
    "pricing": "Pricing",
    "login": "Login",
    "getStarted": "Get Started"
  },
  "home": {
    "heroTitle": "One access hub for every AI account",
    "heroDescription": "Connect, organize, and launch your AI tools from one futuristic dashboard."
  }
}
```

## 4. SEO Metadata

Setiap page wajib punya:

- title.
- description.
- keywords optional.
- openGraph.
- twitter.
- alternates canonical.
- alternates languages.

Contoh helper:

```ts
export function createMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
}: {
  title: string
  description: string
  path: string
  image?: string
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: `/en${path}`,
        id: `/id${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Ailectra",
      images: [image],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  }
}
```

## 5. OG Image

Implementasikan:

```txt
src/app/opengraph-image.tsx
```

OG image berisi:
- Logo Ailectra.
- Tagline.
- Futuristic gradient.
- AI orbit/grid.
- Ukuran 1200x630.

Contoh visual:
- Background dark navy.
- Neon violet/cyan radial glow.
- Big text "Ailectra".
- Subtitle "One Access for Every AI".
- Small provider icons.

## 6. Sitemap

Implementasikan:

```txt
src/app/sitemap.ts
```

Masukkan public pages untuk EN dan ID.

## 7. Robots

Implementasikan:

```txt
src/app/robots.ts
```

Dashboard jangan diindex:

```txt
Disallow: /en/dashboard
Disallow: /id/dashboard
```

## 8. JSON-LD

Tambahkan WebApplication schema di root marketing layout:

```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Ailectra",
  "applicationCategory": "ProductivityApplication",
  "operatingSystem": "Web",
  "description": "A futuristic AI account access hub."
}
```

## 9. SEO Copy Direction

English:
- "AI access hub"
- "Connect and launch every AI account"
- "Secure dashboard for AI tools"

Indonesian:
- "Pusat akses AI"
- "Hubungkan dan buka semua akun AI"
- "Dashboard aman untuk tools AI"

## 10. Metadata Per Page

### Home

Title:
```txt
Ailectra — One Access for Every AI
```

Description:
```txt
Connect, organize, and launch your AI tools from one futuristic dashboard.
```

### Features

Title:
```txt
Features — Ailectra
```

Description:
```txt
Explore AI account management, secure vault, quick launch, and animated dashboard features.
```

### Integrations

Title:
```txt
AI Integrations — Ailectra
```

Description:
```txt
Manage access to Lovable, Claude, ChatGPT, Gemini, Perplexity, Cursor, and more.
```

### Security

Title:
```txt
Security — Ailectra
```

Description:
```txt
Learn how Ailectra protects your AI account metadata and encrypted credentials.
```
