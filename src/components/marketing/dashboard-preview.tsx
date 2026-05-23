"use client"

import { Section, SectionHeading } from "@/components/common"
import { MotionReveal, Spotlight } from "@/components/effects"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Activity, BarChart3, Clock, Zap } from "lucide-react"
import { useTranslations } from "next-intl"

const mockCards = [
  { provider: "ChatGPT", accounts: 3, status: "active", color: "#10A37F" },
  { provider: "Claude", accounts: 2, status: "active", color: "#D4A574" },
  { provider: "Gemini", accounts: 1, status: "active", color: "#4285F4" },
  { provider: "Cursor", accounts: 2, status: "active", color: "#F472B6" },
]

const mockHistory = [
  { provider: "ChatGPT", account: "work@email.com", time: "2 min ago" },
  { provider: "Claude", account: "personal@email.com", time: "15 min ago" },
  { provider: "Cursor", account: "dev@email.com", time: "1 hour ago" },
]

export function DashboardPreview() {
  const t = useTranslations("home")

  return (
    <Section
      className="border-t border-border/10"
      background={<Spotlight />}
    >
      <SectionHeading
        badge={t("previewBadge")}
        title={t("previewTitle")}
        subtitle={t("previewSubtitle")}
      />

      <MotionReveal delay={0.2} className="max-w-5xl mx-auto">
        {/* Mock Dashboard */}
        <div className="rounded-2xl border border-border/30 glass p-4 md:p-6 shadow-glow">
          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6">
            {[
              { label: "Connected", value: "8", icon: Activity, change: "+2 this week" },
              { label: "Launches", value: "142", icon: Zap, change: "+12 today" },
              { label: "Providers", value: "6", icon: BarChart3, change: "4 categories" },
              { label: "Last Launch", value: "2m", icon: Clock, change: "ChatGPT" },
            ].map((stat) => {
              const Icon = stat.icon
              return (
                <Card key={stat.label} className="glass p-3 md:p-4 border-border/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="text-xs text-muted-foreground">{stat.label}</span>
                  </div>
                  <p className="text-xl md:text-2xl font-heading font-bold">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{stat.change}</p>
                </Card>
              )
            })}
          </div>

          {/* Two column layout */}
          <div className="grid md:grid-cols-5 gap-4">
            {/* Provider cards */}
            <div className="md:col-span-3 space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Connected Accounts</h3>
              {mockCards.map((card) => (
                <Card
                  key={card.provider}
                  className="glass p-3 flex items-center justify-between border-border/20 hover:border-primary/20 transition-colors group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="h-9 w-9 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{
                        backgroundColor: `${card.color}15`,
                        color: card.color,
                      }}
                    >
                      {card.provider.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{card.provider}</p>
                      <p className="text-xs text-muted-foreground">
                        {card.accounts} account{card.accounts > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[10px] border-success/30 text-success bg-success/10"
                  >
                    {card.status}
                  </Badge>
                </Card>
              ))}
            </div>

            {/* Recent launches */}
            <div className="md:col-span-2">
              <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent Launches</h3>
              <div className="space-y-3">
                {mockHistory.map((item, i) => (
                  <Card key={i} className="glass p-3 border-border/20">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{item.provider}</p>
                        <p className="text-xs text-muted-foreground">{item.account}</p>
                      </div>
                      <span className="text-[10px] text-muted-foreground">{item.time}</span>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Mock chart */}
              <Card className="glass p-3 mt-3 border-border/20">
                <p className="text-xs text-muted-foreground mb-2">Weekly Activity</p>
                <div className="flex items-end gap-1.5 h-16">
                  {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm gradient-primary opacity-60"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </MotionReveal>
    </Section>
  )
}
