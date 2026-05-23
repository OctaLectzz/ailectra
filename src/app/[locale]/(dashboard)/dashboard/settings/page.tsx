import { SettingsTabs } from "@/components/dashboard/settings-tabs"
import { DashboardShell } from "@/components/layout/dashboard-shell"
import prisma from "@/db/prisma"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

export default async function SettingsPage() {
  const session = await getServerSession(authOptions)
  
  let userId = (session?.user as any)?.id
  let userDetails: any = session?.user
  
  // Find or fallback to dev user
  if (!userId) {
    const devUser = await prisma.user.findFirst()
    userId = devUser?.id || ""
    userDetails = {
      name: devUser?.name || "Dev User",
      email: devUser?.email || "dev@ailectra.app",
      image: devUser?.image || null,
    }
  }

  return (
    <DashboardShell>
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-white">System Settings</h2>
        <p className="text-sm text-slate-400">
          Configure Ailectra user parameters, dashboard localizations, and theme properties.
        </p>
      </div>

      <SettingsTabs user={userDetails} />
    </DashboardShell>
  )
}
export const dynamic = "force-dynamic"
