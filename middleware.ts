import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const hostname = request.headers.get('host') || '';
  const pathname = request.nextUrl.pathname;

  // Allow staging subdomain to see full site
  const isStaging = hostname.startsWith('staging.') || hostname.startsWith('preview.');

  // Allow localhost for development
  const isLocalhost = hostname.includes('localhost') || hostname.includes('127.0.0.1');

  // If on staging/preview/localhost, allow full site
  if (isStaging || isLocalhost) {
    return NextResponse.next();
  }

  // On production (hexprove.com), redirect to coming soon
  // Skip if already on coming-soon page or static assets
  if (pathname === '/' && !pathname.startsWith('/coming-soon')) {
    return NextResponse.rewrite(new URL('/coming-soon', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and api routes
    '/((?!_next/static|_next/image|favicon.ico|.*\\..*|api).*)',
  ],
};
