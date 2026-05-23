import { DashboardHeader } from "@/components/layout/dashboard-header"
import { DashboardSidebar } from "@/components/layout/dashboard-sidebar"
import { SessionProvider } from "@/components/providers/session-provider"
import React from "react"

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <div className="min-h-screen flex flex-col md:flex-row bg-void-navy text-foreground">
        {/* Sidebar Nav (collapsible on mobile, fixed on desktop) */}
        <DashboardSidebar />

        {/* Content Panel */}
        <div className="flex-1 flex flex-col md:pl-64 min-w-0">
          {/* Dashboard Header Bar */}
          <DashboardHeader />

          {/* Subpages wrapper */}
          <main className="flex-1 flex flex-col overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </SessionProvider>
  )
}
