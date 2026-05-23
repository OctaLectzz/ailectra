import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Link } from "@/i18n/routing"
import { AlertCircle, ArrowLeft } from "lucide-react"

export default function AuthErrorPage() {
  return (
    <div className="relative isolate overflow-hidden min-h-screen flex items-center justify-center bg-void-navy px-4 py-12">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(239,68,68,0.06),transparent_50%)] pointer-events-none" />
      
      <div className="w-full max-w-md z-10">
        <Card className="bg-void-navy/60 backdrop-blur-xl border-red-900/20 shadow-2xl relative overflow-hidden rounded-2xl">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-2">
              <AlertCircle className="w-6 h-6 text-red-500" />
            </div>
            <CardTitle className="text-xl font-bold text-white">
              Authentication Error
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">
              An error occurred while trying to authenticate your session.
            </CardDescription>
          </CardHeader>

          <CardContent className="text-center text-xs text-slate-400 space-y-4">
            <p>
              This could be due to a misconfigured credentials configuration, expired Google session credentials, or network failures.
            </p>
          </CardContent>

          <CardFooter className="flex justify-center border-t border-[#11172a] py-4 bg-[#070a18]/40">
            <Button
              asChild
              variant="outline"
              className="bg-slate-900/40 border-[#11172a] hover:bg-slate-950 text-slate-300 font-semibold rounded-xl text-xs"
            >
              <Link href="/login">
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                Back to Sign In
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export const dynamic = "force-dynamic"
