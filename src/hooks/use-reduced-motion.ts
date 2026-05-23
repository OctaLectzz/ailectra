"use client"

import { useEffect, useState } from "react"

/**
 * Returns true if the user prefers reduced motion.
 * SSR-safe: defaults to false on the server.
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)")
    setPrefersReducedMotion(mql.matches)

    function handleChange(e: MediaQueryListEvent) {
      setPrefersReducedMotion(e.matches)
    }

    mql.addEventListener("change", handleChange)
    return () => mql.removeEventListener("change", handleChange)
  }, [])

  return prefersReducedMotion
}
