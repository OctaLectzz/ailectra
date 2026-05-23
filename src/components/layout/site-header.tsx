"use client"

import { Container, LanguageSwitcher, ThemeToggle } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Link, usePathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { Cpu, Menu } from "lucide-react"
import { useTranslations } from "next-intl"
import { useEffect, useState } from "react"
import { MobileNav } from "./mobile-nav"

const navLinks = [
  { href: "/features" as const, key: "features" },
  { href: "/integrations" as const, key: "integrations" },
  { href: "/security" as const, key: "security" },
  { href: "/pricing" as const, key: "pricing" },
] as const

export function SiteHeader() {
  const t = useTranslations("nav")
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "border-b border-border/40 bg-background/80 backdrop-blur-xl shadow-sm"
            : "bg-transparent"
        )}
      >
        <Container className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary transition-transform group-hover:scale-105">
              <Cpu className="h-5 w-5 text-white" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight">
              Ailectra
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.key}
                  href={link.href}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  {t(link.key)}
                </Link>
              )
            })}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <LanguageSwitcher />
              <ThemeToggle />
            </div>

            <Link href="/login" className="hidden md:block">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full text-sm"
              >
                {t("login")}
              </Button>
            </Link>

            <Link href="/login" className="hidden md:block">
              <Button
                size="sm"
                className="rounded-full gradient-primary text-white font-semibold px-5 shadow-glow hover:opacity-90 transition-all hover:scale-[1.02]"
              >
                {t("getStarted")}
              </Button>
            </Link>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg hover:bg-muted/50 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </Container>
      </header>

      <MobileNav open={mobileOpen} onOpenChange={setMobileOpen} />
    </>
  )
}
