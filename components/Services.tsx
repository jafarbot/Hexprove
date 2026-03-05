"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { TextScramble } from "./animations";
import { useSectionTracking } from "@/lib/useSectionTracking";

const services = [
  {
    num: "01",
    title: "Manual QA Testing",
    description: "We don't just click around. We run a stack of real wallets, test on mainnet for high-value flows (in controlled conditions), and document chains can roll back. You'll get reproducible steps, video captures, and clear severity ratings — not 'something broke' tickets.",
    tags: ["Functional", "Regression", "Exploratory"],
  },
  {
    num: "02",
    title: "E2E Automation",
    description: "End-to-end tests that understand Web3: wallet connections, signing prompts, transaction states and revert handling. We write suites with Playwright or Cypress that run in CI and catch regressions before your users do.",
    tags: ["Playwright", "Cypress", "CI/CD"],
  },
  {
    num: "03",
    title: "API Testing",
    description: "Your frontend doesn't live in a vacuum. We verify the APIs and data sources you depend on — RPC reliability, price feed accuracy, webhook delivery — and catch silent failures before they reach your customers.",
    tags: ["REST / GraphQL", "WebSocket", "RPC"],
  },
  {
    num: "04",
    title: "dApp & Payments",
    description: "Wallet connections, transaction signing, gas estimation failures, and edge cases specific to on/off-ramps. We know what happens when a signer rejects at the wrong moment because we've shipped systems that handle it.",
    tags: ["Wallet Flows", "On/Off-Ramp", "Multi-chain"],
  },
  {
    num: "05",
    title: "Cross-Chain",
    description: "Ethereum, L2s, Solana — we have accounts and test assets on all of them. We validate bridges, network switching behavior, and chain-specific validation logic so you don't ship a bridge integration that hasn't been tested end-to-end.",
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
            <TextScramble text={service.title} duration={0.5} once={false} trigger={isHovered} />
          </motion.h3>
        </div>

        {/* Description */}
        <div className="md:col-span-5">
          <p className="text-base sm:text-base text-theme-secondary">{service.description}</p>
        </div>

        {/* Tags */}
        <div className="md:col-span-3 flex flex-wrap gap-2" role="list" aria-label="Service technologies">
          {service.tags.map((tag, i) => (
            <motion.span
              key={i}
              role="listitem"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: isHovered ? 1 : 0.5 }}
              className="px-4 py-2.5 text-xs font-mono rounded-full min-h-[44px] flex items-center"
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
  const trackingRef = useSectionTracking("services", 0.5);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={(node) => {
        (sectionRef as any).current = node;
        (trackingRef as any).current = node;
      }}
      id="services"
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
          <div>
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
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl mt-6"
            >
              <span className="text-accent font-semibold">Tailored to your product</span>
              <span className="text-theme-secondary"> — not one-size-fits-all packages.</span>
            </motion.p>
          </div>
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
