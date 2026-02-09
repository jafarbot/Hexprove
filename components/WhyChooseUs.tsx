"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TextScramble, HoverText } from "./animations";
import { useSectionTracking } from "@/lib/useSectionTracking";

const comparisons = [
  {
    them: "Different tester every week",
    us: "Same dedicated team, every sprint",
  },
  {
    them: "Report gas fees as bugs",
    us: "Native understanding of wallets & DeFi",
  },
  {
    them: "No context continuity",
    us: "Deep product knowledge that grows",
  },
  {
    them: "Generic testing playbooks",
    us: "Crypto-specific edge cases from day one",
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackingRef = useSectionTracking("why_choose_us", 0.5);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="about" 
      ref={(node) => {
        (sectionRef as any).current = node;
        (trackingRef as any).current = node;
      }}
      aria-label="Why choose Hexprove for crypto QA"
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 section-border relative overflow-hidden bg-theme"
    >
      {/* Background decoration */}
      <motion.div
        className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 rounded-full"
        style={{
          background: "radial-gradient(circle, var(--accent-dim) 0%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.3, 0.5],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 mb-12 sm:mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-6 sm:mb-8"
            >
              <span className="text-accent font-mono text-sm">01</span>
              <motion.div
                className="h-px bg-accent"
                initial={{ width: 0 }}
                animate={isInView ? { width: 60 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <span className="text-theme-muted font-mono text-sm uppercase tracking-wider">About</span>
            </motion.div>

            <header className="overflow-hidden">
              <motion.h2
                className="display-lg"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              >
                Why
              </motion.h2>
              <motion.h2
                className="display-lg gradient-text"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <TextScramble text="Hexprove" delay={0.5} duration={1} />
              </motion.h2>
            </header>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:pt-24"
          >
            <p className="text-lg sm:text-xl text-theme-secondary leading-relaxed mb-4 sm:mb-6">
              We&apos;ve worked with crowdsourced QA vendors. We&apos;ve seen testers report
              gas fees as bugs.
            </p>
            <p className="text-lg sm:text-xl text-theme-muted leading-relaxed">
              That&apos;s why we built Hexprove — a dedicated QA consultancy that
              actually understands crypto and Web3.
            </p>
          </motion.div>
        </div>

        {/* Comparison grid */}
        <div className="grid sm:grid-cols-2 gap-1" role="list" aria-label="Comparison between crowdsourced vendors and Hexprove">
          {comparisons.map((item, index) => (
            <motion.article
              key={index}
              role="listitem"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              className="group relative p-6 sm:p-8 hover:bg-theme-surface transition-all duration-500"
              style={{ backgroundColor: "var(--surface-50)" }}
            >
              {/* Hover line */}
              <motion.div
                className="absolute left-0 top-0 bottom-0 w-1 bg-accent"
                initial={{ scaleY: 0 }}
                whileHover={{ scaleY: 1 }}
                transition={{ duration: 0.3 }}
                style={{ transformOrigin: "top" }}
                aria-hidden="true"
              />

              <div className="mb-4 sm:mb-6">
                <span className="inline-block px-4 py-2.5 text-xs font-mono rounded-full uppercase tracking-wider text-theme-red bg-theme-red min-h-[44px]">
                  Them
                </span>
                <p className="text-theme-muted mt-3 line-through text-base sm:text-base" style={{ textDecorationColor: "var(--text-muted)" }}>
                  {item.them}
                </p>
              </div>
              <div>
                <span className="inline-block px-4 py-2.5 text-xs font-mono text-accent rounded-full uppercase tracking-wider min-h-[44px]" style={{ backgroundColor: "var(--accent-dim)" }}>
                  Hexprove
                </span>
                <p className="text-theme-primary mt-3 font-medium text-base sm:text-lg">
                  {item.us}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <HoverText 
            text="See what we catch →" 
            href="/services"
            className="text-accent text-base sm:text-lg min-h-[44px] inline-flex items-center"
          />
        </motion.div>
      </div>
    </section>
  );
}
