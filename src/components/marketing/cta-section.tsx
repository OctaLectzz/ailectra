"use client"

import { GradientText, Section } from "@/components/common"
import { BackgroundBeams, MotionReveal } from "@/components/effects"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl"

export function CtaSection() {
  const t = useTranslations("home")

  return (
    <Section
      className="py-20 md:py-32"
      background={<BackgroundBeams beamCount={4} />}
    >
      <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
        <MotionReveal>
          <h2 className="font-heading text-3xl md:text-5xl font-semibold tracking-tight">
            <GradientText>{t("ctaTitle")}</GradientText>
          </h2>
        </MotionReveal>

        <MotionReveal delay={0.1}>
          <p className="mt-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
            {t("ctaSubtitle")}
          </p>
        </MotionReveal>

        <MotionReveal delay={0.2} className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link href="/login">
            <Button
              size="lg"
              className="rounded-full gradient-primary text-white font-semibold px-8 shadow-glow transition-all hover:opacity-90 hover:scale-[1.02]"
            >
              {t("ctaPrimaryBtn")}
            </Button>
          </Link>
          <Link href="/security">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full glass font-semibold px-8 transition-all hover:bg-muted hover:scale-[1.02]"
            >
              {t("ctaSecondaryBtn")}
            </Button>
          </Link>
        </MotionReveal>
      </div>
    </Section>
  )
}
