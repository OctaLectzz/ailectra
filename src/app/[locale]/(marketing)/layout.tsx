import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { LenisProvider } from "@/components/providers/lenis-provider"
import type { ReactNode } from "react"

export default function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* JSON-LD WebApplication Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "Ailectra",
            applicationCategory: "ProductivityApplication",
            operatingSystem: "Web",
            description: "A futuristic AI account access hub. Connect, manage, and launch all your AI services from a single secure dashboard.",
            url: "https://ailectra.app",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />

      <SiteHeader />
      <LenisProvider>
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </LenisProvider>
    </div>
  )
}
