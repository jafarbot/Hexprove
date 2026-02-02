"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { TextScramble } from "./animations";

const services = [
  {
    num: "01",
    title: "Manual QA Testing",
    description: "Comprehensive testing by crypto-native experts who understand DeFi, NFT marketplaces, and Web3 UX. Includes test plan creation and documentation.",
    tags: ["Functional", "Regression", "Exploratory"],
  },
  {
    num: "02",
    title: "E2E Automation",
    description: "Automated end-to-end testing with wallet mocking, transaction signing, and blockchain state verification.",
    tags: ["Playwright", "Cypress", "CI/CD"],
  },
  {
    num: "03",
    title: "dApp Testing",
    description: "Transaction flows, error states, gas estimation, and chain-specific edge cases covered.",
    tags: ["Wallet Flows", "Error Handling", "Multi-chain"],
  },
  {
    num: "04",
    title: "Cross-Chain",
    description: "Validate across Ethereum, L2s, and Solana. Bridge testing and network switching included.",
    tags: ["Ethereum", "L2s", "Solana"],
  },
];

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative py-6 sm:py-8 cursor-pointer border-b"
      style={{ borderColor: "var(--border-color)" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-start">
        {/* Number */}
        <div className="md:col-span-1">
          <span className="text-accent font-mono text-sm">{service.num}</span>
        </div>

        {/* Title */}
        <div className="md:col-span-3">
          <motion.h3
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-theme-primary"
            animate={{ x: isHovered ? 10 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isHovered ? (
              <TextScramble text={service.title} duration={0.5} once={false} />
            ) : (
              service.title
            )}
          </motion.h3>
        </div>

        {/* Description */}
        <div className="md:col-span-5">
          <p className="text-sm sm:text-base text-theme-secondary">{service.description}</p>
        </div>

        {/* Tags */}
        <div className="md:col-span-3 flex flex-wrap gap-2" role="list" aria-label="Service technologies">
          {service.tags.map((tag, i) => (
            <motion.span
              key={i}
              role="listitem"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: isHovered ? 1 : 0.5 }}
              className="px-3 py-1.5 text-xs font-mono rounded-full min-h-[32px] flex items-center"
              style={{ backgroundColor: "var(--tag-bg)", color: "var(--tag-text)" }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Hover indicator line */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "top" }}
        aria-hidden="true"
      />
    </motion.article>
  );
}

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="services" 
      ref={sectionRef}
      aria-label="QA testing services for crypto and Web3 companies"
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 section-border bg-theme"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6 sm:mb-8"
        >
          <span className="text-accent font-mono text-sm">02</span>
          <motion.div
            className="h-px bg-accent"
            initial={{ width: 0 }}
            animate={isInView ? { width: 60 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <span className="text-theme-muted font-mono text-sm uppercase tracking-wider">Services</span>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16">
          <header className="overflow-hidden">
            <motion.h2
              className="display-lg"
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            >
              What we
            </motion.h2>
            <motion.h2
              className="display-lg gradient-text"
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
            >
              deliver
            </motion.h2>
          </header>
        </div>

        {/* Services list */}
        <div role="list" aria-label="Our QA testing services">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
