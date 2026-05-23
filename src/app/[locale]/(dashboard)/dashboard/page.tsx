import { ConnectionCard } from "@/components/dashboard/connection-card"
import { DashboardChart } from "@/components/dashboard/dashboard-chart"
import { LaunchHistoryTable } from "@/components/dashboard/launch-history-table"
import { SecurityStatusCard } from "@/components/dashboard/security-status-card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Button } from "@/components/ui/button"
import { PageHeader } from "@/components/ui/page-header"
import prisma from "@/db/prisma"
import { Link } from "@/i18n/routing"
import { authOptions } from "@/lib/auth"
import {
  getDashboardStats,
  getLaunchHistory,
  getLaunchStatsByDay,
  getUserConnections,
} from "@/server/queries/account-queries"
import {
  Activity,
  ArrowRight,
  KeyRound,
  Plus,
  ShieldAlert,
  Sparkles,
} from "lucide-react"
import { getServerSession } from "next-auth"
import { getTranslations } from "next-intl/server"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)
  
  // Find or fallback to dev user
  let userId = (session?.user as any)?.id
  if (!userId) {
    const devUser = await prisma.user.findFirst()
    userId = devUser?.id || ""
  }

  // Fetch data
  const stats = await getDashboardStats(userId)
  const connections = await getUserConnections(userId)
  const history = await getLaunchHistory(userId, 5)
  const chartData = await getLaunchStatsByDay(userId)
  const t = await getTranslations("dashboard")

  const recentConnections = connections.slice(0, 3)

  return (
    <DashboardShell>
      {/* Top Banner */}
      <PageHeader
        title={t("overview") === "Ikhtisar" ? "Command Center" : "Command Center"}
        description={t("overview") === "Ikhtisar"
          ? "Kelola koneksi AI Anda dan pantau riwayat peluncuran dengan aman."
          : "Manage your AI credentials and monitor launch history securely."}
        actions={
          <Button
            asChild
            variant="default"
            className="bg-primary hover:bg-primary-hover text-white rounded-xl px-5 shadow-[0_0_15px_rgba(34,211,238,0.4)] transition-all hover:scale-105"
          >
            <Link href="/dashboard/accounts/new">
              <Plus className="w-4 h-4 mr-1.5" />
              {t("addConnection")}
            </Link>
          </Button>
        }
      />

      {/* Grid of Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title={t("totalConnections")}
          value={stats.connectionCount}
          description="Active credentials configured"
          icon={KeyRound}
        />
        <StatsCard
          title={t("totalProviders")}
          value={stats.providerCount}
          description="Seeded AI directories"
          icon={Sparkles}
        />
        <StatsCard
          title={t("launchesThisWeek")}
          value={stats.launchesThisWeek}
          description="Session launches in last 7d"
          icon={Activity}
        />
        <StatsCard
          title={t("securityStatus")}
          value={stats.securityScore}
          description="Vault encryption strength"
          icon={ShieldAlert}
        />
      </div>

      {/* Analytics and Security section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 min-h-[300px]">
          <DashboardChart
            data={chartData}
            title={t("overview") === "Ikhtisar" ? "Volume Peluncuran 7 Hari Terakhir" : "Launch Activity (Last 7 Days)"}
          />
        </div>
        <div className="min-h-[300px]">
          <SecurityStatusCard />
        </div>
      </div>

      {/* Recent Activities section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 pb-12">
        {/* Recent Connections Grid */}
        <div className="xl:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center">
              <KeyRound className="w-4 h-4 mr-2 text-primary" />
              {t("recentConnections")}
            </h3>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white hover:bg-slate-800 text-xs rounded-xl transition-all"
            >
              <Link href="/dashboard/accounts">
                View all
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </div>
          
          {recentConnections.length === 0 ? (
            <div className="bg-[#050712]/60 backdrop-blur-md border border-slate-800/60 rounded-2xl p-6 text-center text-xs text-slate-500">
              No accounts connected. Click "Add Connection" above to get started.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {recentConnections.map((conn) => (
                <ConnectionCard key={conn.id} connection={conn} />
              ))}
            </div>
          )}
        </div>

        {/* Recent Launches Logs */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center">
              <History className="w-4 h-4 mr-2 text-primary" />
              {t("recentLaunches")}
            </h3>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-slate-400 hover:text-white hover:bg-slate-800 text-xs rounded-xl transition-all"
            >
              <Link href="/dashboard/history">
                View logs
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </div>

          <LaunchHistoryTable history={history} />
        </div>
      </div>
    </DashboardShell>
  )
}

