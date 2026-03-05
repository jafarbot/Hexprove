"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSectionTracking } from "@/lib/useSectionTracking";

const tiers = [
  {
    name: "Sprint",
    duration: "2-week pilot",
    description:
      "Intensive testing before launch or a major release. We break it so your users don't.",
    idealFor: "Teams shipping on a deadline",
    includes: [
      "Full functional test pass",
      "Wallet & transaction flow testing",
      "Bug report with severity ratings",
      "Video evidence for every issue",
    ],
    highlighted: false,
  },
  {
    name: "Retainer",
    duration: "Ongoing",
    description:
      "Continuous QA embedded in your sprints. Same team, growing product knowledge, every cycle.",
    idealFor: "Scaling products that ship weekly",
    includes: [
      "Everything in Sprint",
      "Regression suite management",
      "CI/CD integration support",
      "Priority Slack/Discord channel",
      "Sprint planning participation",
    ],
    highlighted: true,
  },
  {
    name: "Embedded",
    duration: "Full-time",
    description:
      "A dedicated QA lead integrated into your team. They attend standups, own your test strategy, and scale as you grow.",
    idealFor: "Teams that need a QA department",
    includes: [
      "Everything in Retainer",
      "Dedicated QA lead",
      "Test strategy & automation architecture",
      "Hire & train your internal QA team",
      "Direct engineering collaboration",
    ],
    highlighted: false,
  },
];

export default function Engagement() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackingRef = useSectionTracking("how_we_work", 0.5);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="how-we-work"
      ref={(node) => {
        (sectionRef as any).current = node;
        (trackingRef as any).current = node;
      }}
      aria-label="Flexible engagement models for QA consulting"
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 section-border"
      style={{ backgroundColor: "var(--surface)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="mb-16 sm:mb-20 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6 sm:mb-8"
          >
            <span className="text-theme-muted font-mono text-sm">03</span>
            <motion.div
              className="h-px bg-theme-secondary"
              initial={{ width: 0 }}
              animate={isInView ? { width: 60 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <span className="text-theme-muted font-mono text-sm uppercase tracking-wider">
              How We Work
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
              Flexible by
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
              design
            </motion.h2>
          </header>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="text-lg sm:text-xl text-theme-secondary leading-relaxed mt-6"
          >
            No long-term contracts required. From a 2-week sprint to a dedicated
            team — we scale to fit your stage.
          </motion.p>
        </div>

        {/* Tier cards */}
        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Engagement tiers"
        >
          {tiers.map((tier, index) => (
            <motion.article
              key={index}
              role="listitem"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.15 }}
              className="group relative p-8 sm:p-10 rounded-2xl border flex flex-col transition-all duration-300 hover:-translate-y-1"
              style={{
                backgroundColor: tier.highlighted
                  ? "var(--surface-elevated)"
                  : "var(--background)",
                borderColor: tier.highlighted
                  ? "var(--accent-primary)"
                  : "var(--border-color)",
                boxShadow: tier.highlighted
                  ? "0 0 30px var(--accent-dim)"
                  : "none",
              }}
            >
              {/* Popular badge */}
              {tier.highlighted && (
                <div
                  className="absolute -top-3 left-8 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider"
                  style={{
                    backgroundColor: "var(--accent-primary)",
                    color: "#ffffff",
                  }}
                >
                  Most Popular
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-theme-primary">
                  {tier.name}
                </h3>
                <span
                  className="text-sm font-mono mt-1 block"
                  style={{ color: "var(--accent-primary)" }}
                >
                  {tier.duration}
                </span>
              </div>

              {/* Description */}
              <p className="text-base text-theme-secondary leading-relaxed mb-6">
                {tier.description}
              </p>

              {/* Ideal for */}
              <div
                className="text-xs font-mono text-theme-muted uppercase tracking-wider mb-4 pb-4"
                style={{ borderBottom: "1px solid var(--border-color)" }}
              >
                Ideal for: {tier.idealFor}
              </div>

              {/* Includes */}
              <ul className="space-y-3 flex-grow mb-8">
                {tier.includes.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: "var(--accent-primary)" }}
                      aria-hidden="true"
                    />
                    <span className="text-sm text-theme-secondary">{item}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className="block w-full py-3 text-center text-sm font-semibold rounded-full transition-all duration-300"
                style={{
                  backgroundColor: tier.highlighted
                    ? "var(--accent-primary)"
                    : "transparent",
                  color: tier.highlighted ? "#ffffff" : "var(--text-primary)",
                  border: tier.highlighted
                    ? "1px solid var(--accent-primary)"
                    : "1px solid var(--border-color)",
                }}
                onMouseEnter={(e) => {
                  if (!tier.highlighted) {
                    e.currentTarget.style.borderColor = "var(--accent-primary)";
                    e.currentTarget.style.backgroundColor = "var(--accent-dim)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!tier.highlighted) {
                    e.currentTarget.style.borderColor = "var(--border-color)";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                Get Started
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
