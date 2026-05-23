"use client"

import { LanguageSwitcher } from "@/components/common/language-switcher"
import { ThemeToggle } from "@/components/common/theme-toggle"
import { usePathname } from "@/i18n/routing"
import { motion } from "framer-motion"
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
    <motion.header 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="hidden md:flex h-16 items-center justify-between px-8 border-b border-slate-800/60 bg-[#050712]/60 backdrop-blur-2xl sticky top-0 z-50 shadow-sm"
    >
      {/* Dynamic Page Title (Breadcrumb style) */}
      <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-wider font-space-grotesk">
        <span className="text-slate-500">Dashboard</span>
        <span className="text-slate-700">/</span>
        <motion.span 
          key={pageTitle}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-secondary drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
        >
          {pageTitle}
        </motion.span>
      </div>

      {/* Header Actions: LanguageSwitcher & ThemeToggle */}
      <div className="flex items-center space-x-4">
        <LanguageSwitcher />
        <div className="w-px h-6 bg-slate-800/60" />
        <ThemeToggle />
      </div>
    </motion.header>
  )
}
export default DashboardHeader
