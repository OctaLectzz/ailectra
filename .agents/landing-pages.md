# Landing Pages Specification — Ailectra

## 1. Pages

Landing public harus multi-page:

```txt
/[locale]
/[locale]/features
/[locale]/integrations
/[locale]/security
/[locale]/pricing
/[locale]/about
/[locale]/contact
```

## 2. Home Page Structure

### 2.1 Hero Section

Goal:
- Menjelaskan produk dalam 5 detik.
- Visual futuristik.
- CTA jelas.

Content:
- Eyebrow: `AI Access Hub`
- Title: `One access hub for every AI account`
- Description: `Connect, organize, and launch your AI tools from one futuristic dashboard.`
- CTA Primary: `Get Started`
- CTA Secondary: `Explore Integrations`

Visual:
- Three.js AI Orbit.
- Provider icons mengelilingi core Ailectra.
- Background beams/aurora.

### 2.2 Provider Logo Cloud

Tampilkan:
- Lovable
- Claude
- ChatGPT
- Gemini
- Perplexity
- Cursor
- V0
- Bolt
- Replit AI

Effect:
- Magic UI marquee atau subtle animated logo grid.

### 2.3 Feature Bento

Cards:
- Multi-account vault.
- Quick launch.
- Secure credential storage.
- Launch history.
- Theme & language.
- AI provider directory.

Use:
- Aceternity Bento Grid / Magic UI cards.

### 2.4 How It Works

Steps:
1. Sign in to Ailectra.
2. Add your AI tools.
3. Connect multiple accounts.
4. Launch the right account instantly.

Visual:
- Animated beam connecting steps.

### 2.5 Animated Graph Section

Graph:
- Nodes = AI providers.
- Edges = account connections.
- Center = Ailectra.

Implementation options:
- SVG + Framer Motion.
- React Flow later.
- Three.js for hero only.

### 2.6 Security Section

Message:
- Encrypted vault.
- User-controlled credentials.
- Official integrations preferred.
- No cookie/session hijacking.

Visual:
- Vault card.
- Grid background.
- Lock icon glow.

### 2.7 Dashboard Preview

Display:
- Mock dashboard cards.
- Connected account cards.
- Usage chart.
- Recent launch table.

### 2.8 FAQ

Questions:
- Can Ailectra auto-login into every AI?
- Is it safe to store credentials?
- Does it support Google login?
- Can I use multiple Lovable accounts?
- Is Indonesian language supported?

### 2.9 CTA

Title:
`Ready to organize your AI workspace?`

Buttons:
- Get Started.
- View Security.

## 3. Features Page

Sections:
- Feature hero.
- Feature detail cards.
- Workflow.
- Dashboard screenshots/mockups.
- CTA.

## 4. Integrations Page

Sections:
- Integration hero.
- Provider grid.
- Filter by category.
- Auth method badges.
- Coming soon providers.
- CTA.

Provider card fields:
- logo.
- name.
- category.
- supported auth types.
- status.
- website URL.

## 5. Security Page

Sections:
- Security hero.
- What Ailectra stores.
- What Ailectra never does.
- Encryption explanation.
- Launch safety.
- FAQ.
- CTA.

Important copy:
- Ailectra does not bypass third-party login systems.
- Ailectra prioritizes official OAuth/API/deep-link flows.

## 6. Pricing Page

MVP pricing placeholder:
- Free.
- Pro Coming Soon.
- Team Coming Soon.

Cards:
- Free: basic account management.
- Pro: encrypted vault, advanced history, more providers.
- Team: workspace, role permissions.

## 7. About Page

Sections:
- Why Ailectra.
- Mission.
- Product principles.
- Roadmap teaser.

## 8. Contact Page

Sections:
- Contact hero.
- Contact form placeholder.
- Support email placeholder.
- FAQ link.

## 9. Landing Animation Budget

- Hero: rich animation.
- Feature sections: moderate.
- Footer/FAQ: minimal.
- Disable heavy effects on small screens if laggy.
- Lazy load Three.js.
