"use client"

import { cn } from "@/lib/utils"
import { useEffect, useRef } from "react"

type SpotlightProps = {
  className?: string
}

/**
 * Mouse-following spotlight gradient effect.
 * Falls back to static center glow on touch devices.
 */
export function Spotlight({ className }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const spotlightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const spotlight = spotlightRef.current
    if (!container || !spotlight) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      spotlight.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(139, 92, 246, 0.12), transparent 40%)`
    }

    const handleMouseLeave = () => {
      spotlight.style.background = `radial-gradient(600px circle at 50% 50%, rgba(139, 92, 246, 0.08), transparent 40%)`
    }

    container.addEventListener("mousemove", handleMouseMove)
    container.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      container.removeEventListener("mousemove", handleMouseMove)
      container.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        className
      )}
      aria-hidden="true"
      style={{ pointerEvents: "auto" }}
    >
      <div
        ref={spotlightRef}
        className="absolute inset-0 transition-[background] duration-300"
        style={{
          background:
            "radial-gradient(600px circle at 50% 50%, rgba(139, 92, 246, 0.08), transparent 40%)",
        }}
      />
    </div>
  )
}
