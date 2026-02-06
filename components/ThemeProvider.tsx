"use client";

import { useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

type Theme = "dark" | "light";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always locked to dark mode
  const [theme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      const root = document.documentElement;
      root.classList.add("dark");
      root.classList.remove("light");
    }
  }, [mounted]);

  // No-op function since theme is locked
  const toggleTheme = () => {
    // Theme is locked to dark mode
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Re-export useTheme for convenience
export { useTheme } from "./ThemeContext";
