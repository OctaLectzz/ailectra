"use client"

import { LanguageSwitcher } from "@/components/common/language-switcher"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { usePathname } from "@/i18n/routing"
import { useTranslations } from "next-intl"

export function DashboardHeader() {
  const pathname = usePathname()
  const t = useTranslations("dashboard")

  // Determine current page title based on pathname
  let pageTitle = t("overview")
  if (pathname.includes("/tools")) {
    pageTitle = t("aiTools")
  } else if (pathname.includes("/accounts/new")) {
    pageTitle = t("addConnection")
  } else if (pathname.includes("/accounts")) {
    pageTitle = t("connectedAccounts")
  } else if (pathname.includes("/history")) {
    pageTitle = t("launchHistory")
  } else if (pathname.includes("/security")) {
    pageTitle = t("security")
  } else if (pathname.includes("/settings")) {
    pageTitle = t("settings")
  }

  return (
    <header className="hidden md:flex h-16 items-center justify-between px-8 border-b border-[#11172a] bg-void-navy sticky top-0 z-10">
      {/* Dynamic Page Title */}
      <div>
        <h1 className="text-xl font-bold tracking-tight text-white">{pageTitle}</h1>
      </div>

      {/* Header Actions: LanguageSwitcher & ThemeToggle */}
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        <div className="w-px h-6 bg-[#11172a]" />
        <ThemeToggle />
      </div>
    </header>
  )
}
export default DashboardHeader
