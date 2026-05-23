"use client"

import { cn } from "@/lib/utils"
import { useReducedMotion } from "framer-motion"

type BackgroundBeamsProps = {
  className?: string
  /** Number of beams to render */
  beamCount?: number
}

/**
 * Animated gradient beams effect for hero sections.
 * Uses CSS animations for performance, with reduced-motion support.
 */
export function BackgroundBeams({
  className,
  beamCount = 6,
}: BackgroundBeamsProps) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <div
        className={cn(
          "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
          className
        )}
      >
        <div className="gradient-hero-glow absolute inset-0 opacity-60" />
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
      {/* Base radial glow */}
      <div className="gradient-hero-glow absolute inset-0 opacity-50" />

      {/* Animated beams */}
      <svg
        className="absolute inset-0 h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beam-gradient-violet" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.12)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
          </linearGradient>
          <linearGradient id="beam-gradient-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(34, 211, 238, 0)" />
            <stop offset="50%" stopColor="rgba(34, 211, 238, 0.10)" />
            <stop offset="100%" stopColor="rgba(34, 211, 238, 0)" />
          </linearGradient>
          <linearGradient id="beam-gradient-magenta" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(244, 114, 182, 0)" />
            <stop offset="50%" stopColor="rgba(244, 114, 182, 0.08)" />
            <stop offset="100%" stopColor="rgba(244, 114, 182, 0)" />
          </linearGradient>
        </defs>

        {Array.from({ length: beamCount }).map((_, i) => {
          const gradient =
            i % 3 === 0
              ? "url(#beam-gradient-violet)"
              : i % 3 === 1
                ? "url(#beam-gradient-cyan)"
                : "url(#beam-gradient-magenta)"
          const delay = i * 1.2
          const duration = 6 + (i % 3) * 2
          const startX = 10 + (i * 80) / beamCount
          const endX = 30 + ((i + 2) * 60) / beamCount

          return (
            <line
              key={i}
              x1={`${startX}%`}
              y1="-10%"
              x2={`${endX}%`}
              y2="110%"
              stroke={gradient}
              strokeWidth={80 + i * 20}
              opacity={0.6}
              className="animate-beam"
              style={{
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
              }}
            />
          )
        })}
      </svg>

      {/* Floating orbs */}
      <div
        className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full opacity-20 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(139, 92, 246, 0.5), transparent 70%)",
          animation: "float 8s ease-in-out infinite",
        }}
      />
      <div
        className="absolute right-1/4 top-1/2 h-80 w-80 rounded-full opacity-15 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(34, 211, 238, 0.4), transparent 70%)",
          animation: "float 10s ease-in-out infinite 2s",
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/2 h-72 w-72 rounded-full opacity-15 blur-[100px]"
        style={{
          background:
            "radial-gradient(circle, rgba(244, 114, 182, 0.35), transparent 70%)",
          animation: "float 7s ease-in-out infinite 4s",
        }}
      />
    </div>
  )
}
