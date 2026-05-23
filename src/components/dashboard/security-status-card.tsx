"use client"

import { GlassPanel } from "@/components/ui/glass-panel"
import { CheckCircle, EyeOff, Lock, ShieldCheck } from "lucide-react"
import { useTranslations } from "next-intl"

export function SecurityStatusCard() {
  const t = useTranslations("dashboard")

  const securityPolicies = [
    { label: "AES-256-GCM Encryption", desc: "Credentials are encrypted at rest with a secure key.", icon: Lock },
    { label: "No plain text logging", desc: "Credentials are never output to system console logs.", icon: EyeOff },
    { label: "Ownership checking", desc: "Redirection endpoints verify user credentials ownership.", icon: ShieldCheck },
  ]

  return (
    <GlassPanel interactive className="h-full group">
      <div className="flex flex-col h-full p-6 relative z-10">
        <h3 className="text-base font-semibold text-white flex items-center mb-4">
          <ShieldCheck className="w-5 h-5 mr-2 text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          {t("vaultStatus")}
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl shadow-[inset_0_0_15px_rgba(16,185,129,0.05)]">
            <CheckCircle className="w-6 h-6 text-emerald-500 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-emerald-500">{t("vaultSecure")}</h4>
              <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{t("vaultDesc")}</p>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            {securityPolicies.map((policy, idx) => {
              const Icon = policy.icon
              return (
                <div key={idx} className="flex items-start space-x-3 text-xs group/policy">
                  <div className="w-7 h-7 rounded-lg bg-slate-900/50 border border-slate-800 flex items-center justify-center text-primary mt-0.5 group-hover/policy:border-primary/50 group-hover/policy:bg-primary/10 transition-colors duration-300">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-slate-200 group-hover/policy:text-white transition-colors">{policy.label}</h5>
                    <p className="text-slate-500 mt-0.5">{policy.desc}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        
        {/* Subtle glow on hover */}
        <div className="absolute -top-4 -right-4 w-32 h-32 bg-emerald-500/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </GlassPanel>
  )
}
export default SecurityStatusCard
