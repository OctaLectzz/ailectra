import { SecurityStatusCard } from "@/components/dashboard/security-status-card"
import { DashboardShell } from "@/components/layout/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import prisma from "@/db/prisma"
import { authOptions } from "@/lib/auth"
import { Activity } from "lucide-react"
import { getServerSession } from "next-auth"

export default async function SecurityPage() {
  const session = await getServerSession(authOptions)
  
  // Find or fallback to dev user
  let userId = (session?.user as any)?.id
  if (!userId) {
    const devUser = await prisma.user.findFirst()
    userId = devUser?.id || ""
  }

  // Fetch security audit logs
  const auditLogs = await prisma.auditLog.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 10,
  })

  return (
    <DashboardShell>
      <div className="space-y-1">
        <h2 className="text-2xl font-bold tracking-tight text-white">Security & Vault</h2>
        <p className="text-sm text-slate-400">
          Configure security settings, review audit trails, and verify vault integrity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Policies */}
        <div className="lg:col-span-1">
          <SecurityStatusCard />
        </div>

        {/* Audit Logs */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-[#0b1020] border-[#11172a] hover:border-slate-800 transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-white flex items-center">
                <Activity className="w-5 h-5 mr-2 text-primary" />
                Recent Security Logs
              </CardTitle>
              <CardDescription className="text-slate-400 text-xs">
                Real-time security logs showing credential mutations and vault events.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 sm:p-6 sm:pt-0">
              {auditLogs.length === 0 ? (
                <div className="text-center py-10 text-slate-500 text-xs">
                  No security events logged yet.
                </div>
              ) : (
                <Table>
                  <TableHeader className="bg-[#070a18] border-b border-[#11172a]">
                    <TableRow className="border-b border-[#11172a] hover:bg-transparent">
                      <TableHead className="text-slate-400 text-xs font-semibold py-3 px-4">Event Time</TableHead>
                      <TableHead className="text-slate-400 text-xs font-semibold py-3 px-4">Action</TableHead>
                      <TableHead className="text-slate-400 text-xs font-semibold py-3 px-4">Entity Type</TableHead>
                      <TableHead className="text-slate-400 text-xs font-semibold py-3 px-4">Metadata</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {auditLogs.map((log) => {
                      const formattedDate = new Date(log.createdAt).toLocaleString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })

                      return (
                        <TableRow key={log.id} className="border-b border-[#11172a]/50 hover:bg-[#070a18]/20 transition-colors">
                          <TableCell className="text-slate-300 text-xs py-3 px-4 font-medium">{formattedDate}</TableCell>
                          <TableCell className="text-slate-200 text-xs py-3 px-4">
                            <span className="bg-slate-900 border border-[#11172a] text-primary px-2 py-0.5 rounded font-mono text-[10px]">
                              {log.action}
                            </span>
                          </TableCell>
                          <TableCell className="text-slate-400 text-xs py-3 px-4">{log.entity || "-"}</TableCell>
                          <TableCell className="text-slate-500 text-xs py-3 px-4 max-w-[200px] truncate">
                            {JSON.stringify(log.metadata) || "-"}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardShell>
  )
}
export const dynamic = "force-dynamic"
