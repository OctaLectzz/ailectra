"use client"

import { Section, SectionHeading } from "@/components/common"
import { StaggerContainer, StaggerItem } from "@/components/effects"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

const steps = [
  { num: 1, key: "howStep1", descKey: "howStep1Desc", color: "from-primary to-primary/60" },
  { num: 2, key: "howStep2", descKey: "howStep2Desc", color: "from-secondary to-secondary/60" },
  { num: 3, key: "howStep3", descKey: "howStep3Desc", color: "from-accent to-accent/60" },
  { num: 4, key: "howStep4", descKey: "howStep4Desc", color: "from-primary to-secondary" },
] as const

export function HowItWorks() {
  const t = useTranslations("home")

  return (
    <Section className="border-t border-border/10">
      <SectionHeading
        badge={t("howBadge")}
        title={t("howTitle")}
        subtitle={t("howSubtitle")}
      />

      <StaggerContainer className="relative">
        {/* Connecting beam line (desktop) */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-primary/20 via-secondary/20 to-accent/20 hidden lg:block -translate-x-1/2" />

        <div className="grid gap-8 lg:gap-12 max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <StaggerItem key={step.key}>
              <div
                className={cn(
                  "relative flex items-start gap-6 group",
                  i % 2 === 1 && "lg:flex-row-reverse lg:text-right"
                )}
              >
                {/* Step number */}
                <div className="shrink-0 relative">
                  <div
                    className={cn(
                      "flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br text-white font-heading text-xl font-bold shadow-glow transition-transform group-hover:scale-110",
                      step.color
                    )}
                  >
                    {step.num}
                  </div>
                  {/* Pulse ring on hover */}
                  <div className="absolute -inset-2 rounded-2xl border border-primary/0 group-hover:border-primary/20 transition-all duration-500" />
                </div>

                {/* Content */}
                <div className="pt-1">
                  <h3 className="font-heading text-lg font-semibold mb-2">
                    {t(step.key)}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t(step.descKey)}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </div>
      </StaggerContainer>
    </Section>
  )
}
