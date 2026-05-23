import {
  Container,
  GradientText,
  LanguageSwitcher,
  Section,
  SectionHeading,
  ThemeToggle,
} from "@/components/common"
import { MotionReveal, StaggerContainer, StaggerItem } from "@/components/effects"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, Shield, Sparkles, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Glow Background */}
      <div className="gradient-hero-glow absolute inset-0 -z-10" />

      {/* Floating Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-primary">
              <Cpu className="h-5 w-5 text-white animate-pulse" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight">
              Ailectra
            </span>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </Container>
      </header>

      <main>
        {/* Hero Section */}
        <Section className="pt-20 pb-16 md:pt-32 md:pb-24">
          <div className="flex flex-col items-center text-center">
            <MotionReveal duration={0.8}>
              <span className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-xs font-semibold tracking-wide text-primary">
                <Sparkles className="h-3.5 w-3.5 text-quantum-violet" />
                Welcome to the Future of AI Access
              </span>
            </MotionReveal>

            <MotionReveal delay={0.1} duration={0.8}>
              <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-6xl md:text-7xl max-w-4xl mt-4 leading-[1.1]">
                One Access for <br />
                <GradientText>Every Single AI</GradientText>
              </h1>
            </MotionReveal>

            <MotionReveal delay={0.2} duration={0.8}>
              <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-xl leading-8">
                Connect, manage, and launch all your premium AI accounts through a unified security hub. Zero credential leaks, maximum convenience.
              </p>
            </MotionReveal>

            <MotionReveal delay={0.3} duration={0.8} className="mt-10 flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="rounded-full gradient-primary hover:opacity-90 font-semibold px-8 shadow-glow transition-all hover:scale-[1.02]">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="rounded-full glass hover:bg-muted font-semibold px-8 transition-all hover:scale-[1.02]">
                Explore features
              </Button>
            </MotionReveal>
          </div>
        </Section>

        {/* Feature Highlights Section */}
        <Section className="border-t border-border/20 py-20">
          <SectionHeading
            badge="Why Ailectra"
            title="Futuristic Security & Power"
            subtitle="Engineered with secure vault parameters to give you ultimate control over your AI providers."
          />

          <StaggerContainer className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-12">
            <StaggerItem>
              <Card className="glass relative overflow-hidden transition-all hover:-translate-y-1 hover:border-primary/30 shadow-glow">
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-primary/5 blur-2xl" />
                <CardHeader>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Shield className="h-5 w-5" />
                  </div>
                  <CardTitle className="font-heading font-medium">Vault-Grade Security</CardTitle>
                  <CardDescription className="text-muted-foreground mt-2 leading-relaxed">
                    Encryption at rest and in transit. Your tokens and credentials are encrypted using industry-standard AES-256-GCM.
                  </CardDescription>
                </CardHeader>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="glass relative overflow-hidden transition-all hover:-translate-y-1 hover:border-primary/30 shadow-glow">
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-secondary/5 blur-2xl" />
                <CardHeader>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
                    <Zap className="h-5 w-5" />
                  </div>
                  <CardTitle className="font-heading font-medium">Instant Hotkeys</CardTitle>
                  <CardDescription className="text-muted-foreground mt-2 leading-relaxed">
                    Launch any connected AI service instantly with deep-linked session keys. Zero manual log-in workflows.
                  </CardDescription>
                </CardHeader>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="glass relative overflow-hidden transition-all hover:-translate-y-1 hover:border-primary/30 shadow-glow sm:col-span-2 lg:col-span-1">
                <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-accent/5 blur-2xl" />
                <CardHeader>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Cpu className="h-5 w-5" />
                  </div>
                  <CardTitle className="font-heading font-medium">Multi-AI Sync</CardTitle>
                  <CardDescription className="text-muted-foreground mt-2 leading-relaxed">
                    Access ChatGPT, Claude, Gemini, Midjourney, and more in one dynamic dashboard. Switch contexts in milliseconds.
                  </CardDescription>
                </CardHeader>
              </Card>
            </StaggerItem>
          </StaggerContainer>
        </Section>
      </main>

      {/* Floating Footer */}
      <footer className="border-t border-border/20 py-8 bg-background/50">
        <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Ailectra. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
            <a href="#" className="hover:text-primary transition-colors">Security</a>
          </div>
        </Container>
      </footer>
    </div>
  )
}
