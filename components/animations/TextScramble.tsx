"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  trigger?: boolean;
}

export function TextScramble({
  text,
  className = "",
  delay = 0,
  duration = 1.5,
  once = true,
  trigger,
}: TextScrambleProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const hasAnimated = useRef(false);
  const useTriggerMode = trigger !== undefined;

  const scramble = useCallback(() => {
    if (hasAnimated.current && once) return;
    hasAnimated.current = true;
    setIsAnimating(true);

    const originalText = text;
    const length = originalText.length;
    const totalFrames = Math.floor(duration * 60);
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const revealedLength = Math.floor(progress * length);

      let result = "";
      for (let i = 0; i < length; i++) {
        if (originalText[i] === " ") {
          result += " ";
        } else if (i < revealedLength) {
          result += originalText[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }

      setDisplayText(result);

      if (frame >= totalFrames) {
        clearInterval(interval);
        setDisplayText(originalText);
        setIsAnimating(false);
      }
    }, 1000 / 60);

    return () => clearInterval(interval);
  }, [text, duration, once]);

  // Trigger mode: scramble when trigger changes to true
  useEffect(() => {
    if (useTriggerMode && trigger && !isAnimating) {
      scramble();
    }
  }, [trigger, useTriggerMode, scramble, isAnimating]);

  // InView mode: scramble when element enters viewport
  useEffect(() => {
    if (!useTriggerMode && isInView) {
      const timeout = setTimeout(scramble, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, scramble, delay, useTriggerMode]);

  return (
    <motion.span
      ref={ref}
      className={`inline-block ${className}`}
      initial={useTriggerMode ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: useTriggerMode || isInView ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {displayText}
    </motion.span>
  );
}

// Character-by-character reveal animation
interface CharRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function CharReveal({ 
  text, 
  className = "", 
  delay = 0,
  staggerDelay = 0.03 
}: CharRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 50, rotateX: -90 }}
          animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
          transition={{
            duration: 0.5,
            delay: delay + i * staggerDelay,
            ease: [0.215, 0.61, 0.355, 1],
          }}
          style={{ transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </span>
  );
}

// Word-by-word reveal
interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export function WordReveal({ 
  text, 
  className = "", 
  delay = 0,
  staggerDelay = 0.1 
}: WordRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: delay + i * staggerDelay,
              ease: [0.215, 0.61, 0.355, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
