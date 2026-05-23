import { CtaSection } from "@/components/marketing/cta-section"
import { PricingCards } from "@/components/marketing/pricing-cards"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "Pricing — Ailectra",
  description:
    "Start free. Upgrade when you need more power for AI account management.",
  path: "/pricing",
})

export default function PricingPage() {
  return (
    <>
      <div className="pt-16 md:pt-24" />
      <PricingCards />
      <CtaSection />
    </>
  )
}
