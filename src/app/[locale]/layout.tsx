import { ThemeProvider } from "@/components/providers/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { routing } from "@/i18n/routing"
import "@/styles/globals.css"
import type { Metadata } from "next"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "next-intl/server"
import { Geist_Mono, Inter, Space_Grotesk } from "next/font/google"
import { notFound } from "next/navigation"

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Ailectra — One Access for Every AI",
    template: "%s | Ailectra",
  },
  description:
    "Ailectra is a futuristic AI account access hub. Connect, manage, and launch all your AI services from a single secure dashboard.",
  keywords: [
    "AI",
    "artificial intelligence",
    "account manager",
    "AI hub",
    "ChatGPT",
    "Claude",
    "Gemini",
    "Ailectra",
  ],
  authors: [{ name: "Ailectra" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Ailectra",
    title: "Ailectra — One Access for Every AI",
    description:
      "Connect, manage, and launch all your AI services from a single secure dashboard.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ailectra — One Access for Every AI",
    description:
      "Connect, manage, and launch all your AI services from a single secure dashboard.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Ensure that the incoming locale is valid
  if (!routing.locales.includes(locale as any)) {
    notFound()
  }

  // Get messages for the current locale
  const messages = await getMessages()

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider>
            <TooltipProvider>{children}</TooltipProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
