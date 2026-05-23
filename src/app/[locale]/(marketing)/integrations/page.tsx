"use client"

import { GradientText, Section } from "@/components/common"
import { MotionReveal, StaggerContainer, StaggerItem } from "@/components/effects"
import { CtaSection } from "@/components/marketing/cta-section"
import { Badge } from "@/components/ui/badge"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { aiProviders, providerCategories } from "@/config/ai-providers"
import { cn } from "@/lib/utils"
import { ExternalLink } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"

export default function IntegrationsPage() {
  const t = useTranslations("integrations")
  const [activeFilter, setActiveFilter] = useState("all")

  const filtered =
    activeFilter === "all"
      ? aiProviders
      : aiProviders.filter((p) => p.category === activeFilter)

  return (
    <>
      {/* Hero */}
      <Section className="pt-20 pb-8 md:pt-32 md:pb-16">
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

      {/* Filter + Grid */}
      <Section>
        {/* Category filters */}
        <MotionReveal className="flex flex-wrap justify-center gap-2 mb-10">
          {providerCategories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveFilter(cat.value)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-full transition-all",
                activeFilter === cat.value
                  ? "bg-primary text-primary-foreground shadow-glow"
                  : "glass text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {cat.label}
            </button>
          ))}
        </MotionReveal>

        {/* Provider grid */}
        <StaggerContainer className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((provider) => {
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
              "replit-ai": "#F26207",
              midjourney: "#8B5CF6",
              "github-copilot": "#6E7681",
              "notion-ai": "#000000",
            }
            const color = colorMap[provider.slug] ?? "#8B5CF6"

            return (
              <StaggerItem key={provider.slug}>
                <Card className="glass relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 shadow-glow h-full">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="h-12 w-12 rounded-xl flex items-center justify-center text-sm font-bold"
                        style={{ backgroundColor: `${color}15`, color }}
                      >
                        {firstTwo}
                      </div>
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-[10px]",
                          provider.status === "supported"
                            ? "border-success/30 text-success bg-success/10"
                            : "border-warning/30 text-warning bg-warning/10"
                        )}
                      >
                        {provider.status === "supported" ? t("supported") : t("comingSoon")}
                      </Badge>
                    </div>

                    <CardTitle className="font-heading font-medium text-lg">
                      {provider.name}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground mt-1 leading-relaxed text-sm">
                      {provider.description}
                    </CardDescription>

                    <div className="mt-3 flex flex-wrap gap-1.5">
                      <span className="text-[10px] text-muted-foreground">{t("authLabel")}</span>
                      {provider.authTypes.map((auth) => (
                        <Badge
                          key={auth}
                          variant="outline"
                          className="text-[10px] border-border/40 font-mono"
                        >
                          {auth}
                        </Badge>
                      ))}
                    </div>

                    <a
                      href={provider.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
                    >
                      {t("visitSite")}
                      <ExternalLink className="h-3 w-3" />
                    </a>
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
