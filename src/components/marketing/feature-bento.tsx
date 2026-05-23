"use client"

import { Section, SectionHeading } from "@/components/common"
import { DotPattern, StaggerContainer, StaggerItem } from "@/components/effects"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock, Palette, Rocket, Shield, Vault } from "lucide-react"
import { useTranslations } from "next-intl"

const features = [
  { icon: Vault, key: "featureVault", descKey: "featureVaultDesc", color: "primary" },
  { icon: Rocket, key: "featureLaunch", descKey: "featureLaunchDesc", color: "secondary" },
  { icon: Shield, key: "featureSecure", descKey: "featureSecureDesc", color: "accent" },
  { icon: Clock, key: "featureHistory", descKey: "featureHistoryDesc", color: "primary" },
  { icon: Palette, key: "featureTheme", descKey: "featureThemeDesc", color: "secondary" },
  { icon: BookOpen, key: "featureDirectory", descKey: "featureDirectoryDesc", color: "accent" },
] as const

const colorMap = {
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    glow: "bg-primary/5",
    border: "hover:border-primary/30",
  },
  secondary: {
    bg: "bg-secondary/10",
    text: "text-secondary",
    glow: "bg-secondary/5",
    border: "hover:border-secondary/30",
  },
  accent: {
    bg: "bg-accent/10",
    text: "text-accent",
    glow: "bg-accent/5",
    border: "hover:border-accent/30",
  },
}

export function FeatureBento() {
  const t = useTranslations("home")

  return (
    <Section background={<DotPattern />}>
      <SectionHeading
        badge={t("featuresBadge")}
        title={t("featuresTitle")}
        subtitle={t("featuresSubtitle")}
      />

      <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => {
          const Icon = feature.icon
          const colors = colorMap[feature.color]
          const isWide = i === 0 || i === 3

          return (
            <StaggerItem
              key={feature.key}
              className={isWide ? "sm:col-span-2 lg:col-span-1" : ""}
            >
              <Card
                className={`glass relative overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-glow h-full ${colors.border}`}
              >
                {/* Corner glow */}
                <div
                  className={`absolute top-0 right-0 h-28 w-28 rounded-full ${colors.glow} blur-2xl`}
                />

                <CardHeader className="relative">
                  <div
                    className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl ${colors.bg} ${colors.text}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="font-heading font-medium text-lg">
                    {t(feature.key)}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mt-2 leading-relaxed">
                    {t(feature.descKey)}
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
