"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  strength = 0.3,
  type = "button",
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current || disabled) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = (e.clientX - centerX) * strength;
    const y = (e.clientY - centerY) * strength;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = href ? motion.a : motion.button;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className?.includes('w-full') ? 'block' : 'inline-block'}
    >
      <Component
        href={href}
        onClick={onClick}
        type={href ? undefined : type}
        disabled={href ? undefined : disabled}
        className={className}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15 }}
      >
        {children}
      </Component>
    </div>
  );
}

// Hover text effect - characters animate on hover
interface HoverTextProps {
  text: string;
  className?: string;
  href?: string;
}

export function HoverText({ text, className = "", href }: HoverTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <span
      className={`inline-block relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="inline-flex">
        {text.split("").map((char, i) => (
          <motion.span
            key={i}
            className="inline-block"
            animate={{
              y: isHovered ? [0, -4, 0] : 0,
            }}
            transition={{
              duration: 0.3,
              delay: i * 0.02,
              ease: "easeOut",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
      <motion.span
        className="absolute bottom-0 left-0 w-full h-px bg-current"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ transformOrigin: "left" }}
      />
    </span>
  );

  if (href) {
    return <a href={href}>{content}</a>;
  }

  return content;
}
