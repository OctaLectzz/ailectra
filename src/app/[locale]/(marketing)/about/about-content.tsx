"use client"

import { GradientText, Section, SectionHeading } from "@/components/common"
import { AuroraBackground, MotionReveal, StaggerContainer, StaggerItem } from "@/components/effects"
import { CtaSection } from "@/components/marketing/cta-section"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Globe, Shield, Sparkles, User } from "lucide-react"
import { useTranslations } from "next-intl"

const principles = [
  { icon: Shield, key: "principle1", descKey: "principle1Desc", color: "primary" },
  { icon: Sparkles, key: "principle2", descKey: "principle2Desc", color: "secondary" },
  { icon: Globe, key: "principle3", descKey: "principle3Desc", color: "accent" },
  { icon: User, key: "principle4", descKey: "principle4Desc", color: "primary" },
] as const

const colorMap = {
  primary: { bg: "bg-primary/10", text: "text-primary" },
  secondary: { bg: "bg-secondary/10", text: "text-secondary" },
  accent: { bg: "bg-accent/10", text: "text-accent" },
}

export function AboutContent() {
  const t = useTranslations("about")

  return (
    <>
      {/* Hero */}
      <Section
        className="pt-20 pb-8 md:pt-32 md:pb-16"
        background={<AuroraBackground />}
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

      {/* Why + Mission */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <MotionReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-4">
              {t("whyTitle")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("whyDesc")}
            </p>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-4">
              {t("missionTitle")}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {t("missionDesc")}
            </p>
          </MotionReveal>
        </div>
      </Section>

      {/* Product Principles */}
      <Section className="border-t border-border/10">
        <SectionHeading title={t("principlesTitle")} />

        <StaggerContainer className="grid gap-5 sm:grid-cols-2 max-w-3xl mx-auto">
          {principles.map((p) => {
            const Icon = p.icon
            const colors = colorMap[p.color]

            return (
              <StaggerItem key={p.key}>
                <Card className="glass h-full border-border/20 hover:border-primary/20 transition-all hover:-translate-y-1 shadow-glow">
                  <CardHeader>
                    <div className={`mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl ${colors.bg} ${colors.text}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle className="font-heading font-medium text-lg">{t(p.key)}</CardTitle>
                    <CardDescription className="text-muted-foreground mt-2 leading-relaxed">{t(p.descKey)}</CardDescription>
                  </CardHeader>
                </Card>
              </StaggerItem>
            )
          })}
        </StaggerContainer>
      </Section>

      {/* Roadmap */}
      <Section className="border-t border-border/10">
        <SectionHeading title={t("roadmapTitle")} />

        <MotionReveal className="max-w-2xl mx-auto">
          <ul className="space-y-4">
            {(t.raw("roadmapItems") as string[]).map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-3 p-4 rounded-xl glass border-border/20 hover:border-primary/20 transition-colors"
              >
                <ArrowRight className="h-4 w-4 text-primary shrink-0" />
                <span className="text-sm text-muted-foreground">{item}</span>
              </li>
            ))}
          </ul>
        </MotionReveal>
      </Section>

      <CtaSection />
    </>
  )
}
