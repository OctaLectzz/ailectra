"use client"

import { Section, SectionHeading } from "@/components/common"
import { StaggerContainer, StaggerItem } from "@/components/effects"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Check, Star } from "lucide-react"
import { useTranslations } from "next-intl"

type Plan = {
  nameKey: string
  priceKey: string
  descKey: string
  featuresKey: string
  ctaKey: string
  featured?: boolean
}

const plans: Plan[] = [
  {
    nameKey: "freeName",
    priceKey: "freePrice",
    descKey: "freeDesc",
    featuresKey: "freeFeatures",
    ctaKey: "freeCta",
  },
  {
    nameKey: "proName",
    priceKey: "proPrice",
    descKey: "proDesc",
    featuresKey: "proFeatures",
    ctaKey: "proCta",
    featured: true,
  },
  {
    nameKey: "teamName",
    priceKey: "teamPrice",
    descKey: "teamDesc",
    featuresKey: "teamFeatures",
    ctaKey: "teamCta",
  },
]

export function PricingCards() {
  const t = useTranslations("pricing")

  return (
    <Section>
      <SectionHeading
        badge={t("heroBadge")}
        title={t("heroTitle")}
        subtitle={t("heroDescription")}
      />

      <StaggerContainer className="grid gap-6 md:grid-cols-3 max-w-5xl mx-auto">
        {plans.map((plan) => {
          const features = t.raw(plan.featuresKey) as string[]
          const isFeatured = plan.featured

          return (
            <StaggerItem key={plan.nameKey}>
              <Card
                className={cn(
                  "glass relative overflow-hidden transition-all duration-300 hover:-translate-y-1 h-full flex flex-col",
                  isFeatured
                    ? "border-primary/40 shadow-glow ring-1 ring-primary/20"
                    : "border-border/20 hover:border-border/40"
                )}
              >
                {isFeatured && (
                  <div className="absolute top-0 left-0 right-0 h-1 gradient-primary" />
                )}

                <CardHeader className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <CardTitle className="font-heading text-lg font-semibold">
                      {t(plan.nameKey)}
                    </CardTitle>
                    {isFeatured && (
                      <Badge className="gradient-primary text-white border-0 text-[10px] gap-1">
                        <Star className="h-3 w-3" />
                        Popular
                      </Badge>
                    )}
                  </div>

                  <div className="mb-3">
                    <span className="text-3xl font-heading font-bold">
                      {t(plan.priceKey)}
                    </span>
                    {t(plan.priceKey) !== "Coming Soon" && t(plan.priceKey) !== "Segera Hadir" && (
                      <span className="text-sm text-muted-foreground ml-1">/month</span>
                    )}
                  </div>

                  <CardDescription className="text-muted-foreground mb-6">
                    {t(plan.descKey)}
                  </CardDescription>

                  <ul className="space-y-3 mb-6">
                    {features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm">
                        <Check className="h-4 w-4 text-success shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardHeader>

                <div className="px-6 pb-6">
                  <Button
                    className={cn(
                      "w-full rounded-xl font-semibold transition-all hover:scale-[1.02]",
                      isFeatured
                        ? "gradient-primary text-white shadow-glow"
                        : "glass border-border/30"
                    )}
                    variant={isFeatured ? "default" : "outline"}
                  >
                    {t(plan.ctaKey)}
                  </Button>
                </div>
              </Card>
            </StaggerItem>
          )
        })}
      </StaggerContainer>
    </Section>
  )
}
