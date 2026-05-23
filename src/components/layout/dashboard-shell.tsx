"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

interface DashboardShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function DashboardShell({ children, className, ...props }: DashboardShellProps) {
  return (
    <div className={cn("flex flex-1 flex-col space-y-6 p-6 md:p-8 pt-6 relative min-h-screen", className)} {...props}>
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div 
          animate={{ 
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.05, 1] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-primary/20 blur-[120px]"
        />
        <motion.div 
          animate={{ 
            opacity: [0.1, 0.15, 0.1],
            scale: [1, 1.1, 1] 
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
          className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-secondary/15 blur-[120px]"
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto space-y-6">
        {children}
      </div>
    </div>
  );
}
export default DashboardShell;
