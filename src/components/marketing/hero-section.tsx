"use client"

import { GradientText, Section } from "@/components/common"
import { BackgroundBeams, MotionReveal } from "@/components/effects"
import { Button } from "@/components/ui/button"
import { Link } from "@/i18n/routing"
import { Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"
import dynamic from "next/dynamic"

const DynamicThreeOrbit = dynamic(
  () => import("@/components/effects").then((mod) => mod.ThreeAIOrbit),
  { ssr: false }
)

const orbitProviders = [
  { name: "ChatGPT", color: "#10A37F" },
  { name: "Claude", color: "#D4A574" },
  { name: "Gemini", color: "#4285F4" },
  { name: "Perplexity", color: "#20808D" },
  { name: "Cursor", color: "#F472B6" },
  { name: "V0", color: "#FFFFFF" },
]

export function HeroSection() {
  const t = useTranslations("home")

  return (
    <Section
      className="pt-20 pb-8 md:pt-32 md:pb-16 lg:pt-40 lg:pb-24"
      background={<BackgroundBeams />}
    >
      <div className="flex flex-col items-center text-center">
        {/* Eyebrow badge */}
        <MotionReveal duration={0.8}>
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            {t("heroBadge")}
          </span>
        </MotionReveal>

        {/* Title */}
        <MotionReveal delay={0.1} duration={0.8}>
          <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl mt-4 leading-[1.08]">
            {t("heroTitle").split(t("heroHighlight"))[0]}
            <br className="hidden sm:block" />
            <GradientText>{t("heroHighlight")}</GradientText>
          </h1>
        </MotionReveal>

        {/* Description */}
        <MotionReveal delay={0.2} duration={0.8}>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg md:text-xl leading-8">
            {t("heroDescription")}
          </p>
        </MotionReveal>

        {/* CTAs */}
        <MotionReveal
          delay={0.3}
          duration={0.8}
          className="mt-10 flex flex-wrap gap-4 justify-center"
        >
          <Link href="/login">
            <Button
              size="lg"
              className="rounded-full gradient-primary text-white hover:opacity-90 font-semibold px-8 shadow-glow transition-all hover:scale-[1.02]"
            >
              {t("ctaPrimary")}
            </Button>
          </Link>
          <Link href="/integrations">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full glass hover:bg-muted font-semibold px-8 transition-all hover:scale-[1.02]"
            >
              {t("ctaSecondary")}
            </Button>
          </Link>
        </MotionReveal>

        {/* Animated Orbit Visual */}
        <MotionReveal delay={0.5} duration={1} className="mt-16 md:mt-20">
          <div className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80 md:h-96 md:w-96">
            <DynamicThreeOrbit />
          </div>
        </MotionReveal>
      </div>
    </Section>
  )
}
