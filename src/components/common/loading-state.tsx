import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

type LoadingStateProps = {
  text?: string
  className?: string
  size?: "sm" | "md" | "lg"
}

const spinnerSize = {
  sm: "h-4 w-4",
  md: "h-6 w-6",
  lg: "h-8 w-8",
} as const

export function LoadingState({
  text = "Loading...",
  className,
  size = "md",
}: LoadingStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3 py-16",
        className
      )}
      role="status"
      aria-label={text}
    >
      <Loader2
        className={cn("animate-spin text-primary", spinnerSize[size])}
      />
      {text ? (
        <p className="text-sm text-muted-foreground">{text}</p>
      ) : null}
    </div>
  )
}
