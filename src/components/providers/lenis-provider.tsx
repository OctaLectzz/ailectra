"use client"

import { useReducedMotion } from "framer-motion"
import { ReactLenis } from "lenis/react"
import { ReactNode } from "react"

export function LenisProvider({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion()

  // If user prefers reduced motion, don't wrap with Lenis smooth scroll
  if (reduceMotion) {
    return <>{children}</>
  }

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  )
}
