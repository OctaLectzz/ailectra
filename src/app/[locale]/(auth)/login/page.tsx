import { LoginForm } from "@/components/auth/login-form"

export default function LoginPage() {
  return (
    <div className="relative isolate overflow-hidden min-h-screen flex items-center justify-center bg-void-navy px-4 py-12">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.06),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(236,72,153,0.04),transparent_50%)] pointer-events-none" />
      
      {/* Futuristic Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: "24px 24px"
        }}
      />

      <div className="w-full max-w-md z-10 flex flex-col items-center">
        {/* Ailectra Logo */}
        <div className="flex items-center space-x-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20 text-white font-bold select-none text-lg">
            A
          </div>
          <span className="text-xl font-bold tracking-tight text-white font-space-grotesk">
            Ailectra
          </span>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}

export const dynamic = "force-dynamic"
