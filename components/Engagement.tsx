"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { TextScramble } from "./animations";
import { useSectionTracking } from "@/lib/useSectionTracking";

const engagements = [
  {
    title: "QA",
    subtitle: "Audit",
    description: "One-time deep dive into your product's QA gaps. Get a full report with prioritized findings and an action plan.",
    label: "Best for teams with no QA process yet",
  },
  {
    title: "Pre-Launch",
    subtitle: "Sprint",
    description: "Intensive testing before your launch. We break it so your users don't.",
    label: "Best for teams shipping on a deadline",
  },
  {
    title: "Dedicated",
    subtitle: "Team",
    description: "Ongoing QA embedded in your sprints. The full Hexprove experience — same team, every cycle.",
    label: "Best for scaling products",
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
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 mb-12 sm:mb-20">
          <div>
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
              <span className="text-theme-muted font-mono text-sm uppercase tracking-wider">How We Work</span>
            </motion.div>

            <header className="overflow-hidden">
              <motion.h2
                className="display-lg"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              >
                Flexible by
              </motion.h2>
              <motion.h2
                className="display-lg gradient-text"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
              >
                design
              </motion.h2>
            </header>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:pt-24"
          >
            <p className="text-lg sm:text-xl text-theme-secondary leading-relaxed">
              No long-term contracts required. From a one-time audit to a dedicated team every sprint — we scale to fit your stage.
            </p>
          </motion.div>
        </div>

        {/* Engagement cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-1" role="list" aria-label="Engagement models">
          {engagements.map((engagement, index) => (
            <EngagementCard key={index} engagement={engagement} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
}

function EngagementCard({
  engagement,
  index,
  isInView,
}: {
  engagement: typeof engagements[0];
  index: number;
  isInView: boolean;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.article
      role="listitem"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ backgroundColor: "var(--surface-50)" }}
      className="group p-6 sm:p-8 transition-all duration-300 flex flex-col"
      style={{ border: "1px solid var(--border-color)" }}
    >
      <div className="mb-4">
        <motion.h3
          className="text-2xl sm:text-3xl font-bold text-theme-primary"
          whileHover={{ x: 10 }}
          transition={{ duration: 0.2 }}
        >
          {isHovered ? (
            <TextScramble text={engagement.title} duration={0.4} once={false} />
          ) : (
            engagement.title
          )}
        </motion.h3>
        <motion.span
          className="text-2xl sm:text-3xl font-bold text-theme-secondary block"
          whileHover={{ x: 10 }}
          transition={{ duration: 0.2, delay: 0.05 }}
        >
          {engagement.subtitle}
        </motion.span>
      </div>

      <p className="text-sm sm:text-base text-theme-secondary mb-4 flex-grow">{engagement.description}</p>

      <span className="text-xs font-mono text-theme-muted uppercase tracking-wider">
        {engagement.label}
      </span>

      {/* Animated underline */}
      <motion.div
        className="h-px mt-4 sm:mt-6"
        style={{ backgroundColor: "var(--border-color)" }}
        initial={{ width: 0 }}
        whileHover={{ width: "100%" }}
        transition={{ duration: 0.3 }}
        aria-hidden="true"
      />
    </motion.article>
  );
}
