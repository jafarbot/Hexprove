"use client";

import { motion } from "framer-motion";

interface HexagonLoaderProps {
  size?: number;
  className?: string;
}

export function HexagonLoader({ size = 80, className = "" }: HexagonLoaderProps) {
  const hexagonPoints = "50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5";
  const orbitalRadius = size * 0.35;
  const centerX = size / 2;
  const centerY = size / 2;

  // Calculate orbital positions (6 points around hexagon)
  const orbitalPositions = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * Math.PI) / 3 - Math.PI / 2; // Start from top
    return {
      x: centerX + orbitalRadius * Math.cos(angle),
      y: centerY + orbitalRadius * Math.sin(angle),
    };
  });

  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="absolute inset-0"
      >
        {/* Connection lines from center to orbitals */}
        {orbitalPositions.map((pos, i) => (
          <motion.line
            key={`line-${i}`}
            x1="50"
            y1="50"
            x2={(pos.x / size) * 100}
            y2={(pos.y / size) * 100}
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.5,
              delay: i * 0.1,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Central hexagon with rotation */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{ originX: "50px", originY: "50px" }}
        >
          <motion.polygon
            points={hexagonPoints}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.g>

        {/* Center dot with pulse */}
        <motion.circle
          cx="50"
          cy="50"
          r="4"
          fill="currentColor"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Orbital circles */}
        {orbitalPositions.map((pos, i) => (
          <motion.circle
            key={`orbital-${i}`}
            cx={(pos.x / size) * 100}
            cy={(pos.y / size) * 100}
            r="3"
            fill="currentColor"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              delay: i * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>

      {/* Loading dots below */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={`dot-${i}`}
            className="w-1.5 h-1.5 rounded-full bg-current"
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
}
