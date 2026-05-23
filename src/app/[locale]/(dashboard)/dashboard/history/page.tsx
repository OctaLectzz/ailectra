import { HistoryDirectory } from "@/components/dashboard/history-directory"
import { DashboardShell } from "@/components/layout/dashboard-shell"
import prisma from "@/db/prisma"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

export default async function HistoryPage() {
  const session = await getServerSession(authOptions)
  
  // Find or fallback to dev user
  let userId = (session?.user as any)?.id
  if (!userId) {
    const devUser = await prisma.user.findFirst()
    userId = devUser?.id || ""
  }

  // Fetch launch logs
  const history = await prisma.launchHistory.findMany({
    where: { userId },
    include: {
      connection: {
        include: {
          provider: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  })

  return (
    <DashboardShell>
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-white">Launch History Logs</h2>
        <p className="text-sm text-slate-400">
          Review details of credentials disclosed and workspace sessions launched.
        </p>
      </div>

      <HistoryDirectory initialHistory={history} />
    </DashboardShell>
  )
}
export const dynamic = "force-dynamic"
