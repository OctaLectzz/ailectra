"use client"

import { cn } from "@/lib/utils"

type GridPatternProps = {
  className?: string
  /** Grid cell size in pixels */
  cellSize?: number
}

/**
 * Perspective grid pattern with center glow.
 * Used for Security sections.
 */
export function GridPattern({ className, cellSize = 40 }: GridPatternProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern
            id="grid-pattern"
            x="0"
            y="0"
            width={cellSize}
            height={cellSize}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${cellSize} 0 L 0 0 0 ${cellSize}`}
              fill="none"
              className="stroke-foreground/4 dark:stroke-foreground/8"
              strokeWidth="1"
            />
          </pattern>
          <radialGradient id="grid-glow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="70%" stopColor="white" stopOpacity="0.4" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="grid-mask">
            <rect width="100%" height="100%" fill="url(#grid-glow)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#grid-pattern)"
          mask="url(#grid-mask)"
        />
      </svg>

      {/* Center glow accent */}
      <div
        className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent 70%)",
        }}
      />
    </div>
  )
}
