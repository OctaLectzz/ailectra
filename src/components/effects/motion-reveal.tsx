"use client"

import { cn } from "@/lib/utils"
import { motion, useReducedMotion } from "framer-motion"

type MotionRevealProps = {
  children: React.ReactNode
  className?: string
  /** Animation direction */
  direction?: "up" | "down" | "left" | "right"
  /** Delay in seconds */
  delay?: number
  /** Duration in seconds */
  duration?: number
}

const directionOffsets = {
  up: { y: 24, x: 0 },
  down: { y: -24, x: 0 },
  left: { x: 24, y: 0 },
  right: { x: -24, y: 0 },
}

export function MotionReveal({
  children,
  className,
  direction = "up",
  delay = 0,
  duration = 0.6,
}: MotionRevealProps) {
  const reduceMotion = useReducedMotion()
  const offset = directionOffsets[direction]

  return (
    <motion.div
      className={cn(className)}
      initial={
        reduceMotion
          ? false
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      whileInView={
        reduceMotion
          ? {}
          : { opacity: 1, x: 0, y: 0 }
      }
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  )
}
