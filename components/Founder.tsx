"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Linkedin } from "lucide-react";

export default function Founder() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      ref={sectionRef}
      aria-label="Founded by QA veterans"
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 section-border bg-theme"
    >
      <div className="max-w-5xl mx-auto">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-sm text-theme-muted font-mono uppercase tracking-wider">
            Built by QA Veterans
          </span>
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-[200px_1fr] lg:grid-cols-[240px_1fr] gap-8 lg:gap-12 items-start"
        >
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative mx-auto md:mx-0"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative w-[180px] h-[180px] sm:w-[200px] sm:h-[200px] lg:w-[240px] lg:h-[240px] rounded-2xl overflow-hidden"
              style={{ border: "2px solid var(--border-color)" }}
            >
              {/* Placeholder for founder photo */}
              <div 
                className="absolute inset-0 flex items-center justify-center text-theme-muted"
                style={{ backgroundColor: "var(--surface-50)" }}
              >
                <div className="text-center p-4">
                  <svg 
                    className="w-16 h-16 mx-auto mb-2 opacity-30" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={1.5} 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                    />
                  </svg>
                  <p className="text-xs opacity-50">Add photo at<br/>public/founder.jpg</p>
                </div>
              </div>
              
              {/* Uncomment when photo is added */}
              {/* <Image
                src="/founder.jpg"
                alt="Founder"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 200px, 240px"
                priority
              /> */}
              
              {/* Animated border on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{ border: "2px solid var(--accent)" }}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <h3 className="text-2xl sm:text-3xl font-bold text-theme-primary mb-2">
                Founded by <span className="gradient-text">[Your Name]</span>
              </h3>
              <p className="text-base sm:text-lg text-accent mb-6">
                Former Lead QA at Uniswap & OpenSea
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="space-y-4 mb-8"
            >
              <p className="text-base sm:text-lg text-theme-primary leading-relaxed">
                10+ years of QA experience across Web3 and enterprise. 
                Most recently led QA at Uniswap as the sole engineer, building the QA framework from scratch.
              </p>
              <p className="text-base sm:text-lg text-theme-secondary leading-relaxed">
                Built Hexprove to solve the crypto QA knowledge gap — no more explaining 
                gas fees to crowdsourced testers who report them as bugs.
              </p>
            </motion.div>

            {/* LinkedIn link */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <motion.a
                href="https://www.linkedin.com/in/sinousmonov/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-secondary font-medium min-h-[48px]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="w-5 h-5" />
                <span>Connect on LinkedIn</span>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
