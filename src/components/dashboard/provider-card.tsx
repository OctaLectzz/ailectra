"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@/i18n/routing"
import { Globe, Plus } from "lucide-react"
import { useTranslations } from "next-intl"

interface ProviderCardProps {
  provider: {
    id: string
    name: string
    slug: string
    category: string
    description: string
    websiteUrl: string
    color?: string | null
    status: string
  }
  connectedCount: number
}

export function ProviderCard({ provider, connectedCount }: ProviderCardProps) {
  const t = useTranslations("dashboard")
  const brandColor = provider.color || "#8B5CF6"

  return (
    <Card className="bg-[#0b1020] border-[#11172a] hover:border-slate-800 transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden group">
      {/* Decorative Brand Accent Corner */}
      <div
        className="absolute top-0 right-0 w-24 h-24 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-300 rounded-full blur-xl pointer-events-none"
        style={{ backgroundColor: brandColor }}
      />

      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          {/* Provider Avatar */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-white shadow-lg text-lg select-none"
            style={{
              background: `linear-gradient(135deg, ${brandColor} 0%, rgba(13,18,36,1) 100%)`,
              border: `1px solid ${brandColor}33`,
            }}
          >
            {provider.name.charAt(0)}
          </div>

          <div className="flex space-x-2">
            {/* Connected Count Badge */}
            {connectedCount > 0 && (
              <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 text-xs font-semibold rounded-full px-2.5 py-0.5">
                {connectedCount} connected
              </Badge>
            )}
            {/* Status Badge */}
            {provider.status === "BETA" && (
              <Badge variant="secondary" className="bg-amber-500/10 text-amber-500 border-amber-500/20 text-xs rounded-full">
                Beta
              </Badge>
            )}
          </div>
        </div>

        <CardTitle className="text-lg font-bold text-white mt-4 flex items-center group-hover:text-primary transition-colors duration-200">
          {provider.name}
        </CardTitle>
        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
          {provider.category}
        </span>
      </CardHeader>

      <CardContent className="py-0 flex-1">
        <p className="text-sm text-slate-400 leading-relaxed line-clamp-3">
          {provider.description}
        </p>
      </CardContent>

      <CardFooter className="pt-4 border-t border-[#11172a] mt-6 flex space-x-2">
        <Button
          asChild
          variant="outline"
          size="sm"
          className="flex-1 bg-transparent hover:bg-slate-900 border-[#11172a] text-slate-300 text-xs rounded-xl h-9"
        >
          <a href={provider.websiteUrl} target="_blank" rel="noopener noreferrer">
            <Globe className="w-3.5 h-3.5 mr-1.5" />
            {t("aiTools") === "Alat AI" ? "Situs Web" : "Website"}
          </a>
        </Button>

        <Button
          asChild
          variant="default"
          size="sm"
          className="flex-1 bg-primary hover:bg-primary-hover text-white text-xs font-semibold rounded-xl h-9 shadow-lg shadow-primary/10"
        >
          <Link href={`/dashboard/accounts/new?provider=${provider.slug}`}>
            <Plus className="w-3.5 h-3.5 mr-1" />
            {t("addAccount")}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
export default ProviderCard
