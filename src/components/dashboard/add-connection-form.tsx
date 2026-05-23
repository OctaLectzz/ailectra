"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "@/i18n/routing"
import { createConnectionSchema, type CreateConnectionInput } from "@/lib/validators"
import { createConnectionAction } from "@/server/actions/account-actions"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  AlertTriangle,
  ArrowLeft,
  ChevronDown,
  Key,
  Lock
} from "lucide-react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

interface ProviderItem {
  id: string
  name: string
  slug: string
  color?: string | null
  supportedAuthTypes: string[]
  websiteUrl: string
}

interface AddConnectionFormProps {
  providers: ProviderItem[]
  preselectedProviderSlug?: string | null
}

export function AddConnectionForm({ providers, preselectedProviderSlug }: AddConnectionFormProps) {
  const t = useTranslations("dashboard")
  const router = useRouter()
  const [isPending, setIsPending] = useState(false)

  // Find preselected provider if available
  const preselected = providers.find((p) => p.slug === preselectedProviderSlug)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CreateConnectionInput>({
    resolver: zodResolver(createConnectionSchema),
    defaultValues: {
      providerId: preselected?.id || "",
      label: "",
      accountEmail: "",
      username: "",
      authType: "MANUAL_CREDENTIAL",
      externalUrl: preselected?.websiteUrl || "",
      secret: "",
      notes: "",
    },
  })

  const selectedProviderId = watch("providerId")
  const selectedProvider = providers.find((p) => p.id === selectedProviderId)
  const currentAuthType = watch("authType")

  const onSubmit = async (data: CreateConnectionInput) => {
    setIsPending(true)
    try {
      const res = await createConnectionAction(data)
      if (res.ok) {
        toast.success(res.message)
        router.push("/dashboard/accounts")
      } else {
        toast.error(res.message || "Failed to create connection.")
      }
    } catch (error) {
      toast.error("A server action error occurred.")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Card className="bg-[#0b1020] border-[#11172a] max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
      {/* Visual glowing bar */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-linear-to-r from-primary via-secondary to-accent" />
      
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center">
          <Key className="w-5 h-5 mr-2 text-primary" />
          {t("addConnection")}
        </CardTitle>
        <CardDescription className="text-slate-400">
          Link an external AI account to Ailectra's encrypted credential vault.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Provider Select */}
          <div className="space-y-2">
            <Label htmlFor="providerId" className="text-slate-300 font-semibold">AI Provider</Label>
            <div className="relative">
              <select
                id="providerId"
                {...register("providerId")}
                onChange={(e) => {
                  const prov = providers.find((p) => p.id === e.target.value)
                  if (prov) {
                    setValue("providerId", prov.id)
                    setValue("externalUrl", prov.websiteUrl)
                    if (prov.supportedAuthTypes.length > 0) {
                      const primaryAuth = prov.supportedAuthTypes[0]
                      setValue("authType", primaryAuth === "manual" ? "MANUAL_CREDENTIAL" : "EXTERNAL_URL")
                    }
                  }
                }}
                className="w-full bg-[#070a18] border border-[#11172a] rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer text-sm"
              >
                <option value="" disabled className="bg-[#0b1020]">Select a provider...</option>
                {providers.map((p) => (
                  <option key={p.id} value={p.id} className="bg-[#0b1020]">
                    {p.name} ({p.websiteUrl.replace("https://", "")})
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            {errors.providerId && (
              <span className="text-xs text-red-500 font-medium">{errors.providerId.message}</span>
            )}
          </div>

          {/* Connection Label */}
          <div className="space-y-2">
            <Label htmlFor="label" className="text-slate-300 font-semibold">Connection Label</Label>
            <Input
              id="label"
              placeholder="e.g. Personal ChatGPT Pro, Company Claude Dev"
              {...register("label")}
              className="bg-[#070a18] border-[#11172a] focus-visible:ring-primary text-slate-200 rounded-xl px-4 py-3 h-auto text-sm"
            />
            {errors.label && (
              <span className="text-xs text-red-500 font-medium">{errors.label.message}</span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Account Email */}
            <div className="space-y-2">
              <Label htmlFor="accountEmail" className="text-slate-300 font-semibold">Account Email (Optional)</Label>
              <Input
                id="accountEmail"
                type="email"
                placeholder="email@provider.com"
                {...register("accountEmail")}
                className="bg-[#070a18] border-[#11172a] focus-visible:ring-primary text-slate-200 rounded-xl px-4 py-3 h-auto text-sm"
              />
              {errors.accountEmail && (
                <span className="text-xs text-red-500 font-medium">{errors.accountEmail.message}</span>
              )}
            </div>

            {/* Username */}
            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-300 font-semibold">Username (Optional)</Label>
              <Input
                id="username"
                placeholder="Username or alias"
                {...register("username")}
                className="bg-[#070a18] border-[#11172a] focus-visible:ring-primary text-slate-200 rounded-xl px-4 py-3 h-auto text-sm"
              />
              {errors.username && (
                <span className="text-xs text-red-500 font-medium">{errors.username.message}</span>
              )}
            </div>
          </div>

          {/* Auth Type selection */}
          <div className="space-y-2">
            <Label htmlFor="authType" className="text-slate-300 font-semibold">Authentication Strategy</Label>
            <div className="relative">
              <select
                id="authType"
                {...register("authType")}
                className="w-full bg-[#070a18] border border-[#11172a] rounded-xl px-4 py-3 text-slate-200 focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer text-sm"
              >
                <option value="MANUAL_CREDENTIAL" className="bg-[#0b1020]">Manual Credential / API Key copy (AES encrypted)</option>
                <option value="EXTERNAL_URL" className="bg-[#0b1020]">Direct URL / Profile redirection (No credentials)</option>
                <option value="OFFICIAL_OAUTH" className="bg-[#0b1020]">OAuth Token access (Coming Soon)</option>
                <option value="DEEPLINK" className="bg-[#0b1020]">Session deep-link (Coming Soon)</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <ChevronDown className="w-4 h-4" />
              </div>
            </div>
            {errors.authType && (
              <span className="text-xs text-red-500 font-medium">{errors.authType.message}</span>
            )}
          </div>

          {/* External / Redirect URL */}
          <div className="space-y-2">
            <Label htmlFor="externalUrl" className="text-slate-300 font-semibold">Workspace Launch URL (Optional)</Label>
            <Input
              id="externalUrl"
              placeholder="https://chat.openai.com or custom workspace URL"
              {...register("externalUrl")}
              className="bg-[#070a18] border-[#11172a] focus-visible:ring-primary text-slate-200 rounded-xl px-4 py-3 h-auto text-sm"
            />
            {errors.externalUrl && (
              <span className="text-xs text-red-500 font-medium">{errors.externalUrl.message}</span>
            )}
          </div>

          {/* Credential secret field - only render or make important if authType is MANUAL_CREDENTIAL */}
          {currentAuthType === "MANUAL_CREDENTIAL" && (
            <div className="space-y-4 border border-[#11172a] bg-[#070a18]/50 p-4 rounded-2xl">
              <div className="flex items-start space-x-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
                <div className="space-y-0.5">
                  <h4 className="text-xs font-bold text-amber-500 uppercase tracking-wider">Vault Protection warning</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Always confirm you have permission to store API keys or passwords. Ailectra encrypts credentials with **AES-256-GCM** before writing to disk. Plaintext values are never logged.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="secret" className="text-slate-300 font-semibold">Password / API Secret Key</Label>
                <div className="relative">
                  <Input
                    id="secret"
                    type="password"
                    placeholder="Enter password or api_key"
                    {...register("secret")}
                    className="bg-[#070a18] border-[#11172a] focus-visible:ring-primary text-slate-200 rounded-xl px-4 py-3 pr-10 h-auto text-sm"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                </div>
                {errors.secret && (
                  <span className="text-xs text-red-500 font-medium">{errors.secret.message}</span>
                )}
              </div>
            </div>
          )}

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="text-slate-300 font-semibold">Notes / Instructions (Optional)</Label>
            <Textarea
              id="notes"
              placeholder="e.g. usage instructions, workspace team scope"
              {...register("notes")}
              className="bg-[#070a18] border-[#11172a] focus-visible:ring-primary text-slate-200 rounded-xl px-4 py-3 min-h-[80px] text-sm"
            />
            {errors.notes && (
              <span className="text-xs text-red-500 font-medium">{errors.notes.message}</span>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-[#11172a]">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="bg-transparent border-[#11172a] hover:bg-slate-950 text-slate-400 rounded-xl px-5 py-3 h-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-1.5" />
              Cancel
            </Button>
            
            <Button
              type="submit"
              disabled={isPending}
              className="bg-primary hover:bg-primary-hover text-white rounded-xl px-6 py-3 h-auto font-semibold shadow-lg shadow-primary/10"
            >
              {isPending ? "Creating..." : "Save Connection"}
            </Button>
          </div>

        </form>
      </CardContent>
    </Card>
  )
}
export default AddConnectionForm
