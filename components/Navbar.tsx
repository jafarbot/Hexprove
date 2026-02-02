"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTheme } from "./ThemeContext";
import { HoverText, MagneticButton } from "./animations";
import { Logo } from "./Logo";

const navLinks = [
  { name: "About", href: "#about", num: "01" },
  { name: "Services", href: "#services", num: "02" },
  { name: "Experience", href: "#experience", num: "03" },
  { name: "Team", href: "#team", num: "04" },
  { name: "Contact", href: "#contact", num: "05" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "backdrop-blur-xl" : ""
      }`}
      style={{
        backgroundColor: scrolled ? "var(--glass-bg)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border-color)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" onClick={closeMobileMenu}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="text-accent"
            >
              <Logo size={32} />
            </motion.div>
            <span className="text-lg font-bold text-theme-primary">Hexprove</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="group relative text-sm text-theme-secondary hover:text-theme-primary transition-colors"
              >
                <span className="text-accent text-[10px] font-mono absolute -top-3 left-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  {link.num}
                </span>
                <HoverText text={link.name} />
              </a>
            ))}
            
            <button
              onClick={toggleTheme}
              className="p-2 text-theme-secondary hover:text-theme-primary transition-colors"
              aria-label="Toggle theme"
            >
              <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                {theme === "dark" ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </motion.div>
            </button>

            <MagneticButton
              href="#contact"
              className="px-5 py-2 btn-primary text-sm font-semibold rounded-full"
              strength={0.15}
            >
              Contact
            </MagneticButton>
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 text-theme-secondary hover:text-theme-primary transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-theme-secondary hover:text-theme-primary transition-colors"
              aria-label="Menu"
            >
              <div className="w-6 h-4 flex flex-col justify-between">
                <motion.span
                  className="w-full h-0.5 origin-left"
                  style={{ backgroundColor: "var(--foreground)" }}
                  animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? -2 : 0 }}
                />
                <motion.span
                  className="w-full h-0.5"
                  style={{ backgroundColor: "var(--foreground)" }}
                  animate={{ opacity: mobileMenuOpen ? 0 : 1, x: mobileMenuOpen ? -20 : 0 }}
                />
                <motion.span
                  className="w-full h-0.5 origin-left"
                  style={{ backgroundColor: "var(--foreground)" }}
                  animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? 2 : 0 }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 top-[60px] z-40"
            style={{ backgroundColor: "var(--background)" }}
          >
            <div className="flex flex-col items-start justify-center h-full px-8 gap-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={closeMobileMenu}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex items-center gap-4"
                >
                  <span className="text-accent font-mono text-sm">{link.num}</span>
                  <span className="text-4xl font-bold text-theme-primary hover:text-accent transition-colors">
                    {link.name}
                  </span>
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={closeMobileMenu}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-8 px-8 py-3 btn-primary font-semibold rounded-full"
              >
                Get Started
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
