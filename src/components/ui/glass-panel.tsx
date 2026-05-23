"use client";
import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";
import React from "react";

interface GlassPanelProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

export function GlassPanel({ children, className, interactive = false, ...props }: GlassPanelProps) {
  return (
    <motion.div
      className={cn(
        "relative rounded-2xl bg-[#0b1020]/60 backdrop-blur-xl border border-slate-800/80 overflow-hidden",
        interactive && "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 transition-colors duration-300",
        className
      )}
      {...props}
    >
      {/* Noise Texture Overlay for premium feel */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none mix-blend-overlay z-0" 
        style={{
          backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')"
        }}
      />
      
      {/* Subtle top edge highlight */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />
      
      <div className="relative z-10 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
