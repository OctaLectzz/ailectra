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
import { useEffect, useState } from "react"

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

const FormattedDate = ({ date }: { date: string | Date }) => {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  if (!mounted) return <span className="text-transparent">Loading...</span>
  
  const formattedDate = new Date(date).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
  
  return <span>{formattedDate}</span>
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
          <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 text-xs rounded-full shadow-none font-medium px-2 py-0.5">
            Success
          </Badge>
        )
      case "FAILED":
        return (
          <Badge className="bg-red-500/10 text-red-500 border-red-500/20 text-xs rounded-full shadow-none font-medium px-2 py-0.5">
            Failed
          </Badge>
        )
      case "MANUAL_REQUIRED":
        return (
          <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-xs rounded-full shadow-none font-medium px-2 py-0.5">
            Manual Copy
          </Badge>
        )
      default:
        return (
          <Badge className="bg-slate-500/10 text-slate-400 border-slate-500/20 text-xs rounded-full shadow-none font-medium px-2 py-0.5">
            {status}
          </Badge>
        )
    }
  }

  return (
    <div className="bg-[#0b1020] border border-[#11172a] rounded-2xl overflow-x-auto shadow-sm">
      <Table className="min-w-[700px]">
        <TableHeader className="bg-[#070a18]/50 border-b border-[#11172a]">
          <TableRow className="border-b border-[#11172a] hover:bg-transparent">
            <TableHead className="text-slate-400 text-xs font-semibold py-4 px-6 h-auto">Timestamp</TableHead>
            <TableHead className="text-slate-400 text-xs font-semibold py-4 px-6 h-auto">AI Provider</TableHead>
            <TableHead className="text-slate-400 text-xs font-semibold py-4 px-6 h-auto">Account Label</TableHead>
            <TableHead className="text-slate-400 text-xs font-semibold py-4 px-6 h-auto">Strategy</TableHead>
            <TableHead className="text-slate-400 text-xs font-semibold py-4 px-6 h-auto">Status</TableHead>
            <TableHead className="text-slate-400 text-xs font-semibold py-4 px-6 h-auto">Message</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map((item) => {
            const brandColor = item.connection.provider.color || "#8B5CF6"

            return (
              <TableRow key={item.id} className="border-b border-[#11172a]/50 hover:bg-[#11172a]/30 transition-colors">
                {/* Timestamp */}
                <TableCell className="text-slate-300 text-xs font-medium py-3.5 px-6 whitespace-nowrap">
                  <div className="flex items-center">
                    <Calendar className="w-3.5 h-3.5 mr-2 text-slate-500 flex-shrink-0" />
                    <FormattedDate date={item.createdAt} />
                  </div>
                </TableCell>

                {/* Provider name and color label */}
                <TableCell className="py-3.5 px-6 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{ backgroundColor: brandColor }}
                    />
                    <span className="text-slate-200 text-xs font-semibold">
                      {item.connection.provider.name}
                    </span>
                  </div>
                </TableCell>

                {/* Account Label */}
                <TableCell className="text-slate-300 text-xs font-medium py-3.5 px-6 max-w-[150px] truncate">
                  {item.connection.label}
                </TableCell>

                {/* Strategy */}
                <TableCell className="text-slate-400 text-xs py-3.5 px-6 font-mono whitespace-nowrap">
                  {item.launchType}
                </TableCell>

                {/* Status */}
                <TableCell className="py-3.5 px-6 whitespace-nowrap">
                  <div className="flex items-center">
                    {getStatusIcon(item.status)}
                    {getStatusBadge(item.status)}
                  </div>
                </TableCell>

                {/* Message */}
                <TableCell className="text-slate-500 text-xs py-3.5 px-6 max-w-[180px] truncate">
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
