"use client";

import { motion } from "framer-motion";

interface LogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

export function Logo({ size = 48, animated = false, className = "" }: LogoProps) {
  const hexagonPoints = "50,5 90,27.5 90,72.5 50,95 10,72.5 10,27.5";
  const orbitalRadius = 35;
  const centerX = 50;
  const centerY = 50;

  // Calculate orbital positions (6 points around hexagon)
  const orbitalPositions = Array.from({ length: 6 }, (_, i) => {
    const angle = (i * Math.PI) / 3 - Math.PI / 2;
    return {
      x: centerX + orbitalRadius * Math.cos(angle),
      y: centerY + orbitalRadius * Math.sin(angle),
    };
  });

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      fill="none"
    >
      {animated ? (
        <>
          {/* Animated version - connection lines */}
          {orbitalPositions.map((pos, i) => (
            <motion.line
              key={`line-${i}`}
              x1="50"
              y1="50"
              x2={pos.x}
              y2={pos.y}
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

          {/* Animated hexagon */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ originX: "50px", originY: "50px" }}
          >
            <polygon
              points={hexagonPoints}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </motion.g>

          {/* Center dot */}
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
              cx={pos.x}
              cy={pos.y}
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
        </>
      ) : (
        <>
          {/* Static version - connection lines */}
          {orbitalPositions.map((pos, i) => (
            <line
              key={`line-${i}`}
              x1="50"
              y1="50"
              x2={pos.x}
              y2={pos.y}
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.3"
            />
          ))}

          {/* Static hexagon */}
          <polygon
            points={hexagonPoints}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />

          {/* Center dot */}
          <circle cx="50" cy="50" r="4" fill="currentColor" />

          {/* Orbital circles */}
          {orbitalPositions.map((pos, i) => (
            <circle
              key={`orbital-${i}`}
              cx={pos.x}
              cy={pos.y}
              r="3"
              fill="currentColor"
            />
          ))}
        </>
      )}
    </svg>
  );
}
