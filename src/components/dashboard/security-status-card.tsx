"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
    <Card className="bg-[#0b1020] border-[#11172a] hover:border-slate-800 transition-all duration-300">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold text-white flex items-center">
          <ShieldCheck className="w-5 h-5 mr-2 text-emerald-500" />
          {t("vaultStatus")}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-3 bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-xl">
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
              <div key={idx} className="flex items-start space-x-3 text-xs">
                <div className="w-6 h-6 rounded-lg bg-slate-900 border border-[#11172a] flex items-center justify-center text-primary mt-0.5">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h5 className="font-semibold text-slate-200">{policy.label}</h5>
                  <p className="text-slate-500 mt-0.5">{policy.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
export default SecurityStatusCard
