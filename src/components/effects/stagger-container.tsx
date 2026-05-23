"use client"

import { cn } from "@/lib/utils"
import { motion, useReducedMotion, Variants } from "framer-motion"

type StaggerContainerProps = {
  children: React.ReactNode
  className?: string
  /** Delay between each child animation in seconds */
  staggerDelay?: number
  /** Duration of each child animation in seconds */
  childDuration?: number
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  childDuration = 0.5,
}: StaggerContainerProps) {
  const reduceMotion = useReducedMotion()

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : staggerDelay,
      },
    },
  }

  return (
    <motion.div
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
    >
      {children}
    </motion.div>
  )
}

/** Wrap each child of StaggerContainer with this component */
export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const reduceMotion = useReducedMotion()

  const itemVariants: Variants = {
    hidden: reduceMotion
      ? { opacity: 1 }
      : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  }

  return (
    <motion.div className={cn(className)} variants={itemVariants}>
      {children}
    </motion.div>
  )
}
