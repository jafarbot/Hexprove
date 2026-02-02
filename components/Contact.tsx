"use client";

import { motion, useInView } from "framer-motion";
import { useState, useCallback, useRef } from "react";
import { TextScramble, MagneticButton, HoverText } from "./animations";
import { Logo } from "./Logo";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  }, [formData]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  return (
    <section 
      id="contact"
      ref={sectionRef}
      aria-label="Contact Hexprove for QA consulting"
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 section-border relative overflow-hidden bg-theme"
    >
      {/* Background gradient */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, var(--accent-dim) 0%, transparent 70%)" }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Left side */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-6 sm:mb-8"
            >
              <span className="text-accent font-mono text-sm">05</span>
              <motion.div
                className="h-px bg-accent"
                initial={{ width: 0 }}
                animate={isInView ? { width: 60 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
              <span className="text-theme-muted font-mono text-sm uppercase tracking-wider">Contact</span>
            </motion.div>

            <header className="overflow-hidden mb-6 sm:mb-8">
              <motion.h2
                className="display-lg"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
              >
                Let&apos;s
              </motion.h2>
              <motion.h2
                className="display-lg gradient-text"
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.215, 0.61, 0.355, 1] }}
              >
                <TextScramble text="talk" delay={0.5} duration={1} />
              </motion.h2>
            </header>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-theme-secondary mb-8 sm:mb-12"
            >
              Ready to upgrade your QA? Tell us about your project.
            </motion.p>

            <motion.address
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-6 not-italic"
            >
              <div>
                <span className="text-sm text-theme-muted uppercase tracking-wider">Email</span>
                <a
                  href="mailto:hello@hexprove.io"
                  className="block text-xl sm:text-2xl md:text-3xl font-semibold mt-2 text-theme-primary hover:text-accent transition-colors"
                >
                  <HoverText text="hello@hexprove.io" />
                </a>
              </div>

              <motion.div
                className="flex gap-6 pt-6 sm:pt-8"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <HoverText text="Twitter" href="#" className="text-theme-muted hover:text-theme-primary min-h-[44px] flex items-center" />
                <HoverText text="LinkedIn" href="#" className="text-theme-muted hover:text-theme-primary min-h-[44px] flex items-center" />
              </motion.div>
            </motion.address>
          </div>

          {/* Right side - Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex items-center justify-center p-8 sm:p-12 rounded-2xl min-h-[400px]"
                style={{ border: "1px solid var(--border-color)" }}
                role="alert"
                aria-live="polite"
              >
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 sm:mb-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "var(--accent-dim)" }}
                    aria-hidden="true"
                  >
                    <motion.svg
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 }}
                      className="w-8 h-8 sm:w-10 sm:h-10 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <motion.path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  </motion.div>
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-theme-primary">Message Sent</h3>
                  <p className="text-theme-secondary">We&apos;ll get back to you within 24 hours.</p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6" noValidate>
                {[
                  { name: "name", label: "Name", type: "text", placeholder: "Your name" },
                  { name: "email", label: "Email", type: "email", placeholder: "you@company.com" },
                  { name: "company", label: "Company", type: "text", placeholder: "Your company" },
                ].map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="relative"
                  >
                    <motion.label
                      htmlFor={field.name}
                      className="block text-sm font-medium mb-2 transition-colors"
                      animate={{ color: focusedField === field.name ? "var(--accent)" : "var(--text-muted)" }}
                    >
                      {field.label}
                      {field.name !== "company" && <span className="text-accent ml-1" aria-label="required">*</span>}
                    </motion.label>
                    <input
                      type={field.type}
                      id={field.name}
                      name={field.name}
                      value={formData[field.name as keyof typeof formData]}
                      onChange={handleChange}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      required={field.name !== "company"}
                      autoComplete={field.name}
                      className="input-field w-full px-0 py-3 text-base sm:text-lg min-h-[48px]"
                      placeholder={field.placeholder}
                      aria-required={field.name !== "company"}
                    />
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="relative"
                >
                  <motion.label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                    animate={{ color: focusedField === "message" ? "var(--accent)" : "var(--text-muted)" }}
                  >
                    Message
                    <span className="text-accent ml-1" aria-label="required">*</span>
                  </motion.label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows={4}
                    className="input-field w-full px-0 py-3 resize-none text-base sm:text-lg"
                    placeholder="Tell us about your project..."
                    aria-required="true"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.9 }}
                  className="pt-4"
                >
                  <MagneticButton
                    type="submit"
                    className="w-full py-4 btn-primary font-semibold rounded-full min-h-[52px]"
                    strength={0.1}
                  >
                    Send Message
                  </MagneticButton>
                </motion.div>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 1 }}
        className="max-w-7xl mx-auto mt-20 sm:mt-32 pt-6 sm:pt-8"
        style={{ borderTop: "1px solid var(--border-color)" }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="text-accent"
            >
              <Logo size={24} />
            </motion.div>
            <span className="font-semibold text-theme-primary">Hexprove</span>
          </div>
          
          <div className="flex items-center gap-6 sm:gap-8 text-sm">
            <a 
              href="mailto:hello@hexprove.com" 
              className="text-theme-secondary hover:text-accent transition-colors font-mono min-h-[44px] flex items-center"
              aria-label="Email Hexprove"
            >
              hello@hexprove.com
            </a>
            <nav className="flex gap-6 sm:gap-8" aria-label="Footer navigation">
              <HoverText text="Privacy" href="#" className="text-theme-muted min-h-[44px] flex items-center" />
              <HoverText text="Terms" href="#" className="text-theme-muted min-h-[44px] flex items-center" />
            </nav>
          </div>
          
          <div className="text-sm text-theme-muted font-mono">
            <span aria-label="Copyright">&copy;</span> {new Date().getFullYear()} Hexprove
          </div>
        </div>
      </motion.footer>
    </section>
  );
}
