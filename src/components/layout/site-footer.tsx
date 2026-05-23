import { Container } from "@/components/common"
import { Link } from "@/i18n/routing"
import { Cpu } from "lucide-react"
import { useTranslations } from "next-intl"

export function SiteFooter() {
  const t = useTranslations()
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border/20 bg-background/50 backdrop-blur-sm">
      <Container className="py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-primary">
                <Cpu className="h-4 w-4 text-white" />
              </div>
              <span className="font-heading text-lg font-bold">Ailectra</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t("footer.description")}
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{t("footer.product")}</h3>
            <ul className="space-y-3">
              {[
                { href: "/features" as const, label: t("nav.features") },
                { href: "/integrations" as const, label: t("nav.integrations") },
                { href: "/security" as const, label: t("nav.security") },
                { href: "/pricing" as const, label: t("nav.pricing") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{t("footer.company")}</h3>
            <ul className="space-y-3">
              {[
                { href: "/about" as const, label: t("nav.about") },
                { href: "/contact" as const, label: t("nav.contact") },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-4">{t("footer.legal")}</h3>
            <ul className="space-y-3">
              <li>
                <span className="text-sm text-muted-foreground cursor-default">
                  {t("footer.privacy")}
                </span>
              </li>
              <li>
                <span className="text-sm text-muted-foreground cursor-default">
                  {t("footer.terms")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            {t("footer.copyright", { year: String(year) })}
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <span className="hover:text-primary transition-colors cursor-default">
              {t("footer.privacy")}
            </span>
            <span className="hover:text-primary transition-colors cursor-default">
              {t("footer.terms")}
            </span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
