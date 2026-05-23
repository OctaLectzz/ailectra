"use client"

import { LaunchHistoryTable } from "@/components/dashboard/launch-history-table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"

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

interface HistoryDirectoryProps {
  initialHistory: LaunchHistoryItem[]
}

const statusFilters = [
  { value: "ALL", label: "All Statuses" },
  { value: "SUCCESS", label: "Success" },
  { value: "FAILED", label: "Failed" },
  { value: "MANUAL_REQUIRED", label: "Manual Copy" },
]

export function HistoryDirectory({ initialHistory }: HistoryDirectoryProps) {
  const t = useTranslations("dashboard")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("ALL")

  const filteredHistory = initialHistory.filter((item) => {
    const matchesSearch =
      item.connection.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.connection.provider.name.toLowerCase().includes(searchQuery.toLowerCase())
      
    const matchesStatus =
      selectedStatus === "ALL" || item.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Filters Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Input
            placeholder="Search logs by provider or account..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#0b1020] border-[#11172a] focus-visible:ring-primary text-slate-200 rounded-xl pl-10 pr-4 py-3 h-auto text-sm"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
        </div>

        {/* Status filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-slate-500 font-semibold mr-1">Status:</span>
          {statusFilters.map((filter) => {
            const isActive = selectedStatus === filter.value
            return (
              <Badge
                key={filter.value}
                variant={isActive ? "default" : "outline"}
                onClick={() => setSelectedStatus(filter.value)}
                className={`cursor-pointer rounded-full text-xs px-3.5 py-1 font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/10"
                    : "bg-transparent border-[#11172a] text-slate-400 hover:text-slate-200 hover:border-slate-800"
                }`}
              >
                {filter.label}
              </Badge>
            )
          })}
        </div>
      </div>

      {/* History Table */}
      <LaunchHistoryTable history={filteredHistory} />
    </div>
  )
}
export default HistoryDirectory
