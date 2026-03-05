"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "./Logo";

export default function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if this is the first load in this session
    const hasLoaded = sessionStorage.getItem("hasLoadedBefore");
    
    if (hasLoaded) {
      // Skip animation if already loaded in this session
      setIsLoading(false);
      return;
    }

    // Prevent scrolling during animation
    document.body.style.overflow = "hidden";

    // Mark as loaded for this session
    sessionStorage.setItem("hasLoadedBefore", "true");

    // Complete animation after 1.8 seconds (faster, more confident)
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Re-enable scrolling
      document.body.style.overflow = "";
    }, 1800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <>
          {/* Gradient Background - No "loading" aesthetic */}
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[9998] overflow-hidden"
            style={{
              backgroundColor: "var(--background)",
            }}
          >
            {/* Large Background Text - Brand Statement */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 0.08, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{
                  opacity: { duration: 0.6, delay: 0.2 },
                  scale: { duration: 0.8, delay: 0.2, ease: "easeOut" },
                }}
                className="font-bold tracking-tighter leading-none text-center select-none"
                style={{ 
                  fontSize: "clamp(3rem, 12vw, 10rem)",
                  textTransform: "uppercase",
                  fontWeight: 900,
                  letterSpacing: "-0.05em",
                  color: "var(--text-primary)",
                }}
              >
                HEXPROVE
              </motion.div>
            </div>
          </motion.div>

          {/* Left Panel - Split Curtain */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="fixed top-0 left-0 bottom-0 w-1/2 z-[9999]"
            style={{
              backgroundColor: "var(--background)",
              willChange: "transform",
            }}
          />

          {/* Right Panel - Split Curtain */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="fixed top-0 right-0 bottom-0 w-1/2 z-[9999]"
            style={{
              backgroundColor: "var(--background)",
              willChange: "transform",
            }}
          />

          {/* Logo Mark in Center - Clean and Bold */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{
              opacity: { duration: 0.4, delay: 0.1 },
              scale: { duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
            }}
            className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none"
          >
            <div className="flex flex-col items-center gap-8">
              {/* Static Logo - No Loading Animation */}
              <motion.div 
                className="text-accent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Logo size={120} animated={true} />
              </motion.div>

              {/* Brand Name - Clean Typography */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{
                  opacity: { duration: 0.4, delay: 0.4 },
                  y: { duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] },
                }}
                className="text-5xl sm:text-6xl font-bold text-theme-primary tracking-tight"
              >
                Hexprove
              </motion.div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
