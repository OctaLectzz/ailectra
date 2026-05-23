import { cn } from "@/lib/utils"

type IconBadgeProps = {
  icon: React.ReactNode
  size?: "sm" | "md" | "lg"
  className?: string
}

const sizeClasses = {
  sm: "h-8 w-8",
  md: "h-10 w-10",
  lg: "h-12 w-12",
} as const

export function IconBadge({ icon, size = "md", className }: IconBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center rounded-xl bg-muted text-primary transition-colors hover:border-primary/30",
        "border border-border/50",
        sizeClasses[size],
        className
      )}
    >
      {icon}
    </div>
  )
}
