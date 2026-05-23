"use client"

import { Section, SectionHeading } from "@/components/common"
import { GridPattern, StaggerContainer, StaggerItem } from "@/components/effects"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Globe, Lock, ShieldOff, User } from "lucide-react"
import { useTranslations } from "next-intl"

const items = [
  { icon: Lock, key: "securityEncrypted", descKey: "securityEncryptedDesc" },
  { icon: User, key: "securityControlled", descKey: "securityControlledDesc" },
  { icon: Globe, key: "securityOfficial", descKey: "securityOfficialDesc" },
  { icon: ShieldOff, key: "securityNoCookie", descKey: "securityNoCookieDesc" },
] as const

export function SecurityVault() {
  const t = useTranslations("home")

  return (
    <Section background={<GridPattern />}>
      <SectionHeading
        badge={t("securityBadge")}
        title={t("securityTitle")}
        subtitle={t("securitySubtitle")}
      />

      <StaggerContainer className="grid gap-5 sm:grid-cols-2">
        {items.map((item) => {
          const Icon = item.icon
          return (
            <StaggerItem key={item.key}>
              <Card className="glass relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 shadow-glow h-full">
                <div className="absolute top-0 left-0 h-32 w-32 rounded-full bg-primary/5 blur-3xl" />
                <CardHeader className="relative">
                  <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="font-heading font-medium text-lg">
                    {t(item.key)}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mt-2 leading-relaxed">
                    {t(item.descKey)}
                  </CardDescription>
                </CardHeader>
              </Card>
            </StaggerItem>
          )
        })}
      </StaggerContainer>
    </Section>
  )
}
