"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { HoverText, MagneticButton } from "./animations";
import { Logo } from "./Logo";
import { trackCtaClick } from "@/lib/analytics";

const navLinks = [
  { name: "Services", href: "/services", scrollTo: "services", num: "01" },
  { name: "About", href: "/about", scrollTo: "about", num: "02" },
  { name: "Blog", href: "/blog", scrollTo: null, num: "03" },
  { name: "Contact", href: "/contact", scrollTo: "contact", num: "04" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHomepage = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    // On homepage, smooth-scroll to section instead of navigating
    if (isHomepage && link.scrollTo) {
      e.preventDefault();
      const el = document.getElementById(link.scrollTo);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      closeMobileMenu();
    } else {
      closeMobileMenu();
    }
  }, [isHomepage, closeMobileMenu]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
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
                onClick={(e) => handleNavClick(e, link)}
                className="group relative text-sm text-theme-secondary hover:text-theme-primary transition-colors"
              >
                <span className="text-accent text-[10px] font-mono absolute -top-3 left-0 opacity-0 group-hover:opacity-100 transition-opacity">
                  {link.num}
                </span>
                <HoverText text={link.name} />
              </a>
            ))}

            <a
              href="https://calendly.com/sino-hexprove/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 btn-primary text-sm font-semibold rounded-full"
              onClick={() => trackCtaClick('navbar', 'Book a Call', 'https://calendly.com/sino-hexprove/30min')}
            >
              Book a Call
            </a>
          </div>

          {/* Mobile buttons */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-3 min-h-[44px] min-w-[44px] text-theme-secondary hover:text-theme-primary transition-colors flex items-center justify-center"
              aria-label="Menu"
            >
              <div className="w-6 h-5 flex flex-col justify-between">
                <motion.span
                  className="w-full h-0.5 bg-current origin-center"
                  animate={{
                    rotate: mobileMenuOpen ? 45 : 0,
                    y: mobileMenuOpen ? 8 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
                <motion.span
                  className="w-full h-0.5 bg-current"
                  animate={{
                    opacity: mobileMenuOpen ? 0 : 1,
                    scaleX: mobileMenuOpen ? 0 : 1
                  }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                />
                <motion.span
                  className="w-full h-0.5 bg-current origin-center"
                  animate={{
                    rotate: mobileMenuOpen ? -45 : 0,
                    y: mobileMenuOpen ? -8 : 0
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Rendered via Portal */}
      {mounted && mobileMenuOpen && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-[9999]"
            style={{ backgroundColor: "var(--background)" }}
          >
            <div className="flex flex-col items-start justify-center h-full px-8 gap-6 pt-20">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link)}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ delay: index * 0.1 }}
                  className="group flex items-center gap-4 min-h-[44px] py-2"
                >
                  <span className="text-accent font-mono text-sm">{link.num}</span>
                  <span className="text-2xl sm:text-3xl font-bold text-theme-primary hover:text-accent transition-colors">
                    {link.name}
                  </span>
                </motion.a>
              ))}
              <motion.a
                href="https://calendly.com/sino-hexprove/30min"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="mt-8 px-8 py-3 btn-primary font-semibold rounded-full min-h-[48px] flex items-center justify-center"
              >
                Book a Call
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </motion.nav>
  );
}
