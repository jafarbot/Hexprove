"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { TextScramble } from "./animations";
import { useSectionTracking } from "@/lib/useSectionTracking";

const faqs = [
  {
    question: "Why does my DeFi protocol need dedicated QA testing?",
    answer: "Traditional QA vendors don't understand wallet connections, gas estimation, or transaction states. They report gas fees as bugs and rotate testers who lose context every sprint. DeFi products have unique failure modes — slippage, reverts, bridge timing — that require testers who've shipped and tested crypto systems.",
  },
  {
    question: "What's the difference between a security audit and QA testing?",
    answer: "Security audits focus on smart contract code — looking for vulnerabilities in Solidity. We don't do that. QA testing validates your entire user experience — wallet flows, frontend logic, API reliability, transaction handling, and edge cases that break real user journeys. You need both, but they're completely different disciplines.",
  },
  {
    question: "How much does DeFi QA testing cost?",
    answer: "Every engagement is different — it depends on your product's complexity, the scope of testing, and whether you need a one-time sprint or ongoing coverage. We'll scope it together on a discovery call and give you a clear proposal with no surprises.",
  },
  {
    question: "Can't we just use crowdsourced testing for our crypto product?",
    answer: "Crowdsourced platforms give you different testers every week who've never connected a wallet. You'll get shallow coverage with no context continuity. DeFi testing requires deep product knowledge, understanding of protocol mechanics, and consistent testers who learn your system over time.",
  },
  {
    question: "What does a typical QA engagement look like?",
    answer: "We start with a discovery call to understand your product, tech stack, and risk areas. Then we propose a scope — could be manual exploratory testing, E2E automation, or ongoing embedded QA. Most engagements include weekly check-ins, detailed bug reports with repro steps and video, and a shared tracker for visibility.",
  },
  {
    question: "Do you test smart contracts or just the frontend?",
    answer: "We test the full user-facing product — frontend flows, wallet integrations, APIs, and how your dApp interacts with contracts (signing, reverts, gas estimation, state changes). We don't audit Solidity code — that's a separate discipline. We make sure your product works for real users.",
  },
  {
    question: "How long does a typical QA engagement take?",
    answer: "A pre-launch QA sprint typically takes 2-4 weeks depending on scope. Ongoing engagements run continuously, synced to your sprints. E2E automation buildout can take 4-6 weeks for initial coverage, then we maintain and expand it as your product evolves.",
  },
  {
    question: "What chains and protocols do you support?",
    answer: "We test on Ethereum, major L2s (Arbitrum, Optimism, Base, Polygon), and Solana. We have accounts and test assets on all of them. We've tested DEXs, lending protocols, NFT marketplaces, bridges, and on/off-ramps. If your product runs on a live chain, we can test it.",
  },
];

function FAQItem({ faq, index }: { faq: typeof faqs[0]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="border-b"
      style={{ borderColor: "var(--border-color)" }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 sm:py-8 text-left flex items-start justify-between gap-4 group hover:opacity-80 transition-opacity min-h-[44px]"
        aria-expanded={isOpen}
      >
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-semibold text-theme-primary pr-8">
            {faq.question}
          </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-accent text-2xl font-light"
          aria-hidden="true"
        >
          +
        </motion.div>
      </button>
      <motion.div
        initial={false}
        animate={{
          height: isOpen ? "auto" : 0,
          opacity: isOpen ? 1 : 0,
        }}
        transition={{ duration: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
        className="overflow-hidden"
      >
        <p className="pb-6 sm:pb-8 text-base sm:text-lg text-theme-secondary leading-relaxed pr-12">
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackingRef = useSectionTracking("faq", 0.5);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  // JSON-LD structured data for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <section
        ref={(node) => {
          (sectionRef as any).current = node;
          (trackingRef as any).current = node;
        }}
        id="faq"
        aria-label="Frequently asked questions about DeFi QA testing"
        className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 section-border bg-theme"
      >
        <div className="max-w-4xl mx-auto">
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-6 sm:mb-8"
          >
            <span className="text-accent font-mono text-sm">06</span>
            <motion.div
              className="h-px bg-accent"
              initial={{ width: 0 }}
              animate={isInView ? { width: 60 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <span className="text-theme-muted font-mono text-sm uppercase tracking-wider">FAQ</span>
          </motion.div>

          <header className="mb-12 sm:mb-16">
            <div className="overflow-hidden">
              <motion.h2
                className="display-lg"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              >
                Common
              </motion.h2>
              <motion.h2
                className="display-lg gradient-text"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <TextScramble text="questions" delay={0.5} duration={1} />
              </motion.h2>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg sm:text-xl text-theme-secondary mt-6"
            >
              Everything you need to know about working with Hexprove.
            </motion.p>
          </header>

          {/* FAQ items */}
          <div role="list" aria-label="Frequently asked questions">
            {faqs.map((faq, index) => (
              <FAQItem key={index} faq={faq} index={index} />
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-12 sm:mt-16 text-center"
          >
            <p className="text-theme-secondary mb-6">
              Still have questions?
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 text-accent text-lg font-medium hover:gap-3 transition-all duration-300 min-h-[44px]"
            >
              Get in touch →
            </a>
          </motion.div>
        </div>
      </section>
    </>
  );
}
