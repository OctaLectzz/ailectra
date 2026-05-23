"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Link, usePathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"
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
    <div className={cn("flex flex-col h-full bg-void-navy border-r border-[#11172a] text-foreground", className)}>
      {/* Brand Logo */}
      <div className="flex h-16 items-center px-6 border-b border-[#11172a]">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="font-bold text-white text-base">A</span>
          </div>
          <span className="font-bold tracking-wider text-xl bg-clip-text text-transparent bg-linear-to-r from-white via-slate-200 to-slate-400">
            AILECTRA
          </span>
        </Link>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-1 px-4 py-6">
        {items.map((item) => {
          // Check if current path matches
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <Link
              key={item.key}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 group relative",
                isActive
                  ? "bg-[#11172a] text-primary"
                  : "text-slate-400 hover:bg-[#11172a]/50 hover:text-white"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-3 bottom-3 w-1 bg-primary rounded-r-full" />
              )}
              <Icon
                className={cn(
                  "mr-3 h-5 w-5 shrink-0 transition-transform duration-200 group-hover:scale-105",
                  isActive ? "text-primary" : "text-slate-400 group-hover:text-white"
                )}
              />
              {item.name}
            </Link>
          )
        })}
      </nav>

      {/* User profile details & Logout */}
      <div className="p-4 border-t border-[#11172a] bg-[#070a18]/40">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-9 h-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center overflow-hidden">
            {userImage ? (
              <img src={userImage} alt={userName} className="w-full h-full object-cover" />
            ) : (
              <span className="font-semibold text-sm text-slate-300">{userName.charAt(0)}</span>
            )}
          </div>
          <div className="flex-1 overflow-hidden">
            <h4 className="text-sm font-medium text-slate-200 truncate">{userName}</h4>
            <p className="text-xs text-slate-500 truncate">{userEmail}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full justify-start text-slate-400 hover:text-destructive hover:bg-destructive/10 rounded-xl px-4 py-3 h-auto"
        >
          <LogOut className="mr-3 h-5 w-5 shrink-0" />
          {t("logout")}
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
      <div className="md:hidden flex items-center p-4 border-b border-[#11172a] bg-void-navy text-foreground w-full justify-between z-30">
        <Link href="/dashboard" className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-linear-to-tr from-primary to-secondary flex items-center justify-center">
            <span className="font-bold text-white text-base">A</span>
          </div>
          <span className="font-bold tracking-wider text-lg">AILECTRA</span>
        </Link>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 border-r border-[#11172a] w-64 bg-void-navy">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
export default DashboardSidebar
