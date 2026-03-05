"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { TextScramble, CharReveal } from "./animations";
import { AnimatedCounter } from "./animations";
import { MagneticButton } from "./animations";
import { trackCtaClick } from "@/lib/analytics";
import { useSectionTracking } from "@/lib/useSectionTracking";

const companies = ["Uniswap", "OpenSea", "Bloomberg", "Tradeweb"];

const stats = [
  { value: 10, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "+", label: "Products Tested" },
  { value: 0, suffix: "", label: "Learning Curve" },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useSectionTracking("hero", 0.3);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -100]);

  return (
    <section
      ref={(node) => {
        (containerRef as any).current = node;
        (sectionRef as any).current = node;
      }}
      id="hero"
      aria-label="Hexprove - Crypto-native QA experts"
      className="relative min-h-[100dvh] flex flex-col justify-center px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-16 sm:pb-20 overflow-hidden bg-theme"
    >
      <motion.div style={{ opacity, y }} className="relative z-10 max-w-7xl mx-auto w-full overflow-visible">
        {/* Section indicator */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center gap-4 mb-8 sm:mb-12"
          aria-hidden="true"
        >
          <span className="text-theme-muted font-mono text-sm">00</span>
          <motion.div
            className="h-px bg-theme-secondary"
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          />
          <span className="text-theme-muted font-mono text-sm uppercase tracking-wider">Home</span>
        </motion.div>

        {/* Main headline */}
        <header className="mb-6 sm:mb-8 overflow-visible">
          <h1 className="display-xl leading-[0.9] overflow-visible">
            <div className="overflow-visible">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
                className="overflow-visible"
              >
                <TextScramble 
                  text="Crypto-native" 
                  className="block"
                  delay={0.5}
                  duration={1.2}
                />
              </motion.div>
            </div>
            <div className="overflow-visible">
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
                className="overflow-visible"
              >
                <span className="gradient-text">
                  <TextScramble 
                    text="QA experts" 
                    delay={0.8}
                    duration={1.2}
                  />
                </span>
              </motion.div>
            </div>
          </h1>
        </header>

        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="max-w-3xl mb-6 sm:mb-12"
        >
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-theme-secondary leading-relaxed">
            <CharReveal 
              text="The only QA team built from inside crypto — not trained on it."
              delay={1.2}
              staggerDelay={0.02}
            />
          </p>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-theme-secondary leading-relaxed mt-2">
            <CharReveal 
              text="Built QA for products processing billions. Now building yours."
              delay={1.8}
              staggerDelay={0.02}
            />
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8 sm:mb-20"
        >
          <MagneticButton
            href="https://calendly.com/sino-hexprove/30min"
            className="group inline-flex items-center justify-center px-6 sm:px-8 py-4 btn-primary font-semibold rounded-full min-h-[48px]"
            strength={0.2}
            onClick={() => trackCtaClick('hero', 'Book a Call', 'https://calendly.com/sino-hexprove/30min')}
          >
            <span>Book a Call</span>
            <motion.svg
              className="ml-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              initial={{ x: 0 }}
              whileHover={{ x: 5 }}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </MagneticButton>

          <MagneticButton
            href="/about"
            className="inline-flex items-center justify-center px-6 sm:px-8 py-4 btn-secondary font-medium rounded-full min-h-[48px]"
            strength={0.2}
            onClick={() => trackCtaClick('hero', 'Learn More', '/about')}
          >
            Learn More
          </MagneticButton>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.5 }}
          className="grid grid-cols-3 gap-3 sm:gap-8 pt-4 sm:pt-8 border-t border-theme"
          role="list"
          aria-label="Key statistics"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 2.7 + index * 0.1 }}
              role="listitem"
            >
              <div className="font-mono text-xl sm:text-4xl md:text-5xl font-bold mb-1 sm:mb-2 text-theme-primary">
                <AnimatedCounter 
                  value={stat.value} 
                  suffix={stat.suffix}
                  delay={2.8 + index * 0.2}
                  duration={1.5}
                />
              </div>
              <div className="text-sm sm:text-sm text-theme-muted">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom - Experience from */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 3.2 }}
        className="mt-auto pt-6 sm:pt-8 py-4 sm:py-6 border-t border-theme w-full"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
          <span className="text-xs sm:text-sm text-theme-muted font-mono uppercase tracking-wider">
            Experience from
          </span>
          <nav aria-label="Companies we have experience from" className="flex flex-wrap justify-center sm:justify-end items-center gap-4 sm:gap-8 md:gap-12">
            {companies.map((company, i) => (
              <span 
                key={i} 
                className="text-sm sm:text-lg text-theme-secondary font-medium tracking-wide cursor-default"
              >
                {company}
              </span>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Scroll indicator - hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5, duration: 0.8 }}
        className="absolute bottom-8 right-8 hidden lg:flex flex-col items-center gap-4"
        aria-hidden="true"
      >
        <span className="text-xs text-theme-muted uppercase tracking-widest rotate-90 origin-center mb-8">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-16"
          style={{ background: "linear-gradient(to bottom, var(--text-muted), transparent)" }}
        />
      </motion.div>
    </section>
  );
}
