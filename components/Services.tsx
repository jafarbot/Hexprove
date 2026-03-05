"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useSectionTracking } from "@/lib/useSectionTracking";

const services = [
  {
    num: "01",
    title: "Manual QA Testing",
    description:
      "We run real wallets, test on mainnet for high-value flows, and document reproducible steps with video captures and severity ratings — not 'something broke' tickets.",
    tags: ["Functional", "Regression", "Exploratory"],
  },
  {
    num: "02",
    title: "E2E Automation",
    description:
      "End-to-end tests that understand Web3: wallet connections, signing prompts, transaction states and revert handling. Suites run in CI and catch regressions before your users do.",
    tags: ["Playwright", "Cypress", "CI/CD"],
  },
  {
    num: "03",
    title: "API Testing",
    description:
      "We verify the APIs and data sources you depend on — RPC reliability, price feed accuracy, webhook delivery — and catch silent failures before they reach customers.",
    tags: ["REST / GraphQL", "WebSocket", "RPC"],
  },
  {
    num: "04",
    title: "dApp & Payments",
    description:
      "Wallet connections, transaction signing, gas estimation failures, and edge cases specific to on/off-ramps. We know what happens when a signer rejects at the wrong moment.",
    tags: ["Wallet Flows", "On/Off-Ramp", "Multi-chain"],
  },
  {
    num: "05",
    title: "Cross-Chain",
    description:
      "Ethereum, L2s, Solana — we validate bridges, network switching behavior, and chain-specific validation logic so you don't ship untested integrations.",
    tags: ["Ethereum", "L2s", "Solana"],
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-6 sm:p-8 rounded-xl border transition-all duration-300 hover:-translate-y-0.5"
      style={{
        backgroundColor: "var(--surface)",
        borderColor: "var(--border-color)",
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          border: "1px solid var(--accent-primary)",
          boxShadow: "0 0 20px var(--accent-dim)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        {/* Number + Title */}
        <div className="flex items-baseline gap-3 mb-4">
          <span
            className="font-mono text-sm font-semibold"
            style={{ color: "var(--accent-primary)" }}
          >
            {service.num}
          </span>
          <h3 className="text-xl sm:text-2xl font-bold text-theme-primary">
            {service.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-base text-theme-secondary leading-relaxed mb-6">
          {service.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies">
          {service.tags.map((tag, i) => (
            <span
              key={i}
              role="listitem"
              className="px-3 py-1.5 text-xs font-mono rounded-full"
              style={{
                backgroundColor: "var(--tag-bg)",
                color: "var(--tag-text)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
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
        {/* 2-column layout: sticky label left, cards right */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          {/* Left: sticky label */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-6 sm:mb-8"
            >
              <span
                className="font-mono text-sm"
                style={{ color: "var(--accent-primary)" }}
              >
                02
              </span>
              <motion.div
                className="h-px"
                style={{ backgroundColor: "var(--accent-primary)" }}
                initial={{ width: 0 }}
                animate={isInView ? { width: 60 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <span className="text-theme-muted font-mono text-sm uppercase tracking-wider">
                Services
              </span>
            </motion.div>

            <header className="overflow-hidden mb-6">
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
                What we
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
                deliver
              </motion.h2>
            </header>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg text-theme-secondary leading-relaxed"
            >
              <span
                className="font-semibold"
                style={{ color: "var(--accent-primary)" }}
              >
                Tailored to your product
              </span>{" "}
              — not one-size-fits-all packages.
            </motion.p>
          </div>

          {/* Right: scrolling cards */}
          <div
            className="lg:col-span-8 space-y-4 sm:space-y-6"
            role="list"
            aria-label="Our QA testing services"
          >
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
