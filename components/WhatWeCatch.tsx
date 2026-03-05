"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { 
  Zap, 
  Unplug, 
  AlertTriangle, 
  Link2, 
  CheckCircle, 
  Image as ImageIcon 
} from "lucide-react";
import { useSectionTracking } from "@/lib/useSectionTracking";

const issues = [
  { name: "Gas Estimation Errors", icon: Zap },
  { name: "Wallet Connection Bugs", icon: Unplug },
  { name: "Transaction Mismatches", icon: AlertTriangle },
  { name: "Chain-Switch Failures", icon: Link2 },
  { name: "Approval Flow Issues", icon: CheckCircle },
  { name: "NFT Metadata Errors", icon: ImageIcon },
];

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
      {/* Static background blobs - neutral */}
      <div
        className="absolute top-1/4 -left-32 w-64 h-64 rounded-full blur-3xl"
        style={{ background: "var(--red-bg)" }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full blur-3xl"
        style={{ background: "var(--accent-dim)" }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
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
            <span className="text-theme-muted font-mono text-sm uppercase tracking-wider">Crypto-Specific</span>
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
              className="display-md mb-4"
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
            >
              Bugs your vendor
            </motion.h2>
          </div>
          <div className="overflow-hidden">
            <motion.h2
              className="display-md gradient-text"
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
            >
              keeps missing
            </motion.h2>
          </div>
        </motion.div>

        {/* Animated bug cards */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16"
        >
          {issues.map((issue, index) => {
            const IconComponent = issue.icon;
            return (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="group relative p-6 rounded-xl overflow-hidden border"
                style={{ 
                  backgroundColor: "var(--surface-50)",
                  borderColor: "var(--border-color)",
                }}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <IconComponent 
                      className="w-6 h-6 text-theme-secondary" 
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                    <span
                      className="text-theme-red text-xl font-light"
                      aria-hidden="true"
                    >
                      ×
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-theme-primary">
                    {issue.name}
                  </h3>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center"
        >
          <p className="text-xl text-theme-secondary mb-8 max-w-2xl mx-auto">
            These bugs slip through when your QA vendor doesn&apos;t understand crypto.
            <br />
            <span className="text-theme-primary font-medium">We catch them all.</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
