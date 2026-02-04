"use client";

import { trackOutboundLink } from "@/lib/analytics";
import Link from "next/link";
import { ReactNode } from "react";

interface TrackableLinkProps {
  href: string;
  children: ReactNode;
  location: string;
  className?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

/**
 * Link component that tracks outbound clicks
 */
export function TrackableLink({ 
  href, 
  children, 
  location, 
  className, 
  target = "_blank",
  rel = "noopener noreferrer",
  onClick 
}: TrackableLinkProps) {
  const handleClick = () => {
    const linkText = typeof children === 'string' ? children : href;
    trackOutboundLink(linkText, href, location);
    onClick?.();
  };

  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
}
