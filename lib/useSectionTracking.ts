"use client";

import { useEffect, useRef } from 'react';
import { trackSectionView } from './analytics';

/**
 * Hook to track when sections enter the viewport
 * @param sectionName - Name of the section (e.g., "hero", "services")
 * @param threshold - Percentage of section that must be visible (default: 0.5 = 50%)
 */
export function useSectionTracking(sectionName: string, threshold: number = 0.5) {
  const ref = useRef<HTMLElement>(null);
  const hasTracked = useRef(false);
  const pageLoadTime = useRef(Date.now());

  useEffect(() => {
    const element = ref.current;
    if (!element || hasTracked.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTracked.current) {
            hasTracked.current = true;
            const timeToSection = Math.floor((Date.now() - pageLoadTime.current) / 1000);
            trackSectionView(sectionName, timeToSection);
          }
        });
      },
      {
        threshold,
        rootMargin: '0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [sectionName, threshold]);

  return ref;
}
