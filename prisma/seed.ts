import { PrismaClient, ProviderStatus, AiAuthType, LaunchType } from "@prisma/client"

const prisma = new PrismaClient()

const providers = [
  {
    name: "Lovable",
    slug: "lovable",
    description: "Full-stack AI app builder designed for creating and deploying production-ready applications swiftly.",
    category: "AI App Builder",
    websiteUrl: "https://lovable.dev",
    logoUrl: "/images/providers/lovable.svg",
    color: "#ff007f",
    status: ProviderStatus.ACTIVE,
    isFeatured: true,
    supportedAuthTypes: [AiAuthType.EXTERNAL_URL, AiAuthType.MANUAL_CREDENTIAL],
    launchType: LaunchType.EXTERNAL_URL,
  },
  {
    name: "Claude",
    slug: "claude",
    description: "Next-generation AI assistant developed by Anthropic, specializing in deep analysis, coding, and creative writing.",
    category: "AI Assistant",
    websiteUrl: "https://claude.ai",
    logoUrl: "/images/providers/claude.svg",
    color: "#d97706",
    status: ProviderStatus.ACTIVE,
    isFeatured: true,
    supportedAuthTypes: [AiAuthType.EXTERNAL_URL, AiAuthType.MANUAL_CREDENTIAL],
    launchType: LaunchType.EXTERNAL_URL,
  },
  {
    name: "ChatGPT",
    slug: "chatgpt",
    description: "Versatile state-of-the-art conversational model by OpenAI, catering to general knowledge, instruction parsing, and productivity tasks.",
    category: "AI Assistant",
    websiteUrl: "https://chatgpt.com",
    logoUrl: "/images/providers/chatgpt.svg",
    color: "#10b981",
    status: ProviderStatus.ACTIVE,
    isFeatured: true,
    supportedAuthTypes: [AiAuthType.EXTERNAL_URL, AiAuthType.MANUAL_CREDENTIAL],
    launchType: LaunchType.EXTERNAL_URL,
  },
  {
    name: "Gemini",
    slug: "gemini",
    description: "Google's highly multimodal AI ecosystem, deeply integrated with Google Cloud, Workspace, and powerful reasoning systems.",
    category: "AI Assistant",
    websiteUrl: "https://gemini.google.com",
    logoUrl: "/images/providers/gemini.svg",
    color: "#2563eb",
    status: ProviderStatus.ACTIVE,
    isFeatured: true,
    supportedAuthTypes: [AiAuthType.EXTERNAL_URL, AiAuthType.MANUAL_CREDENTIAL],
    launchType: LaunchType.EXTERNAL_URL,
  },
  {
    name: "Perplexity",
    slug: "perplexity",
    description: "An AI-native conversational search engine providing direct, real-time citation-backed answers to queries.",
    category: "AI Search",
    websiteUrl: "https://www.perplexity.ai",
    logoUrl: "/images/providers/perplexity.svg",
    color: "#0d9488",
    status: ProviderStatus.ACTIVE,
    isFeatured: true,
    supportedAuthTypes: [AiAuthType.EXTERNAL_URL, AiAuthType.MANUAL_CREDENTIAL],
    launchType: LaunchType.EXTERNAL_URL,
  },
  {
    name: "Cursor",
    slug: "cursor",
    description: "An AI-powered fork of VS Code engineered to support pair programming, refactoring, and codebase indexing.",
    category: "AI Code Editor",
    websiteUrl: "https://cursor.com",
    logoUrl: "/images/providers/cursor.svg",
    color: "#3b82f6",
    status: ProviderStatus.ACTIVE,
    isFeatured: false,
    supportedAuthTypes: [AiAuthType.EXTERNAL_URL, AiAuthType.MANUAL_CREDENTIAL],
    launchType: LaunchType.EXTERNAL_URL,
  },
  {
    name: "V0",
    slug: "v0",
    description: "A generative UI companion by Vercel that turns natural language descriptions into pristine React and Tailwind interfaces.",
    category: "AI UI Generator",
    websiteUrl: "https://v0.dev",
    logoUrl: "/images/providers/v0.svg",
    color: "#000000",
    status: ProviderStatus.ACTIVE,
    isFeatured: false,
    supportedAuthTypes: [AiAuthType.EXTERNAL_URL, AiAuthType.MANUAL_CREDENTIAL],
    launchType: LaunchType.EXTERNAL_URL,
  },
  {
    name: "Bolt",
    slug: "bolt",
    description: "A full-stack, browser-native development ecosystem enabling compilation, execution, and deployment of complex frameworks.",
    category: "AI App Builder",
    websiteUrl: "https://bolt.new",
    logoUrl: "/images/providers/bolt.svg",
    color: "#8b5cf6",
    status: ProviderStatus.ACTIVE,
    isFeatured: false,
    supportedAuthTypes: [AiAuthType.EXTERNAL_URL, AiAuthType.MANUAL_CREDENTIAL],
    launchType: LaunchType.EXTERNAL_URL,
  },
  {
    name: "Replit AI",
    slug: "replit-ai",
    description: "Embedded AI agents and completion models built directly into the Replit collaborative online IDE workspace.",
    category: "AI Coding Platform",
    websiteUrl: "https://replit.com",
    logoUrl: "/images/providers/replit.svg",
    color: "#f97316",
    status: ProviderStatus.ACTIVE,
    isFeatured: false,
    supportedAuthTypes: [AiAuthType.EXTERNAL_URL, AiAuthType.MANUAL_CREDENTIAL],
    launchType: LaunchType.EXTERNAL_URL,
  },
  {
    name: "Grok",
    slug: "grok",
    description: "A witty conversational AI developed by xAI, powered by real-time updates directly from the X social networking network.",
    category: "AI Assistant",
    websiteUrl: "https://x.ai",
    logoUrl: "/images/providers/grok.svg",
    color: "#1e293b",
    status: ProviderStatus.ACTIVE,
    isFeatured: false,
    supportedAuthTypes: [AiAuthType.EXTERNAL_URL, AiAuthType.MANUAL_CREDENTIAL],
    launchType: LaunchType.EXTERNAL_URL,
  },
  {
    name: "DeepSeek",
    slug: "deepseek",
    description: "An advanced, high-reasoning open-source model specializing in highly complex technical reasoning, logic, and mathematics.",
    category: "AI Assistant",
    websiteUrl: "https://deepseek.com",
    logoUrl: "/images/providers/deepseek.svg",
    color: "#2563eb",
    status: ProviderStatus.ACTIVE,
    isFeatured: false,
    supportedAuthTypes: [AiAuthType.EXTERNAL_URL, AiAuthType.MANUAL_CREDENTIAL],
    launchType: LaunchType.EXTERNAL_URL,
  },
]

async function main() {
  console.log("Starting seeding AI Providers...")
  for (const provider of providers) {
    const upserted = await prisma.aiProvider.upsert({
      where: { slug: provider.slug },
      update: {
        name: provider.name,
        description: provider.description,
        category: provider.category,
        websiteUrl: provider.websiteUrl,
        logoUrl: provider.logoUrl,
        color: provider.color,
        status: provider.status,
        isFeatured: provider.isFeatured,
        supportedAuthTypes: provider.supportedAuthTypes,
        launchType: provider.launchType,
      },
      create: provider,
    })
    console.log(`Upserted provider: ${upserted.name} (${upserted.slug})`)
  }
  console.log("Seeding AI Providers completed successfully.")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error("Error occurred while seeding:", e)
    await prisma.$disconnect()
    process.exit(1)
  })
