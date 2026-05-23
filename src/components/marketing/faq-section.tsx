"use client"

import { Section, SectionHeading } from "@/components/common"
import { MotionReveal } from "@/components/effects"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"

export function FaqSection() {
  const t = useTranslations("home")
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const reduceMotion = useReducedMotion()

  const faqs = [
    { q: t("faq1Q"), a: t("faq1A") },
    { q: t("faq2Q"), a: t("faq2A") },
    { q: t("faq3Q"), a: t("faq3A") },
    { q: t("faq4Q"), a: t("faq4A") },
    { q: t("faq5Q"), a: t("faq5A") },
  ]

  return (
    <Section className="border-t border-border/10">
      {/* Subtle radial gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[800px] opacity-30 blur-[120px]"
          style={{
            background: "radial-gradient(ellipse, rgba(139, 92, 246, 0.15), transparent 70%)",
          }}
        />
      </div>

      <SectionHeading
        badge={t("faqBadge")}
        title={t("faqTitle")}
        subtitle={t("faqSubtitle")}
      />

      <MotionReveal delay={0.1} className="max-w-3xl mx-auto">
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div
                key={i}
                className={cn(
                  "rounded-2xl border transition-all duration-300 glass",
                  isOpen
                    ? "border-primary/30 shadow-glow"
                    : "border-border/20 hover:border-border/40"
                )}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between p-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-heading text-sm sm:text-base font-medium pr-4">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 text-muted-foreground shrink-0 transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={reduceMotion ? { height: "auto" } : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduceMotion ? {} : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </MotionReveal>
    </Section>
  )
}
