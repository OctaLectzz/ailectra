"use client"

import { EmptyState } from "@/components/common/empty-state"
import { ConnectionCard } from "@/components/dashboard/connection-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "@/i18n/routing"
import { KeyRound, Plus, Search } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"

interface ConnectionItem {
  id: string
  label: string
  accountEmail?: string | null
  username?: string | null
  authType: string
  launchType: string
  externalUrl?: string | null
  secretHint?: string | null
  lastLaunchedAt?: Date | string | null
  provider: {
    name: string
    slug: string
    color?: string | null
  }
}

interface ConnectionsDirectoryProps {
  initialConnections: ConnectionItem[]
}

export function ConnectionsDirectory({ initialConnections }: ConnectionsDirectoryProps) {
  const t = useTranslations("dashboard")
  const [connections, setConnections] = useState<ConnectionItem[]>(initialConnections)
  const [searchQuery, setSearchQuery] = useState("")

  const handleDeleted = (id: string) => {
    setConnections(connections.filter((c) => c.id !== id))
  }

  const filteredConnections = connections.filter((c) => {
    return (
      c.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.provider.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.accountEmail && c.accountEmail.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.username && c.username.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })

  if (connections.length === 0) {
    return (
      <div className="bg-[#0b1020] border border-[#11172a] rounded-2xl p-16 max-w-xl mx-auto text-center mt-6">
        <EmptyState
          title={t("noConnections")}
          description={t("noConnectionsDesc")}
          icon={<KeyRound className="w-8 h-8" />}
        />
        <div className="mt-8 flex justify-center">
          <Button
            asChild
            variant="default"
            className="bg-primary hover:bg-primary-hover text-white rounded-xl px-6 py-3 shadow-lg shadow-primary/10"
          >
            <Link href="/dashboard/accounts/new">
              <Plus className="w-4 h-4 mr-1.5" />
              {t("addConnection")}
            </Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search Filter Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Input
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#0b1020] border-[#11172a] focus-visible:ring-primary text-slate-200 rounded-xl pl-10 pr-4 py-3 h-auto text-sm"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
            <Search className="w-4 h-4" />
          </div>
        </div>

        <Button
          asChild
          variant="default"
          className="bg-primary hover:bg-primary-hover text-white rounded-xl px-5 h-11 shadow-lg shadow-primary/10"
        >
          <Link href="/dashboard/accounts/new">
            <Plus className="w-4 h-4 mr-1.5" />
            {t("addConnection")}
          </Link>
        </Button>
      </div>

      {/* Connections Grid */}
      {filteredConnections.length === 0 ? (
        <div className="bg-[#0b1020] border border-[#11172a] rounded-2xl py-16 text-center text-slate-500">
          No connected accounts found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredConnections.map((conn) => (
            <ConnectionCard
              key={conn.id}
              connection={conn}
              onDeleted={() => handleDeleted(conn.id)}
              onUpdated={(updatedConn) => {
                setConnections(connections.map((c) => c.id === updatedConn.id ? { ...c, ...updatedConn } : c))
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
export default ConnectionsDirectory
