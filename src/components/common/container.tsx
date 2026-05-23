import { cn } from "@/lib/utils"

type ContainerProps = {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
}

export function Container({
  children,
  className,
  as = "div",
}: ContainerProps) {
  const Component = as as any
  return (
    <Component
      className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", className)}
    >
      {children}
    </Component>
  )
}
