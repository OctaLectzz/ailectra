"use client"

import { LanguageSwitcher, ThemeToggle } from "@/components/common"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Link, usePathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"
import { Cpu } from "lucide-react"
import { useTranslations } from "next-intl"

type MobileNavProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const navLinks = [
  { href: "/features" as const, key: "features" },
  { href: "/integrations" as const, key: "integrations" },
  { href: "/security" as const, key: "security" },
  { href: "/pricing" as const, key: "pricing" },
  { href: "/about" as const, key: "about" },
  { href: "/contact" as const, key: "contact" },
] as const

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  const t = useTranslations("nav")
  const pathname = usePathname()

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-80 glass border-l border-border/30">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
              <Cpu className="h-4 w-4 text-white" />
            </div>
            <span className="font-heading text-lg font-bold">Ailectra</span>
          </SheetTitle>
        </SheetHeader>

        <nav className="mt-8 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link
                key={link.key}
                href={link.href}
                onClick={() => onOpenChange(false)}
                className={cn(
                  "flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-colors",
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

        <div className="mt-6 flex items-center gap-3 px-4">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

        <div className="mt-6 flex flex-col gap-3 px-4">
          <Link href="/login" onClick={() => onOpenChange(false)}>
            <Button variant="outline" className="w-full rounded-xl glass">
              {t("login")}
            </Button>
          </Link>
          <Link href="/login" onClick={() => onOpenChange(false)}>
            <Button className="w-full rounded-xl gradient-primary text-white font-semibold shadow-glow">
              {t("getStarted")}
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  )
}
