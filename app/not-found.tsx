"use client";

import { motion } from "framer-motion";
import { TextScramble } from "@/components/animations";
import { MagneticButton } from "@/components/animations";
import { Logo } from "@/components/Logo";
import { MatrixRain } from "@/components/animations";

export default function NotFound() {
  return (
    <div className="relative min-h-[100dvh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden bg-theme">
      {/* Matrix rain background */}
      <div className="opacity-20">
        <MatrixRain />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        {/* Animated logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
          className="text-accent mb-8 sm:mb-12 flex justify-center"
        >
          <Logo size={64} animated />
        </motion.div>

        {/* 404 number */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-4 sm:mb-6"
        >
          <span className="font-mono text-7xl sm:text-9xl font-bold gradient-text">
            <TextScramble text="404" delay={0.5} duration={1.2} />
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-2xl sm:text-4xl font-bold text-theme-primary mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Bug found.{" "}
          <span className="text-accent">We&apos;re on it.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-base sm:text-lg text-theme-muted leading-relaxed mb-8 sm:mb-12 max-w-md mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          This page doesn&apos;t exist — but at least we caught it.
          That&apos;s kind of what we do.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <MagneticButton
            href="/"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-4 btn-primary font-semibold rounded-full min-h-[48px]"
            strength={0.2}
          >
            Back to Home
          </MagneticButton>

          <MagneticButton
            href="/contact"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-4 btn-secondary font-medium rounded-full min-h-[48px]"
            strength={0.2}
          >
            Contact Us
          </MagneticButton>
        </motion.div>

        {/* Section indicator at bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-16 sm:mt-24 flex items-center justify-center gap-4"
          aria-hidden="true"
        >
          <span className="text-accent font-mono text-sm">404</span>
          <motion.div
            className="h-px bg-accent"
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          />
          <span className="text-theme-muted font-mono text-sm uppercase tracking-wider">
            Page Not Found
          </span>
        </motion.div>
      </div>
    </div>
  );
}
