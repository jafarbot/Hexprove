"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Zap,
  Unplug,
  AlertTriangle,
  Link2,
  CheckCircle,
  Image as ImageIcon,
} from "lucide-react";
import { useSectionTracking } from "@/lib/useSectionTracking";

const severityColors: Record<string, { bg: string; text: string; label: string }> = {
  critical: { bg: "var(--red-bg)", text: "var(--red-text)", label: "Critical" },
  high: { bg: "rgba(251, 146, 60, 0.12)", text: "#fb923c", label: "High" },
  medium: { bg: "rgba(250, 204, 21, 0.12)", text: "#facc15", label: "Medium" },
};

const issues = [
  {
    name: "Gas Estimation Errors",
    icon: Zap,
    severity: "critical" as const,
    example: "Transaction reverts on mainnet due to underestimated gas on complex swap routes.",
    detail: "We test with real gas conditions across L1/L2s — not just hardhat defaults.",
  },
  {
    name: "Wallet Connection Bugs",
    icon: Unplug,
    severity: "high" as const,
    example: "MetaMask shows connected but app state is stale after chain switch.",
    detail: "We test every major wallet provider, mobile and extension, across all supported chains.",
  },
  {
    name: "Transaction Mismatches",
    icon: AlertTriangle,
    severity: "critical" as const,
    example: "UI shows success but on-chain state didn't update — user sees phantom balance.",
    detail: "We verify UI state against actual on-chain data, including pending and reverted txns.",
  },
  {
    name: "Chain-Switch Failures",
    icon: Link2,
    severity: "high" as const,
    example: "App crashes when user switches from Arbitrum to Optimism mid-transaction.",
    detail: "We test every supported network transition, including edge cases with pending approvals.",
  },
  {
    name: "Approval Flow Issues",
    icon: CheckCircle,
    severity: "medium" as const,
    example: "Infinite approval set by default with no user warning or revocation path.",
    detail: "We audit token approval UX for security, clarity, and revocation flows.",
  },
  {
    name: "NFT Metadata Errors",
    icon: ImageIcon,
    severity: "medium" as const,
    example: "Token image doesn't load because IPFS gateway is rate-limited.",
    detail: "We test metadata rendering across gateways, fallbacks, and edge-case token standards.",
  },
];

function BugCard({ issue, index, isInView }: { issue: typeof issues[0]; index: number; isInView: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const severity = severityColors[issue.severity];
  const IconComponent = issue.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
      onClick={() => setExpanded(!expanded)}
      className="group relative p-6 rounded-xl overflow-hidden border cursor-pointer transition-all duration-300"
      style={{
        backgroundColor: expanded ? "var(--surface-elevated)" : "var(--surface)",
        borderColor: expanded ? "var(--accent-primary)" : "var(--border-color)",
      }}
      role="button"
      aria-expanded={expanded}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setExpanded(!expanded); } }}
    >
      <div className="relative z-10">
        {/* Header row */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: "var(--accent-dim)" }}
          >
            <IconComponent
              className="w-5 h-5"
              style={{ color: "var(--accent-primary)" }}
              strokeWidth={1.5}
              aria-hidden="true"
            />
          </div>
          <span
            className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider"
            style={{ backgroundColor: severity.bg, color: severity.text }}
          >
            {severity.label}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-theme-primary mb-2">
          {issue.name}
        </h3>

        {/* Example */}
        <p className="text-sm text-theme-secondary leading-relaxed">
          {issue.example}
        </p>

        {/* Expanded detail */}
        <motion.div
          initial={false}
          animate={{ height: expanded ? "auto" : 0, opacity: expanded ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div
            className="mt-4 pt-4"
            style={{ borderTop: "1px solid var(--border-color)" }}
          >
            <p className="text-sm font-medium" style={{ color: "var(--accent-primary)" }}>
              {issue.detail}
            </p>
          </div>
        </motion.div>

        {/* Expand hint */}
        <div className="mt-3 flex items-center gap-1">
          <span className="text-xs text-theme-muted font-mono">
            {expanded ? "Click to collapse" : "Click for details"}
          </span>
          <motion.span
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            className="text-theme-muted text-xs"
            aria-hidden="true"
          >
            ▼
          </motion.span>
        </div>
      </div>
    </motion.article>
  );
}

export default function WhatWeCatch() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackingRef = useSectionTracking("what_we_catch", 0.5);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="what-we-catch"
      ref={(node) => {
        (sectionRef as any).current = node;
        (trackingRef as any).current = node;
      }}
      aria-label="Crypto-specific bugs we catch"
      className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 section-border relative overflow-hidden bg-theme"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <motion.div
              className="h-px"
              style={{ backgroundColor: "var(--text-secondary)" }}
              initial={{ width: 0 }}
              animate={isInView ? { width: 60 } : {}}
              transition={{ duration: 0.8 }}
            />
            <span className="text-theme-muted font-mono text-sm uppercase tracking-wider">
              What We Find
            </span>
            <motion.div
              className="h-px"
              style={{ backgroundColor: "var(--text-secondary)" }}
              initial={{ width: 0 }}
              animate={isInView ? { width: 60 } : {}}
              transition={{ duration: 0.8 }}
            />
          </motion.div>

          <div className="overflow-hidden">
            <motion.h2
              className="display-md mb-2"
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.2,
                ease: [0.215, 0.61, 0.355, 1],
              }}
            >
              Bugs your vendor
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="display-md gradient-text"
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.215, 0.61, 0.355, 1],
              }}
            >
              keeps missing
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-theme-secondary mt-6 max-w-xl mx-auto"
          >
            Click any card to see how we handle it.
          </motion.p>
        </motion.div>

        {/* Bug category cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-16">
          {issues.map((issue, index) => (
            <BugCard key={index} issue={issue} index={index} isInView={isInView} />
          ))}
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <p className="text-xl text-theme-secondary max-w-2xl mx-auto">
            These bugs slip through when your QA vendor doesn&apos;t understand
            crypto.
            <br />
            <span className="text-theme-primary font-medium">
              We catch them all.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
