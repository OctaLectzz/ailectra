"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { usePathname, useRouter } from "@/i18n/routing"
import { updateSettingsAction } from "@/server/actions/settings-actions"
import {
  AlertTriangle,
  Laptop,
  Moon,
  ShieldAlert,
  Sliders,
  Sun,
  User,
} from "lucide-react"
import { useLocale, useTranslations } from "next-intl"
import { useTheme } from "next-themes"
import { useState } from "react"
import { toast } from "sonner"

interface SettingsTabsProps {
  user: {
    name?: string | null
    email?: string | null
  }
}

export function SettingsTabs({ user }: SettingsTabsProps) {
  const t = useTranslations("dashboard")
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const [isPending, setIsPending] = useState(false)

  const handleThemeChange = async (newTheme: "DARK" | "LIGHT" | "SYSTEM") => {
    setTheme(newTheme.toLowerCase())
    try {
      const res = await updateSettingsAction({ theme: newTheme })
      if (res.ok) {
        toast.success(res.message)
      }
    } catch {
      toast.error("Failed to persist theme settings.")
    }
  }

  const handleLocaleChange = async (newLocale: "EN" | "ID") => {
    try {
      const res = await updateSettingsAction({ locale: newLocale })
      if (res.ok) {
        toast.success(res.message)
        // Client side route redirection for locale
        router.replace(pathname, { locale: newLocale.toLowerCase() })
      }
    } catch {
      toast.error("Failed to update language settings.")
    }
  }

  return (
    <Tabs defaultValue="profile" className="space-y-6">
      <TabsList className="bg-[#0b1020] border border-[#11172a] rounded-xl p-1 gap-1">
        <TabsTrigger
          value="profile"
          className="rounded-lg text-xs font-semibold px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
        >
          <User className="w-3.5 h-3.5 mr-2" />
          {t("settingsProfile")}
        </TabsTrigger>
        <TabsTrigger
          value="preferences"
          className="rounded-lg text-xs font-semibold px-4 py-2 data-[state=active]:bg-primary data-[state=active]:text-white transition-all"
        >
          <Sliders className="w-3.5 h-3.5 mr-2" />
          {t("settingsPreferences")}
        </TabsTrigger>
        <TabsTrigger
          value="danger"
          className="rounded-lg text-xs font-semibold px-4 py-2 data-[state=active]:bg-destructive data-[state=active]:text-white hover:text-red-400 data-[state=active]:hover:text-white transition-all"
        >
          <ShieldAlert className="w-3.5 h-3.5 mr-2" />
          {t("settingsDangerZone")}
        </TabsTrigger>
      </TabsList>

      {/* Profile Tab */}
      <TabsContent value="profile">
        <Card className="bg-[#0b1020] border-[#11172a] hover:border-slate-800 transition-colors">
          <CardHeader>
            <CardTitle className="text-white text-base font-bold">Profile Details</CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              Manage your credentials account profile parameters.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Display Name</Label>
              <Input
                disabled
                value={user.name || "Dev User"}
                className="bg-[#070a18] border-[#11172a] text-slate-400 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Email Address</Label>
              <Input
                disabled
                value={user.email || "dev@ailectra.app"}
                className="bg-[#070a18] border-[#11172a] text-slate-400 rounded-xl"
              />
            </div>
          </CardContent>
          <CardFooter className="border-t border-[#11172a] text-xs text-slate-500 pt-4">
            Social logins and credential update modules are governed by Auth.js provider settings.
          </CardFooter>
        </Card>
      </TabsContent>

      {/* Preferences Tab */}
      <TabsContent value="preferences">
        <Card className="bg-[#0b1020] border-[#11172a] hover:border-slate-800 transition-colors">
          <CardHeader>
            <CardTitle className="text-white text-base font-bold">{t("settingsPreferences")}</CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              Configure language and theme preferences for Ailectra.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Theme Toggle option */}
            <div className="space-y-3">
              <Label className="text-slate-300 font-semibold">{t("themePreference")}</Label>
              <div className="grid grid-cols-3 gap-3">
                <Button
                  variant={theme === "light" ? "default" : "outline"}
                  onClick={() => handleThemeChange("LIGHT")}
                  className={`rounded-xl flex flex-col items-center justify-center p-6 h-auto border-[#11172a] ${
                    theme === "light"
                      ? "bg-primary text-white border-primary"
                      : "bg-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  <Sun className="w-5 h-5 mb-1.5" />
                  <span className="text-xs">Light</span>
                </Button>
                <Button
                  variant={theme === "dark" ? "default" : "outline"}
                  onClick={() => handleThemeChange("DARK")}
                  className={`rounded-xl flex flex-col items-center justify-center p-6 h-auto border-[#11172a] ${
                    theme === "dark"
                      ? "bg-primary text-white border-primary"
                      : "bg-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  <Moon className="w-5 h-5 mb-1.5" />
                  <span className="text-xs">Dark</span>
                </Button>
                <Button
                  variant={theme === "system" ? "default" : "outline"}
                  onClick={() => handleThemeChange("SYSTEM")}
                  className={`rounded-xl flex flex-col items-center justify-center p-6 h-auto border-[#11172a] ${
                    theme === "system"
                      ? "bg-primary text-white border-primary"
                      : "bg-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  <Laptop className="w-5 h-5 mb-1.5" />
                  <span className="text-xs">System</span>
                </Button>
              </div>
            </div>

            {/* Language Selector options */}
            <div className="space-y-3 pt-2">
              <Label className="text-slate-300 font-semibold">{t("languagePreference")}</Label>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={locale === "en" ? "default" : "outline"}
                  onClick={() => handleLocaleChange("EN")}
                  className={`rounded-xl py-3.5 h-auto border-[#11172a] ${
                    locale === "en"
                      ? "bg-primary text-white border-primary"
                      : "bg-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  English (EN)
                </Button>
                <Button
                  variant={locale === "id" ? "default" : "outline"}
                  onClick={() => handleLocaleChange("ID")}
                  className={`rounded-xl py-3.5 h-auto border-[#11172a] ${
                    locale === "id"
                      ? "bg-primary text-white border-primary"
                      : "bg-transparent text-slate-400 hover:text-white"
                  }`}
                >
                  Bahasa Indonesia (ID)
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      {/* Danger Zone Tab */}
      <TabsContent value="danger">
        <Card className="bg-[#0b1020] border-red-500/20 hover:border-red-500/30 transition-colors">
          <CardHeader>
            <CardTitle className="text-red-500 text-base font-bold flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              {t("settingsDangerZone")}
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              Actions in this section are highly destructive and cannot be undone.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-red-500/5 border border-red-500/10 p-4 rounded-xl gap-4">
              <div>
                <h4 className="text-sm font-semibold text-red-500">{t("deleteData")}</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{t("deleteDataDesc")}</p>
              </div>
              <Button
                variant="destructive"
                className="rounded-xl px-5 py-3 h-auto font-semibold self-start sm:self-center"
              >
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
export default SettingsTabs
