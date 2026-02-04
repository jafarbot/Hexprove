"use client";

import { useEffect, useRef } from 'react';
import { trackScrollDepth } from './analytics';

/**
 * Hook to track scroll depth milestones (25%, 50%, 75%, 100%)
 * @param pagePath - The current page path (e.g., "/blog/post-slug")
 */
export function useScrollDepth(pagePath: string) {
  const milestones = useRef(new Set<number>());
  const startTime = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const scrollPercentage = Math.round(
        ((scrollTop + windowHeight) / documentHeight) * 100
      );

      // Track milestones: 25%, 50%, 75%, 100%
      const thresholds = [25, 50, 75, 100];
      
      thresholds.forEach((threshold) => {
        if (scrollPercentage >= threshold && !milestones.current.has(threshold)) {
          milestones.current.add(threshold);
          const timeOnPage = Math.floor((Date.now() - startTime.current) / 1000);
          trackScrollDepth(pagePath, threshold, timeOnPage);
        }
      });
    };

    // Throttle scroll events
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [pagePath]);
}
