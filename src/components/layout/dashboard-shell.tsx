import { cn } from "@/lib/utils"
import React from "react"

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export function DashboardShell({ children, className, ...props }: DashboardShellProps) {
  return (
    <div className={cn("flex flex-1 flex-col space-y-6 p-6 md:p-8 pt-6", className)} {...props}>
      {children}
    </div>
  )
}
export default DashboardShell
