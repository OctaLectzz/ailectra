"use client"

import { cn } from "@/lib/utils"
import { Globe } from "lucide-react"
import { useLocale } from "next-intl"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const locales = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "id", label: "Indonesia", flag: "🇮🇩" },
] as const

type LanguageSwitcherProps = {
  className?: string
}

export function LanguageSwitcher({ className }: LanguageSwitcherProps) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function switchLocale(newLocale: string) {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
    window.location.reload()
    setOpen(false)
  }

  const currentLocale = locales.find((l) => l.code === locale) ?? locales[0]

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-border bg-muted/50 px-3 text-sm transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="Switch language"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <Globe className="h-4 w-4 text-muted-foreground" />
        <span className="hidden sm:inline">{currentLocale.flag}</span>
        <span className="text-xs font-medium uppercase text-muted-foreground">
          {currentLocale.code}
        </span>
      </button>

      {open && (
        <div
          className="absolute right-0 top-full z-50 mt-1.5 min-w-[140px] overflow-hidden rounded-xl border border-border bg-popover p-1 shadow-lg animate-slide-down"
          role="listbox"
          aria-label="Available languages"
        >
          {locales.map((loc) => (
            <button
              key={loc.code}
              onClick={() => switchLocale(loc.code)}
              role="option"
              aria-selected={loc.code === locale}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-muted",
                loc.code === locale &&
                  "bg-primary/10 text-primary font-medium"
              )}
            >
              <span>{loc.flag}</span>
              <span>{loc.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
