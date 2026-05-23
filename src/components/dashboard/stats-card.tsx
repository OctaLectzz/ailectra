import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import React from "react"

interface StatsCardProps {
  title: string
  value: string | number
  description?: string
  icon: React.ComponentType<{ className?: string }>
}

export function StatsCard({ title, value, description, icon: Icon }: StatsCardProps) {
  return (
    <Card className="bg-[#0b1020] border-[#11172a] hover:border-primary/30 transition-all duration-300 relative overflow-hidden group">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-slate-400">{title}</CardTitle>
        <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-200" />
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-white tracking-tight">{value}</div>
        {description && <p className="text-xs text-slate-500 mt-1">{description}</p>}
      </CardContent>
    </Card>
  )
}
export default StatsCard
