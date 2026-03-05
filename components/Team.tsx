"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { trackOutboundLink } from "@/lib/analytics";

export default function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="team"
      ref={sectionRef}
      aria-label="Meet the founder"
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 section-border bg-theme"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-6 sm:mb-8"
        >
          <span className="text-theme-muted font-mono text-sm">05</span>
          <motion.div
            className="h-px bg-theme-secondary"
            initial={{ width: 0 }}
            animate={isInView ? { width: 60 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <span className="text-theme-muted font-mono text-sm uppercase tracking-wider">
            Founder
          </span>
        </motion.div>

        {/* Founder spotlight */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-4"
          >
            <div
              className="relative w-full aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden"
              style={{
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border-color)",
              }}
            >
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-dim) 0%, transparent 60%)",
                }}
                aria-hidden="true"
              />
              {/* Initials fallback */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className="text-6xl sm:text-7xl font-bold"
                  style={{ color: "var(--accent-primary)" }}
                >
                  SM
                </span>
              </div>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-8"
          >
            <h2 className="display-lg mb-2">Sino Monov</h2>
            <p
              className="text-lg font-mono mb-6"
              style={{ color: "var(--accent-primary)" }}
            >
              Founder & CEO
            </p>

            <div className="space-y-4 mb-8">
              <p className="text-lg text-theme-secondary leading-relaxed">
                Built QA programs at Bloomberg and Tradeweb. Led testing for
                platforms handling billions in daily volume. Saw firsthand how
                crypto products were shipping with QA vendors who had never
                connected a wallet.
              </p>
              <p className="text-lg text-theme-secondary leading-relaxed">
                Built the QA infrastructure at some of crypto's most recognized
                names — including at Uniswap and OpenSea. Now building yours.
              </p>
            </div>

            {/* Credential pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {["Bloomberg", "Tradeweb", "Uniswap", "OpenSea"].map(
                (company, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 text-sm font-mono rounded-full"
                    style={{
                      backgroundColor: "var(--surface-elevated)",
                      color: "var(--text-secondary)",
                      border: "1px solid var(--border-color)",
                    }}
                  >
                    {company}
                  </span>
                )
              )}
            </div>

            {/* LinkedIn link */}
            <a
              href="https://www.linkedin.com/in/sinousmonov/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackOutboundLink(
                  "Connect on LinkedIn",
                  "https://www.linkedin.com/in/sinousmonov/",
                  "founder_linkedin"
                )
              }
              className="inline-flex items-center gap-2 text-sm font-medium transition-colors duration-200"
              style={{ color: "var(--accent-primary)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--accent-secondary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--accent-primary)")
              }
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              Connect on LinkedIn →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
