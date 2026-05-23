"use client"

import { GradientText, Section } from "@/components/common"
import { GridPattern, MotionReveal } from "@/components/effects"
import { CtaSection } from "@/components/marketing/cta-section"
import { FaqSection } from "@/components/marketing/faq-section"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { KeyRound, Lock, Rocket, Shield, ShieldCheck, ShieldOff } from "lucide-react"
import { useTranslations } from "next-intl"

export function SecurityContent() {
  const t = useTranslations("security")

  return (
    <>
      {/* Hero */}
      <Section
        className="pt-20 pb-8 md:pt-32 md:pb-16"
        background={<GridPattern />}
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

      {/* What Ailectra Stores vs Never Does */}
      <Section>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <MotionReveal>
            <Card className="glass h-full border-border/20 shadow-glow">
              <CardHeader>
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <CardTitle className="font-heading text-xl font-semibold mb-4">
                  {t("storesTitle")}
                </CardTitle>
                <ul className="space-y-3">
                  {(t.raw("storesItems") as string[]).map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Lock className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardHeader>
            </Card>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <Card className="glass h-full border-border/20 shadow-glow">
              <CardHeader>
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                  <ShieldOff className="h-5 w-5" />
                </div>
                <CardTitle className="font-heading text-xl font-semibold mb-4">
                  {t("neverTitle")}
                </CardTitle>
                <ul className="space-y-3">
                  {(t.raw("neverItems") as string[]).map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                      <Shield className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardHeader>
            </Card>
          </MotionReveal>
        </div>
      </Section>

      {/* Encryption + Launch Safety */}
      <Section className="border-t border-border/10">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <MotionReveal>
            <div>
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                <KeyRound className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-3">
                {t("encryptionTitle")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("encryptionDesc")}
              </p>
            </div>
          </MotionReveal>

          <MotionReveal delay={0.15}>
            <div>
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Rocket className="h-5 w-5" />
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-3">
                {t("launchTitle")}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {t("launchDesc")}
              </p>
            </div>
          </MotionReveal>
        </div>
      </Section>

      <FaqSection />
      <CtaSection />
    </>
  )
}
