"use client"

import { cn } from "@/lib/utils"
import { useReducedMotion } from "framer-motion"

type AuroraBackgroundProps = {
  className?: string
}

/**
 * Animated aurora / northern-lights gradient blobs.
 * Used for About page and softer sections.
 */
export function AuroraBackground({ className }: AuroraBackgroundProps) {
  const reduceMotion = useReducedMotion()

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          "absolute -top-1/2 left-0 h-full w-full opacity-30",
          !reduceMotion && "animate-aurora-1"
        )}
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(139, 92, 246, 0.3), transparent)",
          filter: "blur(80px)",
        }}
      />
      <div
        className={cn(
          "absolute -bottom-1/4 right-0 h-3/4 w-3/4 opacity-25",
          !reduceMotion && "animate-aurora-2"
        )}
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(34, 211, 238, 0.25), transparent)",
          filter: "blur(80px)",
        }}
      />
      <div
        className={cn(
          "absolute left-1/4 top-1/3 h-1/2 w-1/2 opacity-20",
          !reduceMotion && "animate-aurora-3"
        )}
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(244, 114, 182, 0.2), transparent)",
          filter: "blur(80px)",
        }}
      />
    </div>
  )
}
