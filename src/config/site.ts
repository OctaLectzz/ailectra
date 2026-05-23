export const siteConfig = {
  name: "Ailectra",
  tagline: "One Access for Every AI",
  description:
    "Connect, organize, and launch your AI tools from one futuristic dashboard.",
  url: process.env.APP_URL ?? "https://ailectra.app",
  ogImage: "/opengraph-image",
  links: {
    github: "https://github.com/ailectra",
    twitter: "https://twitter.com/ailectra",
  },
} as const
