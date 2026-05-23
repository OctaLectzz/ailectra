import { AnimatedGraph } from "@/components/marketing/animated-graph"
import { CtaSection } from "@/components/marketing/cta-section"
import { DashboardPreview } from "@/components/marketing/dashboard-preview"
import { FaqSection } from "@/components/marketing/faq-section"
import { FeatureBento } from "@/components/marketing/feature-bento"
import { HeroSection } from "@/components/marketing/hero-section"
import { HowItWorks } from "@/components/marketing/how-it-works"
import { IntegrationsPreview } from "@/components/marketing/integrations-preview"
import { LogoCloud } from "@/components/marketing/logo-cloud"
import { SecurityVault } from "@/components/marketing/security-vault"
import { createMetadata } from "@/lib/seo"

export const metadata = createMetadata({
  title: "Ailectra — One Access for Every AI",
  description:
    "Connect, organize, and launch your AI tools from one futuristic dashboard.",
  path: "/",
})

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoCloud />
      <FeatureBento />
      <HowItWorks />
      <AnimatedGraph />
      <SecurityVault />
      <DashboardPreview />
      <IntegrationsPreview />
      <FaqSection />
      <CtaSection />
    </>
  )
}
