"use client";

import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { HoverText } from "@/components/animations";

export default function ComingSoon() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 overflow-hidden">
      {/* Subtle background gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(0, 212, 170, 0.15) 0%, rgba(0, 0, 0, 0) 50%)",
        }}
      />

      {/* Large background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.03 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-white font-bold tracking-tighter leading-none text-center select-none"
          style={{ 
            fontSize: "clamp(4rem, 15vw, 12rem)",
            textTransform: "uppercase",
            fontWeight: 900,
            letterSpacing: "-0.05em",
          }}
        >
          HEXPROVE
        </motion.div>
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center max-w-2xl"
      >
        {/* Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center mb-8"
        >
          <div className="text-accent">
            <Logo size={120} animated={true} />
          </div>
        </motion.div>

        {/* Brand name */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl font-bold text-theme-primary mb-6 tracking-tight"
        >
          Hexprove
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl text-accent font-semibold mb-4"
        >
          Crypto-native QA experts
        </motion.p>

        {/* Coming soon message */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-lg sm:text-xl text-theme-secondary mb-12 max-w-xl mx-auto"
        >
          We're putting the finishing touches on something special.
          <br />
          Launching soon.
        </motion.p>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="space-y-4"
        >
          <div>
            <span className="text-sm text-theme-muted uppercase tracking-wider block mb-2">
              Get in touch
            </span>
            <a
              href="mailto:hello@hexprove.com"
              className="text-2xl font-semibold text-theme-primary hover:text-accent transition-colors inline-block"
            >
              <HoverText text="hello@hexprove.com" />
            </a>
          </div>

          <div className="flex justify-center gap-6 pt-4">
            <HoverText 
              text="LinkedIn" 
              href="https://www.linkedin.com/in/sinousmonov/" 
              className="text-theme-muted hover:text-theme-primary"
            />
          </div>
        </motion.div>

        {/* Animated dots */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex justify-center gap-2 mt-12"
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-accent"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
