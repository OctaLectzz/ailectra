export type AiProvider = {
  name: string
  slug: string
  category: "chatbot" | "coding" | "search" | "design" | "platform"
  authTypes: ("oauth" | "api_key" | "manual" | "deeplink")[]
  status: "supported" | "coming_soon"
  websiteUrl: string
  /** Short description for integrations page */
  description: string
}

export const aiProviders: AiProvider[] = [
  {
    name: "ChatGPT",
    slug: "chatgpt",
    category: "chatbot",
    authTypes: ["oauth", "manual"],
    status: "supported",
    websiteUrl: "https://chat.openai.com",
    description: "OpenAI's conversational AI assistant for text generation, analysis, and creative tasks.",
  },
  {
    name: "Claude",
    slug: "claude",
    category: "chatbot",
    authTypes: ["oauth", "api_key"],
    status: "supported",
    websiteUrl: "https://claude.ai",
    description: "Anthropic's advanced AI assistant built for safety, reasoning, and long-form analysis.",
  },
  {
    name: "Gemini",
    slug: "gemini",
    category: "chatbot",
    authTypes: ["oauth", "api_key"],
    status: "supported",
    websiteUrl: "https://gemini.google.com",
    description: "Google's multimodal AI for text, code, images, and integrated Google Workspace.",
  },
  {
    name: "Perplexity",
    slug: "perplexity",
    category: "search",
    authTypes: ["oauth", "api_key"],
    status: "supported",
    websiteUrl: "https://perplexity.ai",
    description: "AI-powered search engine that provides cited, real-time answers to complex queries.",
  },
  {
    name: "Cursor",
    slug: "cursor",
    category: "coding",
    authTypes: ["manual", "deeplink"],
    status: "supported",
    websiteUrl: "https://cursor.sh",
    description: "AI-first code editor with intelligent autocomplete, debugging, and code generation.",
  },
  {
    name: "Lovable",
    slug: "lovable",
    category: "platform",
    authTypes: ["oauth", "manual"],
    status: "supported",
    websiteUrl: "https://lovable.dev",
    description: "AI-powered full-stack app builder that turns prompts into production-ready applications.",
  },
  {
    name: "V0",
    slug: "v0",
    category: "design",
    authTypes: ["oauth"],
    status: "supported",
    websiteUrl: "https://v0.dev",
    description: "Vercel's AI UI generator that creates React components from text and image prompts.",
  },
  {
    name: "Bolt",
    slug: "bolt",
    category: "platform",
    authTypes: ["manual"],
    status: "supported",
    websiteUrl: "https://bolt.new",
    description: "AI-powered development sandbox for building, running, and deploying full-stack apps.",
  },
  {
    name: "Replit AI",
    slug: "replit-ai",
    category: "coding",
    authTypes: ["oauth", "manual"],
    status: "supported",
    websiteUrl: "https://replit.com",
    description: "Cloud IDE with AI coding assistant, deployment, and collaborative development tools.",
  },
  {
    name: "Midjourney",
    slug: "midjourney",
    category: "design",
    authTypes: ["manual"],
    status: "coming_soon",
    websiteUrl: "https://midjourney.com",
    description: "AI image generation tool creating stunning artwork from text descriptions.",
  },
  {
    name: "GitHub Copilot",
    slug: "github-copilot",
    category: "coding",
    authTypes: ["oauth"],
    status: "coming_soon",
    websiteUrl: "https://github.com/features/copilot",
    description: "AI pair programmer that suggests code completions across all major editors.",
  },
  {
    name: "Notion AI",
    slug: "notion-ai",
    category: "platform",
    authTypes: ["oauth"],
    status: "coming_soon",
    websiteUrl: "https://notion.so",
    description: "AI-powered workspace for notes, docs, and project management with smart assistants.",
  },
]

export const providerCategories = [
  { value: "all", label: "All" },
  { value: "chatbot", label: "Chatbot" },
  { value: "coding", label: "Coding" },
  { value: "search", label: "Search" },
  { value: "design", label: "Design" },
  { value: "platform", label: "Platform" },
] as const
