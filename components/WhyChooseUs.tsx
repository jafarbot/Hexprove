"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Target, Sliders } from "lucide-react";
import { useSectionTracking } from "@/lib/useSectionTracking";

const pillars = [
  {
    icon: Shield,
    title: "Crypto-Native",
    description:
      "We've shipped and tested DeFi protocols, NFT platforms, and trading systems. We don't Google \"what is a blockchain\" — we live it. Wallet flows, gas edge cases, chain-specific quirks — it's muscle memory.",
  },
  {
    icon: Target,
    title: "Battle-Tested",
    description:
      "Experience from teams at Uniswap, OpenSea, Bloomberg, and Tradeweb. We've caught the bugs that cost millions — before they shipped. Our playbooks come from real war stories, not textbooks.",
  },
  {
    icon: Sliders,
    title: "Flexible",
    description:
      "No long-term contracts required. Need a 2-week sprint before launch? A dedicated team every cycle? An embedded QA lead? We scale to your stage and ship on your timeline.",
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
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section header */}
        <div className="mb-16 sm:mb-20 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6 sm:mb-8"
          >
            <span className="text-theme-muted font-mono text-sm">01</span>
            <motion.div
              className="h-px"
              style={{ backgroundColor: "var(--text-secondary)" }}
              initial={{ width: 0 }}
              animate={isInView ? { width: 60 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <span className="text-theme-muted font-mono text-sm uppercase tracking-wider">
              Why Hexprove
            </span>
          </motion.div>

          <header className="overflow-hidden">
            <motion.h2
              className="display-lg"
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.215, 0.61, 0.355, 1],
              }}
            >
              Built different
            </motion.h2>
            <motion.h2
              className="display-lg gradient-text"
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.215, 0.61, 0.355, 1],
              }}
            >
              for crypto
            </motion.h2>
          </header>
        </div>

        {/* 3-column grid */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Why choose Hexprove"
        >
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <motion.article
                key={index}
                role="listitem"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.15 }}
                className="group relative p-8 sm:p-10 rounded-2xl border transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "var(--surface)",
                  borderColor: "var(--border-color)",
                }}
              >
                {/* Hover border glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    border: "1px solid var(--accent-primary)",
                    boxShadow: "0 0 20px var(--accent-dim)",
                  }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-6"
                  style={{ backgroundColor: "var(--accent-dim)" }}
                >
                  <IconComponent
                    className="w-6 h-6"
                    style={{ color: "var(--accent-primary)" }}
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </div>

                {/* Content */}
                <h3 className="text-xl sm:text-2xl font-bold text-theme-primary mb-3">
                  {pillar.title}
                </h3>
                <p className="text-base text-theme-secondary leading-relaxed">
                  {pillar.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
