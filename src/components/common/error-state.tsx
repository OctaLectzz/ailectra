import { cn } from "@/lib/utils"
import { AlertTriangle } from "lucide-react"

type ErrorStateProps = {
  error?: string
  onRetry?: () => void
  className?: string
}

export function ErrorState({
  error = "Something went wrong",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-16 text-center",
        className
      )}
      role="alert"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
        <AlertTriangle className="h-7 w-7" />
      </div>

      <div>
        <h3 className="font-heading text-lg font-medium">Error</h3>
        <p className="mt-1 max-w-sm text-sm text-muted-foreground">{error}</p>
      </div>

      {onRetry ? (
        <button
          onClick={onRetry}
          className="mt-2 rounded-xl border border-border bg-muted px-4 py-2 text-sm font-medium transition-colors hover:bg-muted/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          Try Again
        </button>
      ) : null}
    </div>
  )
}
