import { ConnectionCard } from "@/components/dashboard/connection-card"
import { DashboardChart } from "@/components/dashboard/dashboard-chart"
import { LaunchHistoryTable } from "@/components/dashboard/launch-history-table"
import { SecurityStatusCard } from "@/components/dashboard/security-status-card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Button } from "@/components/ui/button"
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
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {t("overview") === "Ikhtisar" ? "Selamat Datang di Command Center" : "Welcome to your Command Center"}
          </h2>
          <p className="text-sm text-slate-400">
            {t("overview") === "Ikhtisar"
              ? "Kelola koneksi AI Anda dan pantau riwayat peluncuran dengan aman."
              : "Manage your AI credentials and monitor launch history securely."}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            asChild
            variant="default"
            className="bg-primary hover:bg-primary-hover text-white rounded-xl px-5 shadow-lg shadow-primary/10"
          >
            <Link href="/dashboard/accounts/new">
              <Plus className="w-4 h-4 mr-1.5" />
              {t("addConnection")}
            </Link>
          </Button>
        </div>
      </div>

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
        <div className="lg:col-span-2">
          <DashboardChart
            data={chartData}
            title={t("overview") === "Ikhtisar" ? "Volume Peluncuran 7 Hari Terakhir" : "Launch Activity (Last 7 Days)"}
          />
        </div>
        <div>
          <SecurityStatusCard />
        </div>
      </div>

      {/* Recent Activities section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Connections Grid */}
        <div className="xl:col-span-1 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white">{t("recentConnections")}</h3>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary-hover hover:bg-primary/5 text-xs rounded-xl"
            >
              <Link href="/dashboard/accounts">
                View all
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
          </div>
          
          {recentConnections.length === 0 ? (
            <div className="bg-[#0b1020] border border-[#11172a] rounded-2xl p-6 text-center text-xs text-slate-500">
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
            <h3 className="text-base font-bold text-white">{t("recentLaunches")}</h3>
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="text-primary hover:text-primary-hover hover:bg-primary/5 text-xs rounded-xl"
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

