"use client"

import { GradientText, Section } from "@/components/common"
import { GridPattern, MotionReveal } from "@/components/effects"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Link } from "@/i18n/routing"
import { ArrowRight, Mail, MessageSquare } from "lucide-react"
import { useTranslations } from "next-intl"

export default function ContactPage() {
  const t = useTranslations("contact")

  return (
    <>
      {/* Hero */}
      <Section
        className="pt-20 pb-8 md:pt-32 md:pb-16"
        background={<GridPattern cellSize={50} />}
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

      {/* Contact form + Support */}
      <Section>
        <div className="grid md:grid-cols-5 gap-8 max-w-4xl mx-auto">
          {/* Form */}
          <MotionReveal className="md:col-span-3">
            <Card className="glass border-border/20 shadow-glow">
              <CardHeader>
                <CardTitle className="font-heading text-xl font-semibold flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  {t("formSubmit")}
                </CardTitle>
              </CardHeader>
              <form className="px-6 pb-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">{t("formName")}</label>
                  <Input placeholder={t("formName")} className="glass border-border/30" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">{t("formEmail")}</label>
                  <Input type="email" placeholder={t("formEmail")} className="glass border-border/30" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">{t("formSubject")}</label>
                  <Input placeholder={t("formSubject")} className="glass border-border/30" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">{t("formMessage")}</label>
                  <textarea
                    placeholder={t("formMessage")}
                    rows={4}
                    className="w-full rounded-xl glass border border-border/30 bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>
                <Button className="w-full rounded-xl gradient-primary text-white font-semibold shadow-glow hover:opacity-90 transition-all">
                  {t("formSubmit")}
                </Button>
              </form>
            </Card>
          </MotionReveal>

          {/* Support info */}
          <MotionReveal delay={0.15} className="md:col-span-2 space-y-6">
            <Card className="glass border-border/20 shadow-glow">
              <CardHeader>
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Mail className="h-5 w-5" />
                </div>
                <CardTitle className="font-heading text-lg font-semibold">
                  {t("supportTitle")}
                </CardTitle>
                <CardDescription className="text-muted-foreground mt-2 leading-relaxed">
                  {t("supportDesc")}
                </CardDescription>
                <a
                  href={`mailto:${t("supportEmail")}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  {t("supportEmail")}
                </a>
              </CardHeader>
            </Card>

            <Card className="glass border-border/20 hover:border-primary/20 transition-colors">
              <CardHeader>
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  {t("faqLink")}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </CardHeader>
            </Card>
          </MotionReveal>
        </div>
      </Section>
    </>
  )
}
