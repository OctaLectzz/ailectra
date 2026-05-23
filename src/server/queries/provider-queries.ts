import prisma from "@/db/prisma"

export async function getProviders() {
  try {
    return await prisma.aiProvider.findMany({
      orderBy: { name: "asc" },
    })
  } catch (error) {
    console.error("Failed to fetch providers:", error)
    return []
  }
}

export async function getProviderBySlug(slug: string) {
  try {
    return await prisma.aiProvider.findUnique({
      where: { slug },
    })
  } catch (error) {
    console.error(`Failed to fetch provider ${slug}:`, error)
    return null
  }
}
