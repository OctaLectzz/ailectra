import { AnimatedCounter } from "@/components/ui/animated-counter"
import { GlassPanel } from "@/components/ui/glass-panel"
import React from "react"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: React.ComponentType<{ className?: string }>
}

export function StatsCard({ title, value, description, icon: Icon }: StatsCardProps) {
  // Check if value is a number to use AnimatedCounter
  const isNumber = typeof value === 'number' || !isNaN(Number(value))
  const numValue = isNumber ? Number(value) : 0

  return (
    <GlassPanel interactive className="h-full group">
      <div className="flex flex-col h-full p-5 relative z-10">
        <div className="flex flex-row items-center justify-between pb-2 space-y-0">
          <h3 className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">{title}</h3>
          <div className="w-10 h-10 rounded-full bg-slate-900/50 flex items-center justify-center border border-slate-800 group-hover:border-primary/50 group-hover:bg-primary/10 transition-colors">
            <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]" />
          </div>
        </div>
        <div className="mt-2">
          <div className="text-4xl font-bold text-white tracking-tight flex items-center">
            {isNumber ? <AnimatedCounter value={numValue} /> : value}
          </div>
          {description && <p className="text-xs text-slate-500 mt-2 line-clamp-1">{description}</p>}
        </div>
        
        {/* Subtle glow on hover */}
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>
    </GlassPanel>
  )
}
export default StatsCard
