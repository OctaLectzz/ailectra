"use client"

import { cn } from "@/lib/utils"
import { useReducedMotion } from "framer-motion"

type ParticlesBackgroundProps = {
  className?: string
  /** Number of particles */
  count?: number
}

/**
 * Lightweight CSS-animated floating particles.
 * Used for feature hero pages.
 */
export function ParticlesBackground({
  className,
  count = 30,
}: ParticlesBackgroundProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
          className
        )}
        aria-hidden="true"
      >
        <div className="gradient-hero-glow absolute inset-0 opacity-30" />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      {Array.from({ length: count }).map((_, i) => {
        const size = 2 + Math.random() * 3
        const x = Math.random() * 100
        const y = Math.random() * 100
        const duration = 15 + Math.random() * 20
        const delay = Math.random() * 10
        const opacity = 0.15 + Math.random() * 0.35
        const colors = [
          "rgba(139, 92, 246, VAR)",
          "rgba(34, 211, 238, VAR)",
          "rgba(244, 114, 182, VAR)",
        ]
        const color = colors[i % 3].replace("VAR", String(opacity))

        return (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${x}%`,
              top: `${y}%`,
              backgroundColor: color,
              boxShadow: `0 0 ${size * 3}px ${color}`,
              animation: `particle-float ${duration}s ease-in-out ${delay}s infinite`,
            }}
          />
        )
      })}
    </div>
  )
}
