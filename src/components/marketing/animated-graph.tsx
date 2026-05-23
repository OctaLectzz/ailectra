"use client"

import { Section, SectionHeading } from "@/components/common"
import { MotionReveal } from "@/components/effects"
import { motion, useReducedMotion } from "framer-motion"
import { useTranslations } from "next-intl"

const nodes = [
  { name: "ChatGPT", color: "#10A37F", x: 85, y: 25 },
  { name: "Claude", color: "#D4A574", x: 95, y: 55 },
  { name: "Gemini", color: "#4285F4", x: 80, y: 80 },
  { name: "Perplexity", color: "#20808D", x: 15, y: 25 },
  { name: "Cursor", color: "#F472B6", x: 5, y: 55 },
  { name: "Lovable", color: "#FF6154", x: 20, y: 80 },
]

const centerX = 50
const centerY = 50

export function AnimatedGraph() {
  const t = useTranslations("home")
  const reduceMotion = useReducedMotion()

  return (
    <Section className="border-t border-border/10">
      <SectionHeading
        badge={t("graphBadge")}
        title={t("graphTitle")}
        subtitle={t("graphSubtitle")}
      />

      <MotionReveal delay={0.2} className="max-w-2xl mx-auto">
        <div className="relative aspect-square max-h-[500px] mx-auto">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Connection lines */}
            {nodes.map((node, i) => (
              <motion.line
                key={`line-${node.name}`}
                x1={centerX}
                y1={centerY}
                x2={node.x}
                y2={node.y}
                stroke={node.color}
                strokeWidth="0.3"
                strokeOpacity="0.4"
                initial={reduceMotion ? {} : { pathLength: 0 }}
                whileInView={reduceMotion ? {} : { pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3 + i * 0.15 }}
              />
            ))}

            {/* Pulse effect on lines */}
            {!reduceMotion &&
              nodes.map((node) => (
                <motion.circle
                  key={`pulse-${node.name}`}
                  r="0.8"
                  fill={node.color}
                  opacity={0.6}
                  initial={{ cx: centerX, cy: centerY }}
                  animate={{
                    cx: [centerX, node.x],
                    cy: [centerY, node.y],
                    opacity: [0, 0.8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 2 + Math.random() * 3,
                    ease: "easeInOut",
                  }}
                />
              ))}
          </svg>

          {/* Center node — Ailectra */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
          >
            <motion.div
              className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl gradient-primary flex items-center justify-center shadow-glow"
              initial={reduceMotion ? {} : { scale: 0 }}
              whileInView={reduceMotion ? {} : { scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", duration: 0.8 }}
            >
              <span className="font-heading text-lg sm:text-xl font-bold text-white">A</span>
            </motion.div>
          </div>

          {/* Outer nodes */}
          {nodes.map((node, i) => (
            <motion.div
              key={node.name}
              className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              initial={reduceMotion ? {} : { scale: 0, opacity: 0 }}
              whileInView={reduceMotion ? {} : { scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.1, type: "spring" }}
              whileHover={{ scale: 1.15 }}
            >
              <div
                className="h-11 w-11 sm:h-14 sm:w-14 rounded-xl glass flex flex-col items-center justify-center cursor-pointer group"
                style={{
                  borderColor: `${node.color}30`,
                  boxShadow: `0 0 20px ${node.color}15`,
                }}
              >
                <span
                  className="text-xs sm:text-sm font-bold"
                  style={{ color: node.color }}
                >
                  {node.name.slice(0, 2)}
                </span>
              </div>
              {/* Label on hover */}
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] sm:text-xs text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {node.name}
              </span>
            </motion.div>
          ))}
        </div>
      </MotionReveal>
    </Section>
  )
}
