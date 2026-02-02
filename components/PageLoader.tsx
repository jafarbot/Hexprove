"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HexagonLoader, MatrixRain } from "./animations";

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

    // Complete animation after 2.5 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Re-enable scrolling
      document.body.style.overflow = "";
    }, 2500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <>
          {/* Matrix Rain Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[9998] bg-black overflow-hidden"
          >
            <MatrixRain />
            
            {/* Animated Background Text Phrases */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: [0, 0.15, 0.15, 0],
                  scale: [0.8, 1, 1, 1.2]
                }}
                transition={{
                  duration: 2.5,
                  times: [0, 0.2, 0.8, 1],
                  ease: "easeInOut"
                }}
                className="absolute text-white font-bold text-[10vw] sm:text-[8vw] md:text-[6vw] tracking-tight leading-none text-center"
                style={{ 
                  textTransform: "uppercase",
                  fontWeight: 900,
                }}
              >
                CRYPTO-NATIVE<br/>QA EXPERTS
              </motion.div>
            </div>

            {/* Animated Text Marquee at Top */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute top-0 left-0 right-0 overflow-hidden py-4"
              style={{
                background: "linear-gradient(to bottom, rgba(0,0,0,0.8), transparent)",
              }}
            >
              <div className="flex whitespace-nowrap animate-marquee">
                <span className="text-accent font-mono text-sm tracking-widest opacity-60 px-4">
                  {"// BATTLE-TESTED QA INFRASTRUCTURE · CRYPTO-NATIVE EXPERTS · WEB3 PRODUCTS AT SCALE // "}
                  {"BATTLE-TESTED QA INFRASTRUCTURE · CRYPTO-NATIVE EXPERTS · WEB3 PRODUCTS AT SCALE // "}
                  {"BATTLE-TESTED QA INFRASTRUCTURE · CRYPTO-NATIVE EXPERTS · WEB3 PRODUCTS AT SCALE // "}
                </span>
              </div>
            </motion.div>
          </motion.div>

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
            <div className="flex flex-col items-center gap-12">
              {/* Animated Hexagon Loader - Much Bigger */}
              <motion.div 
                className="text-accent"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{
                  scale: { duration: 0.5, delay: 0.2, ease: "easeOut" },
                  opacity: { duration: 0.3, delay: 0.2 },
                }}
              >
                <HexagonLoader size={200} />
              </motion.div>

              {/* Hexprove text - Larger */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: 0.4, delay: 0.5 },
                  y: { duration: 0.4, delay: 0.5 },
                }}
                className="text-3xl sm:text-4xl font-bold text-theme-primary tracking-tight"
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
