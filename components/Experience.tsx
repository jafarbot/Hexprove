"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { TextScramble } from "./animations";

const experiences = [
  {
    company: "Uniswap",
    role: "",
    type: "Web3",
    description: "Built QA for the world's largest decentralized exchange",
    color: "#FF007A",
  },
  {
    company: "OpenSea",
    role: "",
    type: "Web3",
    description: "Built QA for the world's largest NFT platform",
    color: "#2081E2",
  },
  {
    company: "Bloomberg",
    role: "",
    type: "Enterprise",
    description: "Financial software trusted by every major bank",
    color: "#F97316",
  },
  {
    company: "Tradeweb",
    role: "",
    type: "Enterprise",
    description: "Fixed income trading at institutional scale",
    color: "#3B82F6",
  },
];

function ExperienceRow({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const rowRef = useRef<HTMLElement>(null);
  const isInView = useInView(rowRef, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={rowRef}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative py-8 cursor-pointer overflow-hidden border-b"
      style={{ borderColor: "var(--border-color)" }}
    >
      {/* Background hover effect */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? 0 : "-100%" }}
        transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
        style={{ backgroundColor: `${exp.color}15` }}
        aria-hidden="true"
      />

      <div className="grid md:grid-cols-12 gap-4 items-center">
        {/* Company name */}
        <div className="md:col-span-4">
          <motion.h3
            className="text-3xl sm:text-4xl lg:text-5xl font-bold transition-colors duration-300"
            style={{ color: isHovered ? exp.color : "var(--foreground)" }}
            animate={{ x: isHovered ? 20 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isHovered ? (
              <TextScramble text={exp.company} duration={0.4} once={false} />
            ) : (
              exp.company
            )}
          </motion.h3>
        </div>

        {/* Description - SEO optimized */}
        <div className="md:col-span-6">
          <motion.p
            className="text-theme-primary text-base sm:text-base"
            animate={{ opacity: isHovered ? 1 : 0.9 }}
          >
            {exp.description}
          </motion.p>
        </div>

        {/* Type badge */}
        <div className="md:col-span-2 md:text-right">
          <motion.span
            className={`inline-block px-4 py-1.5 text-xs font-mono rounded-full uppercase tracking-wider border ${
              exp.type === "Web3"
                ? "text-accent border-accent"
                : "text-blue-500 border-blue-500"
            }`}
            style={{
              backgroundColor: exp.type === "Web3" ? "var(--accent-dim)" : "rgba(59, 130, 246, 0.1)",
            }}
            animate={{ scale: isHovered ? 1.05 : 1 }}
          >
            {exp.type}
          </motion.span>
        </div>
      </div>

    </motion.article>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={sectionRef}
      aria-label="Our professional experience in QA testing"
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 section-border"
      style={{ backgroundColor: "var(--surface)" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="grid lg:grid-cols-2 gap-16 mb-16">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="text-accent font-mono text-sm">04</span>
              <motion.div
                className="h-px bg-accent"
                initial={{ width: 0 }}
                animate={isInView ? { width: 60 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <span className="text-theme-muted font-mono text-sm uppercase tracking-wider">Experience</span>
            </motion.div>

            <div className="overflow-hidden">
              <motion.h2
                className="display-lg"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              >
                Battle-tested
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                className="display-lg gradient-text"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
              >
                expertise
              </motion.h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:pt-24"
          >
            <p className="text-xl text-theme-secondary leading-relaxed">
              From Wall Street to Web3. Our QA consultants have tested at the highest 
              levels of both traditional finance and crypto — DeFi protocols, NFT marketplaces, 
              and enterprise trading platforms.
            </p>
          </motion.div>
        </div>

        {/* Experience list */}
        <div role="list" aria-label="Companies we have worked with">
          {experiences.map((exp, index) => (
            <ExperienceRow key={index} exp={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
