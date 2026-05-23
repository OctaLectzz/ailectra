import { AddConnectionForm } from "@/components/dashboard/add-connection-form"
import { DashboardShell } from "@/components/layout/dashboard-shell"
import prisma from "@/db/prisma"

interface NewAccountPageProps {
  searchParams: Promise<{ provider?: string }>
}

export default async function NewAccountPage({ searchParams }: NewAccountPageProps) {
  const { provider = null } = await searchParams

  // Fetch providers list to choose from
  const providers = await prisma.aiProvider.findMany({
    orderBy: { name: "asc" },
  })

  // Map types to conform with client-side form options
  const mappedProviders = providers.map((p) => ({
    id: p.id,
    name: p.name,
    slug: p.slug,
    color: p.color,
    supportedAuthTypes: p.supportedAuthTypes.map((t) => t.toLowerCase()),
    websiteUrl: p.websiteUrl,
  }))

  return (
    <DashboardShell>
      <AddConnectionForm
        providers={mappedProviders}
        preselectedProviderSlug={provider}
      />
    </DashboardShell>
  )
}
export const dynamic = "force-dynamic"
