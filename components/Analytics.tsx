"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { trackPageView, trackEvent } from "@/lib/analytics";

const LEGAL_PAGES: Record<string, string> = {
  "/terms": "terms",
  "/privacy": "privacy",
  "/cookie-policy": "cookie_policy",
};

export default function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page view on route change (all pages, including legal)
    trackPageView(pathname);

    // Explicit event for legal pages so you can filter in Umami
    const legalPage = LEGAL_PAGES[pathname];
    if (legalPage) {
      trackEvent("legal_page_view", { page: legalPage, path: pathname });
    }
  }, [pathname, searchParams]);

  return null;
}
