"use client"

import { cn } from "@/lib/utils"

type DotPatternProps = {
  className?: string
  /** Spacing between dots in pixels */
  spacing?: number
  /** Dot radius */
  dotSize?: number
}

/**
 * Repeating dot grid pattern with radial fade.
 * Used for Features / Bento sections.
 */
export function DotPattern({
  className,
  spacing = 24,
  dotSize = 1,
}: DotPatternProps) {
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
            id="dot-pattern"
            x="0"
            y="0"
            width={spacing}
            height={spacing}
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx={spacing / 2}
              cy={spacing / 2}
              r={dotSize}
              className="fill-foreground/7 dark:fill-foreground/12"
            />
          </pattern>
          <radialGradient id="dot-fade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <mask id="dot-mask">
            <rect width="100%" height="100%" fill="url(#dot-fade)" />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="url(#dot-pattern)"
          mask="url(#dot-mask)"
        />
      </svg>
    </div>
  )
}
