/**
 * Client-side analytics tracking for BigQuery
 *
 * Usage:
 *   import { trackEvent } from '@/lib/analytics';
 *   trackEvent('cta_click', { cta_location: 'hero', cta_text: 'Book a Call' });
 */

// Generate or retrieve session ID
function getSessionId(): string {
  if (typeof window === 'undefined') return '';

  let sessionId = sessionStorage.getItem('hexprove_session_id');
  if (!sessionId) {
    sessionId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    sessionStorage.setItem('hexprove_session_id', sessionId);
  }
  return sessionId;
}

// Extract UTM parameters from URL
function getUtmParams(): Record<string, string> {
  if (typeof window === 'undefined') return {};

  const params = new URLSearchParams(window.location.search);
  const utmParams: Record<string, string> = {};

  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(key => {
    const value = params.get(key);
    if (value) utmParams[key] = value;
  });

  return utmParams;
}

// Get device type from user agent
function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';

  const ua = navigator.userAgent.toLowerCase();
  if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(ua)) {
    return 'mobile';
  }
  if (/ipad|tablet|playbook|silk/i.test(ua)) {
    return 'tablet';
  }
  return 'desktop';
}

// Get session start time (for time_on_site calculation)
function getSessionStartTime(): number {
  if (typeof window === 'undefined') return Date.now();

  let startTime = sessionStorage.getItem('hexprove_session_start');
  if (!startTime) {
    startTime = Date.now().toString();
    sessionStorage.setItem('hexprove_session_start', startTime);
  }
  return parseInt(startTime, 10);
}

// Calculate time on site in seconds
function getTimeOnSite(): number {
  return Math.floor((Date.now() - getSessionStartTime()) / 1000);
}

export interface EventData {
  [key: string]: string | number | boolean | null | undefined;
}

export async function trackEvent(eventName: string, data: EventData = {}): Promise<void> {
  if (typeof window === 'undefined') return;

  // Don't track in development unless explicitly enabled
  if (process.env.NODE_ENV === 'development' && !process.env.NEXT_PUBLIC_ENABLE_ANALYTICS) {
    console.log('[Analytics]', eventName, data);
    return;
  }

  try {
    const payload = {
      eventName,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId(),
      referrer: document.referrer || null,
      userAgent: navigator.userAgent,
      url: window.location.href,
      pagePath: window.location.pathname,
      deviceType: getDeviceType(),
      utmParams: getUtmParams(),
      timeOnSite: getTimeOnSite(),
      data,
    };

    // Use sendBeacon for reliability on page unload, fall back to fetch
    const body = JSON.stringify(payload);

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/events', body);
    } else {
      await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
        keepalive: true,
      });
    }
  } catch (error) {
    // Silently fail - analytics should never break the user experience
    console.error('[Analytics Error]', error);
  }
}

// Convenience functions for common events
export function trackPageView(pagePath?: string): void {
  trackEvent('page_view', {
    page_path: pagePath || (typeof window !== 'undefined' ? window.location.pathname : ''),
  });
}

export function trackCtaClick(ctaLocation: string, ctaText: string, destination?: string): void {
  trackEvent('cta_click', {
    cta_location: ctaLocation,
    cta_text: ctaText,
    destination: destination || null,
  });
}

export function trackFormSubmit(formName: string, additionalData?: EventData): void {
  trackEvent(`${formName}_submitted`, {
    time_on_site: getTimeOnSite(),
    ...additionalData,
  });
}
