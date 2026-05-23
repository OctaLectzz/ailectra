"use client"

import { Section } from "@/components/common"
import { MotionReveal } from "@/components/effects"
import { useTranslations } from "next-intl"

const providers = [
  { name: "ChatGPT", color: "#10A37F" },
  { name: "Claude", color: "#D4A574" },
  { name: "Gemini", color: "#4285F4" },
  { name: "Perplexity", color: "#20808D" },
  { name: "Cursor", color: "#F472B6" },
  { name: "Lovable", color: "#FF6154" },
  { name: "V0", color: "#FFFFFF" },
  { name: "Bolt", color: "#FFD700" },
  { name: "Replit AI", color: "#F26207" },
]

export function LogoCloud() {
  const t = useTranslations("home")

  // Duplicate for seamless loop
  const items = [...providers, ...providers]

  return (
    <Section className="py-12 md:py-16 border-t border-border/10">
      <MotionReveal>
        <p className="text-center text-sm text-muted-foreground mb-8 md:mb-10">
          {t("logoCloudTitle")}
        </p>
      </MotionReveal>

      {/* Marquee container */}
      <div className="relative overflow-hidden">
        {/* Gradient fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 bg-linear-to-r from-background to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 bg-linear-to-l from-background to-transparent" />

        <div
          className="flex w-max gap-8 md:gap-12"
          style={{ animation: "marquee 40s linear infinite" }}
        >
          {items.map((provider, i) => (
            <div
              key={`${provider.name}-${i}`}
              className="flex items-center gap-3 rounded-xl px-5 py-3 glass transition-all hover:border-primary/20 hover:shadow-glow shrink-0 group"
            >
              <div
                className="h-8 w-8 rounded-lg flex items-center justify-center text-xs font-bold transition-transform group-hover:scale-110"
                style={{
                  backgroundColor: `${provider.color}15`,
                  color: provider.color,
                }}
              >
                {provider.name.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                {provider.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
