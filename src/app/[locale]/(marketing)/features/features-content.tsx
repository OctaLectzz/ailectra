"use client"

import { GradientText, Section } from "@/components/common"
import { MotionReveal, ParticlesBackground, StaggerContainer, StaggerItem } from "@/components/effects"
import { CtaSection } from "@/components/marketing/cta-section"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Clock, Palette, Rocket, Shield, Vault } from "lucide-react"
import { useTranslations } from "next-intl"

const featureDetails = [
  { icon: Vault, titleKey: "detailVaultTitle", descKey: "detailVaultDesc", color: "primary" },
  { icon: Rocket, titleKey: "detailLaunchTitle", descKey: "detailLaunchDesc", color: "secondary" },
  { icon: Clock, titleKey: "detailHistoryTitle", descKey: "detailHistoryDesc", color: "accent" },
  { icon: Shield, titleKey: "detailSecurityTitle", descKey: "detailSecurityDesc", color: "primary" },
  { icon: Palette, titleKey: "detailThemeTitle", descKey: "detailThemeDesc", color: "secondary" },
  { icon: BookOpen, titleKey: "detailDirectoryTitle", descKey: "detailDirectoryDesc", color: "accent" },
] as const

const colorMap = {
  primary: { bg: "bg-primary/10", text: "text-primary", glow: "bg-primary/5", border: "hover:border-primary/30" },
  secondary: { bg: "bg-secondary/10", text: "text-secondary", glow: "bg-secondary/5", border: "hover:border-secondary/30" },
  accent: { bg: "bg-accent/10", text: "text-accent", glow: "bg-accent/5", border: "hover:border-accent/30" },
}

export function FeaturesContent() {
  const t = useTranslations("features")

  return (
    <>
      {/* Hero */}
      <Section
        className="pt-20 pb-8 md:pt-32 md:pb-16"
        background={<ParticlesBackground count={20} />}
      >
        <div className="text-center max-w-3xl mx-auto">
          <MotionReveal>
            <span className="mb-4 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">
              {t("heroBadge")}
            </span>
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <h1 className="font-heading text-4xl md:text-6xl font-semibold tracking-tight mt-4 leading-[1.1]">
              <GradientText>{t("heroTitle")}</GradientText>
            </h1>
          </MotionReveal>
          <MotionReveal delay={0.2}>
            <p className="mt-6 text-base md:text-lg text-muted-foreground leading-relaxed">
              {t("heroDescription")}
            </p>
          </MotionReveal>
        </div>
      </Section>

      {/* Detail cards */}
      <Section>
        <StaggerContainer className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featureDetails.map((feature) => {
            const Icon = feature.icon
            const colors = colorMap[feature.color]

            return (
              <StaggerItem key={feature.titleKey}>
                <Card className={`glass relative overflow-hidden transition-all duration-300 hover:-translate-y-1 shadow-glow h-full ${colors.border}`}>
                  <div className={`absolute top-0 right-0 h-28 w-28 rounded-full ${colors.glow} blur-2xl`} />
                  <CardHeader className="relative">
                    <div className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl ${colors.bg} ${colors.text}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="font-heading font-medium text-lg">{t(feature.titleKey)}</CardTitle>
                    <CardDescription className="text-muted-foreground mt-2 leading-relaxed">{t(feature.descKey)}</CardDescription>
                  </CardHeader>
                </Card>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </Section>

      <CtaSection />
    </>
  )
}
