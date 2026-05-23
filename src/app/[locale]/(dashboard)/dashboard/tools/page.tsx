import { ProviderDirectory } from "@/components/dashboard/provider-directory"
import { DashboardShell } from "@/components/layout/dashboard-shell"
import prisma from "@/db/prisma"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

export default async function ToolsPage() {
  const session = await getServerSession(authOptions)
  
  // Find or fallback to dev user
  let userId = (session?.user as any)?.id
  if (!userId) {
    const devUser = await prisma.user.findFirst()
    userId = devUser?.id || ""
  }

  // Fetch providers
  const providers = await prisma.aiProvider.findMany({
    orderBy: { name: "asc" },
  })

  // Fetch connections for count badge calculation
  const connections = await prisma.aiConnection.findMany({
    where: { userId },
    select: { providerId: true },
  })

  return (
    <DashboardShell>
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-white">AI Provider Directory</h2>
        <p className="text-sm text-slate-400">
          Browse supported services and connect your accounts securely to the credentials vault.
        </p>
      </div>

      {/* Directory filter wrapper */}
      <ProviderDirectory providers={providers} connections={connections} />
    </DashboardShell>
  )
}
export const dynamic = "force-dynamic"
