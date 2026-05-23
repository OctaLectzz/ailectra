"use client"

import { ProviderCard } from "@/components/dashboard/provider-card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"

interface ProviderItem {
  id: string
  name: string
  slug: string
  category: string
  description: string
  websiteUrl: string
  color: string | null
  status: string
}

interface ConnectionItem {
  providerId: string
}

interface ProviderDirectoryProps {
  providers: ProviderItem[]
  connections: ConnectionItem[]
}

const categories = [
  { value: "all", label: "All" },
  { value: "chatbot", label: "Chatbot" },
  { value: "coding", label: "Coding" },
  { value: "search", label: "Search" },
  { value: "design", label: "Design" },
  { value: "platform", label: "Platform" },
]

export function ProviderDirectory({ providers, connections }: ProviderDirectoryProps) {
  const t = useTranslations("dashboard")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Map category slugs to match database values if needed
  const filterCategory = (providerCategory: string) => {
    const normProv = providerCategory.toLowerCase().trim()
    const normSel = selectedCategory.toLowerCase().trim()
    
    if (normSel === "all") return true
    
    // Category mapping helper
    if (normSel === "chatbot" && normProv.includes("assistant")) return true
    if (normSel === "coding" && (normProv.includes("code") || normProv.includes("coding"))) return true
    if (normSel === "search" && normProv.includes("search")) return true
    if (normSel === "design" && (normProv.includes("design") || normProv.includes("ui"))) return true
    if (normSel === "platform" && (normProv.includes("platform") || normProv.includes("builder"))) return true
    
    return normProv === normSel
  }

  const filteredProviders = providers.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = filterCategory(p.category)
    return matchesSearch && matchesCategory
  })

  // Calculate connection count per provider slug
  const getConnectionCount = (providerId: string) => {
    return connections.filter((c) => c.providerId === providerId).length
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters Panel */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Live Search */}
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

        {/* Categories Badges */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-slate-500 font-semibold mr-1">{t("categoryFilter")}:</span>
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.value
            return (
              <Badge
                key={cat.value}
                variant={isActive ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat.value)}
                className={`cursor-pointer rounded-full text-xs px-3.5 py-1 font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/10"
                    : "bg-transparent border-[#11172a] text-slate-400 hover:text-slate-200 hover:border-slate-800"
                }`}
              >
                {cat.label}
              </Badge>
            )
          })}
        </div>
      </div>

      {/* Directory Grid */}
      {filteredProviders.length === 0 ? (
        <div className="bg-[#0b1020] border border-[#11172a] rounded-2xl py-16 text-center text-slate-500">
          No AI providers found matching your criteria.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProviders.map((provider) => (
            <ProviderCard
              key={provider.id}
              provider={provider}
              connectedCount={getConnectionCount(provider.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
export default ProviderDirectory
