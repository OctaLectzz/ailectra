"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useRouter } from "@/i18n/routing"
import { loginSchema, type LoginInput } from "@/lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { signIn } from "next-auth/react"
import { useTranslations } from "next-intl"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export function LoginForm() {
  const t = useTranslations("auth")
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true)
    try {
      const res = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
        callbackUrl: "/dashboard",
      })

      if (res?.error) {
        toast.error("Invalid email or password.")
      } else {
        toast.success("Welcome back! Logging in...")
        router.push("/dashboard")
        router.refresh()
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    setIsGoogleLoading(true)
    signIn("google", { callbackUrl: "/dashboard" })
  }

  return (
    <Card className="w-full max-w-md bg-void-navy/60 backdrop-blur-xl border-[#11172a] shadow-2xl relative overflow-hidden rounded-2xl">
      {/* Visual background accents */}
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

      <CardHeader className="space-y-1 relative">
        <CardTitle className="text-2xl font-bold tracking-tight text-white text-center">
          {t("loginTitle")}
        </CardTitle>
        <CardDescription className="text-slate-400 text-xs text-center">
          {t("loginSubtitle")}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4 relative">
        <Button
          variant="outline"
          type="button"
          disabled={isLoading || isGoogleLoading}
          onClick={handleGoogleSignIn}
          className="w-full bg-slate-900/40 border-[#11172a] hover:bg-slate-950 text-slate-300 font-semibold rounded-xl"
        >
          {isGoogleLoading ? (
            "Connecting..."
          ) : (
            <>
              {/* Google SVG Icon */}
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335"/>
              </svg>
              {t("googleButton")}
            </>
          )}
        </Button>

        <div className="relative flex items-center justify-center my-3">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-[#11172a]" />
          </div>
          <span className="relative bg-void-navy px-3 text-[10px] text-slate-500 font-medium uppercase tracking-wider">
            {t("orText")}
          </span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-300">{t("emailLabel")}</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              {...register("email")}
              className="bg-slate-900/40 border-[#11172a] text-slate-200 rounded-xl focus:border-slate-800 transition"
            />
            {errors.email && (
              <span className="text-xs text-red-500 font-medium">{errors.email.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-slate-300">{t("passwordLabel")}</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="bg-slate-900/40 border-[#11172a] text-slate-200 rounded-xl focus:border-slate-800 transition"
            />
            {errors.password && (
              <span className="text-xs text-red-500 font-medium">{errors.password.message}</span>
            )}
          </div>

          <Button
            type="submit"
            disabled={isLoading || isGoogleLoading}
            className="w-full bg-primary hover:bg-primary-hover text-white font-semibold rounded-xl h-10 mt-6 shadow-lg shadow-primary/10"
          >
            {isLoading ? "Signing in..." : t("submitLogin")}
          </Button>
        </form>
      </CardContent>

      <CardFooter className="flex justify-center border-t border-[#11172a] py-4 bg-[#070a18]/40 relative">
        <span className="text-xs text-slate-400">
          {t("noAccount")}{" "}
          <Link href="/register" className="text-primary hover:text-primary-hover font-semibold transition">
            Sign Up
          </Link>
        </span>
      </CardFooter>
    </Card>
  )
}
