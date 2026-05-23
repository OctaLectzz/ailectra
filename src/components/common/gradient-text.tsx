import { cn } from "@/lib/utils"

type GradientTextProps = {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function GradientText({
  children,
  className,
  as = "span",
}: GradientTextProps) {
  const Component = as as any
  return (
    <Component className={cn("gradient-text", className)}>
      {children}
    </Component>
  )
}
