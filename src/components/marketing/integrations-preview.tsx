"use client"

import { Section, SectionHeading } from "@/components/common"
import { GridPattern, MotionReveal, StaggerContainer, StaggerItem } from "@/components/effects"
import { Button } from "@/components/ui/button"
import { aiProviders } from "@/config/ai-providers"
import { Link } from "@/i18n/routing"
import { ArrowRight } from "lucide-react"
import { useTranslations } from "next-intl"

export function IntegrationsPreview() {
  const t = useTranslations("home")
  const topProviders = aiProviders.slice(0, 8)

  return (
    <Section className="border-t border-border/10" background={<GridPattern cellSize={40} />}>
      <SectionHeading
        badge={t("integrationsBadge")}
        title={t("integrationsTitle")}
        subtitle={t("integrationsSubtitle")}
      />

      <div className="max-w-4xl mx-auto text-center">
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {topProviders.map((provider) => {
            const firstTwo = provider.name.slice(0, 2).toUpperCase()
            const colorMap: Record<string, string> = {
              chatgpt: "#10A37F",
              claude: "#D4A574",
              gemini: "#4285F4",
              perplexity: "#20808D",
              cursor: "#F472B6",
              lovable: "#FF6154",
              v0: "#FFFFFF",
              bolt: "#FFD700",
            }
            const color = colorMap[provider.slug] ?? "#8B5CF6"

            return (
              <StaggerItem key={provider.slug}>
                <div className="glass p-4 rounded-2xl border border-border/20 hover:border-primary/30 transition-all shadow-glow hover:-translate-y-1 flex flex-col items-center gap-3 group h-full justify-center">
                  <div
                    className="h-10 w-10 sm:h-12 sm:w-12 rounded-xl flex items-center justify-center text-sm font-bold transition-transform group-hover:scale-110"
                    style={{ backgroundColor: `${color}15`, color }}
                  >
                    {firstTwo}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {provider.name}
                  </span>
                </div>
              </StaggerItem>
            )
          })}
        </StaggerContainer>

        <MotionReveal delay={0.4}>
          <Link href="/integrations">
            <Button variant="outline" className="rounded-full glass font-semibold group transition-all hover:bg-muted hover:scale-[1.02]">
              {t("viewAllIntegrations")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </MotionReveal>
      </div>
    </Section>
  )
}
