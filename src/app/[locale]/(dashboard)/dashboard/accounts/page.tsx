import { ConnectionsDirectory } from "@/components/dashboard/connections-directory"
import { DashboardShell } from "@/components/layout/dashboard-shell"
import prisma from "@/db/prisma"
import { authOptions } from "@/lib/auth"
import { getUserConnections } from "@/server/queries/account-queries"
import { getServerSession } from "next-auth"

export default async function AccountsPage() {
  const session = await getServerSession(authOptions)
  
  // Find or fallback to dev user
  let userId = (session?.user as any)?.id
  if (!userId) {
    const devUser = await prisma.user.findFirst()
    userId = devUser?.id || ""
  }

  // Fetch connections for the current user using sanitized query wrapper
  const connections = await getUserConnections(userId)

  return (
    <DashboardShell>
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-white">Connected Accounts</h2>
        <p className="text-sm text-slate-400">
          Manage your vault-encrypted credentials and launch workflows from one panel.
        </p>
      </div>

      <ConnectionsDirectory initialConnections={connections} />
    </DashboardShell>
  )
}
export const dynamic = "force-dynamic"
