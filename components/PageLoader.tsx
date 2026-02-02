"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

    // Complete animation after 1.5 seconds (faster)
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Re-enable scrolling
      document.body.style.overflow = "";
    }, 1500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <>
          {/* Left Panel */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{
              duration: 0.6,
              delay: 0.8,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="fixed top-0 left-0 bottom-0 w-1/2 z-[9999]"
            style={{
              backgroundColor: "var(--background)",
              willChange: "transform",
            }}
          />

          {/* Right Panel */}
          <motion.div
            initial={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              duration: 0.6,
              delay: 0.8,
              ease: [0.76, 0, 0.24, 1],
            }}
            className="fixed top-0 right-0 bottom-0 w-1/2 z-[9999]"
            style={{
              backgroundColor: "var(--background)",
              willChange: "transform",
            }}
          />

          {/* Logo in center */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{
              opacity: { duration: 0.3, delay: 0.1 },
              scale: { duration: 0.3, delay: 0.1, ease: "easeOut" },
            }}
            className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none"
          >
            <div className="flex flex-col items-center gap-4">
              {/* Hexprove Logo */}
              <motion.svg
                width="64"
                height="64"
                viewBox="0 0 40 40"
                fill="none"
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: 0,
                  ease: "easeInOut",
                }}
              >
                <motion.path
                  d="M20 4L35.5 12.5V27.5L20 36L4.5 27.5V12.5L20 4Z"
                  stroke="#00d4aa"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { duration: 0.5, delay: 0.2, ease: "easeInOut" },
                    opacity: { duration: 0.2, delay: 0.2 },
                  }}
                />
                <motion.path
                  d="M12 20L17.5 25.5L28 14"
                  stroke="#00d4aa"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    pathLength: { duration: 0.4, delay: 0.5, ease: "easeInOut" },
                    opacity: { duration: 0.2, delay: 0.5 },
                  }}
                />
              </motion.svg>

              {/* Hexprove text */}
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 0.2, delay: 0.4 },
                  y: { duration: 0.2, delay: 0.4 },
                }}
                className="text-xl font-bold text-theme-primary tracking-tight"
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
