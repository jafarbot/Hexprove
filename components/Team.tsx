"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TextScramble } from "./animations";

const values = [
  { 
    title: "Consistent", 
    subtitle: "Quality",
    desc: "Same team, same standards, every sprint" 
  },
  { 
    title: "Growing", 
    subtitle: "Expertise",
    desc: "We learn your product deeper each cycle" 
  },
  { 
    title: "Direct", 
    subtitle: "Communication",
    desc: "No middlemen, no ticket queues" 
  },
];

export default function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section 
      id="team"
      ref={sectionRef}
      aria-label="Our dedicated QA team approach"
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 section-border bg-theme"
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
              <span className="text-theme-muted font-mono text-sm">05</span>
              <motion.div
                className="h-px bg-theme-secondary"
                initial={{ width: 0 }}
                animate={isInView ? { width: 60 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <span className="text-theme-muted font-mono text-sm uppercase tracking-wider">Team</span>
            </motion.div>

            <header className="overflow-hidden">
              <motion.h2
                className="display-lg"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              >
                Your dedicated
              </motion.h2>
              <motion.h2
                className="display-lg gradient-text"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <TextScramble text="team" delay={0.5} duration={1} />
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
              Not a rotating cast of crowdsourced testers. The same expert QA team, 
              sprint after sprint.
            </p>
          </motion.div>
        </div>

        {/* Quote block */}
        <motion.blockquote
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mb-12 sm:mb-20 py-10 sm:py-16 px-6 sm:px-8 lg:px-16 rounded-2xl"
          style={{ border: "1px solid var(--border-color)" }}
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-4 sm:left-8 w-6 sm:w-8 h-6 sm:h-8 border-t-2 border-l-2 rounded-tl-lg" style={{ borderColor: "var(--border-color)" }} aria-hidden="true" />
          <div className="absolute bottom-0 right-4 sm:right-8 w-6 sm:w-8 h-6 sm:h-8 border-b-2 border-r-2 rounded-br-lg" style={{ borderColor: "var(--border-color)" }} aria-hidden="true" />

          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-theme-primary">
                One team.
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight gradient-text">
                Your product.
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <span className="block text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-theme-muted">
                Every sprint.
              </span>
            </motion.div>
          </div>
        </motion.blockquote>

        {/* Values */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-1" role="list" aria-label="Our core values">
          {values.map((value, index) => (
            <motion.article
              key={index}
              role="listitem"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              whileHover={{ backgroundColor: "var(--surface-50)" }}
              className="group p-6 sm:p-8 transition-all duration-300"
              style={{ border: "1px solid var(--border-color)" }}
            >
              <div className="mb-4">
                <motion.h3
                  className="text-2xl sm:text-3xl font-bold text-theme-primary"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2 }}
                >
                  {value.title}
                </motion.h3>
                <motion.span
                  className="text-2xl sm:text-3xl font-bold text-theme-secondary block"
                  whileHover={{ x: 10 }}
                  transition={{ duration: 0.2, delay: 0.05 }}
                >
                  {value.subtitle}
                </motion.span>
              </div>
              <p className="text-sm sm:text-base text-theme-muted">{value.desc}</p>
              
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
          ))}
        </div>
      </div>
    </section>
  );
}
