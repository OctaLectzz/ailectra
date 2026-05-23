"use client"

import { EmptyState } from "@/components/common/empty-state"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  History,
  XCircle
} from "lucide-react"
import { useTranslations } from "next-intl"

interface LaunchHistoryItem {
  id: string
  status: string
  launchType: string
  message?: string | null
  createdAt: Date | string
  connection: {
    label: string
    authType: string
    provider: {
      name: string
      slug: string
      color?: string | null
    }
  }
}

interface LaunchHistoryTableProps {
  history: LaunchHistoryItem[]
}

export function LaunchHistoryTable({ history }: LaunchHistoryTableProps) {
  const t = useTranslations("dashboard")

  if (!history || history.length === 0) {
    return (
      <div className="bg-[#0b1020] border border-[#11172a] rounded-2xl p-8">
        <EmptyState
          title={t("noLaunches")}
          description={t("noLaunchesDesc")}
          icon={<History className="w-8 h-8" />}
        />
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return <CheckCircle2 className="w-4 h-4 text-emerald-500 mr-1.5" />
      case "FAILED":
        return <XCircle className="w-4 h-4 text-red-500 mr-1.5" />
      default:
        return <AlertCircle className="w-4 h-4 text-amber-500 mr-1.5" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-xs rounded-full">
            Success
          </Badge>
        )
      case "FAILED":
        return (
          <Badge className="bg-red-500/10 text-red-500 border-red-500/20 text-xs rounded-full">
            Failed
          </Badge>
        )
      case "MANUAL_REQUIRED":
        return (
          <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-xs rounded-full">
            Manual Copy
          </Badge>
        )
      default:
        return (
          <Badge className="bg-slate-500/10 text-slate-400 border-slate-500/20 text-xs rounded-full">
            {status}
          </Badge>
        )
    }
  }

  return (
    <div className="bg-[#0b1020] border border-[#11172a] rounded-2xl overflow-hidden shadow-xl">
      <Table>
        <TableHeader className="bg-[#070a18] border-b border-[#11172a]">
          <TableRow className="border-b border-[#11172a] hover:bg-transparent">
            <TableHead className="text-slate-400 text-xs font-semibold py-4 px-6">Timestamp</TableHead>
            <TableHead className="text-slate-400 text-xs font-semibold py-4 px-6">AI Provider</TableHead>
            <TableHead className="text-slate-400 text-xs font-semibold py-4 px-6">Account Label</TableHead>
            <TableHead className="text-slate-400 text-xs font-semibold py-4 px-6">Launch Strategy</TableHead>
            <TableHead className="text-slate-400 text-xs font-semibold py-4 px-6">Status</TableHead>
            <TableHead className="text-slate-400 text-xs font-semibold py-4 px-6">Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((item) => {
            const brandColor = item.connection.provider.color || "#8B5CF6"
            const formattedDate = new Date(item.createdAt).toLocaleString(undefined, {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            })

            return (
              <TableRow key={item.id} className="border-b border-[#11172a]/50 hover:bg-[#070a18]/30 transition-colors">
                {/* Timestamp */}
                <TableCell className="text-slate-300 text-xs font-medium py-3.5 px-6 flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-2 text-slate-500" />
                  {formattedDate}
                </TableCell>

                {/* Provider name and color label */}
                <TableCell className="py-3.5 px-6">
                  <div className="flex items-center space-x-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: brandColor }}
                    />
                    <span className="text-slate-200 text-xs font-semibold">
                      {item.connection.provider.name}
                    </span>
                  </div>
                </TableCell>

                {/* Account Label */}
                <TableCell className="text-slate-300 text-xs font-medium py-3.5 px-6">
                  {item.connection.label}
                </TableCell>

                {/* Strategy */}
                <TableCell className="text-slate-400 text-xs py-3.5 px-6 font-mono">
                  {item.launchType}
                </TableCell>

                {/* Status */}
                <TableCell className="py-3.5 px-6">
                  <div className="flex items-center">
                    {getStatusIcon(item.status)}
                    {getStatusBadge(item.status)}
                  </div>
                </TableCell>

                {/* Message */}
                <TableCell className="text-slate-500 text-xs py-3.5 px-6 max-w-[200px] truncate">
                  {item.message || "-"}
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
export default LaunchHistoryTable
