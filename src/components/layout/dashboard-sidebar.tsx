"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link, usePathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import {
  History,
  KeyRound,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ShieldCheck,
  Sparkles
} from "lucide-react"
import { signOut, useSession } from "next-auth/react"
import { useTranslations } from "next-intl"
import React, { useState } from "react"

type SidebarItem = {
  name: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  key: string
}

export function DashboardSidebar() {
  const t = useTranslations("dashboard")
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const items: SidebarItem[] = [
    { name: t("overview"), href: "/dashboard", icon: LayoutDashboard, key: "overview" },
    { name: t("aiTools"), href: "/dashboard/tools", icon: Sparkles, key: "aiTools" },
    { name: t("connectedAccounts"), href: "/dashboard/accounts", icon: KeyRound, key: "connectedAccounts" },
    { name: t("launchHistory"), href: "/dashboard/history", icon: History, key: "launchHistory" },
    { name: t("security"), href: "/dashboard/security", icon: ShieldCheck, key: "security" },
    { name: t("settings"), href: "/dashboard/settings", icon: Settings, key: "settings" },
  ]

  const userEmail = session?.user?.email || "dev@ailectra.app"
  const userName = session?.user?.name || "Dev User"
  const userImage = session?.user?.image || ""

  const SidebarContent = ({ className }: { className?: string }) => (
    <div className={cn("flex flex-col h-full bg-[#050712]/80 backdrop-blur-3xl border-r border-slate-800/60 text-foreground relative overflow-hidden", className)}>
      {/* Decorative gradient orb */}
      <div className="absolute top-0 left-0 w-full h-64 bg-primary/5 blur-[80px] pointer-events-none rounded-full -translate-y-1/2" />
      
      {/* Brand Logo */}
      <div className="flex h-16 items-center px-6 border-b border-slate-800/60 relative z-10">
        <Link href="/dashboard" className="flex items-center space-x-2 group">
          <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
            <span className="font-bold text-white text-base">A</span>
          </div>
          <span className="font-bold tracking-wider text-xl bg-clip-text text-transparent bg-linear-to-r from-white via-slate-200 to-slate-400 font-space-grotesk group-hover:via-white transition-all duration-300">
            AILECTRA
          </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1.5 px-4 py-6 relative z-10">
        {items.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="block"
            >
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-200 group relative overflow-hidden",
                  isActive
                    ? "bg-slate-800/50 border border-slate-700/50 text-white shadow-md shadow-black/20"
                    : "text-slate-400 hover:bg-slate-800/30 hover:text-slate-200 border border-transparent"
                )}
              >
                {isActive && (
                  <>
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-secondary rounded-r-full shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-secondary/10 to-transparent pointer-events-none" />
                  </>
                )}
                <Icon
                  className={cn(
                    "mr-3 h-5 w-5 shrink-0 transition-all duration-300",
                    isActive ? "text-secondary drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" : "text-slate-400 group-hover:text-slate-200 group-hover:scale-110"
                  )}
                />
                <span className="relative z-10">{item.name}</span>
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* User profile details & Logout */}
      <div className="p-4 border-t border-slate-800/60 bg-slate-950/40 relative z-10">
        <div className="flex items-center space-x-3 mb-4 p-2 rounded-xl hover:bg-slate-900/50 transition-colors">
          <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden shrink-0 shadow-inner">
            {userImage ? (
              <img src={userImage} alt={userName} className="w-full h-full object-cover" />
            ) : (
              <span className="font-semibold text-sm text-slate-300 bg-gradient-to-br from-slate-700 to-slate-900 w-full h-full flex items-center justify-center">{userName.charAt(0)}</span>
            )}
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="text-sm font-semibold text-slate-200 truncate">{userName}</h4>
            <p className="text-xs text-slate-500 truncate">{userEmail}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full justify-start text-slate-400 hover:text-destructive hover:bg-destructive/15 rounded-xl px-4 py-3 h-auto group transition-all"
        >
          <LogOut className="mr-3 h-4 w-4 shrink-0 group-hover:scale-110 transition-transform" />
          <span className="font-medium">{t("logout")}</span>
        </Button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop Sidebar (visible on md+) */}
      <aside className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0 z-20">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer (visible on mobile screens) */}
      <div className="md:hidden flex items-center p-4 border-b border-slate-800/60 bg-[#050712]/90 backdrop-blur-md text-foreground w-full justify-between z-30 sticky top-0">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-primary to-secondary flex items-center justify-center">
            <span className="font-bold text-white text-base">A</span>
          </div>
          <span className="font-bold tracking-wider text-lg font-space-grotesk">AILECTRA</span>
        </Link>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white bg-slate-900/50 border border-slate-800">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 border-r border-slate-800/60 w-72 bg-transparent shadow-2xl">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
export default DashboardSidebar
