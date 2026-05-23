"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  actions?: React.ReactNode;
}

export function PageHeader({ title, description, className, actions }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/60 mb-6", className)}>
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-1.5"
      >
        <h1 className="text-2xl font-bold tracking-tight text-white font-space-grotesk flex items-center">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-slate-400 max-w-xl">
            {description}
          </p>
        )}
      </motion.div>
      
      {actions && (
        <motion.div 
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex items-center gap-3"
        >
          {actions}
        </motion.div>
      )}
    </div>
  );
}
