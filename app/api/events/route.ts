import { NextRequest, NextResponse } from 'next/server';

interface EventPayload {
  eventName: string;
  timestamp: string;
  sessionId: string;
  referrer: string | null;
  userAgent: string;
  url: string;
  pagePath: string;
  deviceType: string;
  utmParams: Record<string, string>;
  timeOnSite: number;
  data: Record<string, unknown>;
}

// --- Rate limiting: max 30 requests per minute per IP ---
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 30;
const eventsRateMap = new Map<string, number[]>();

function getRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = eventsRateMap.get(ip) || [];
  const recent = timestamps.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    return true;
  }
  recent.push(now);
  eventsRateMap.set(ip, recent);
  return false;
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIP(request);
    if (getRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    const event: EventPayload = await request.json();

    // Validate required fields
    if (!event.eventName || !event.timestamp || !event.sessionId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if BigQuery is configured
    const projectId = process.env.BIGQUERY_PROJECT_ID;
    const dataset = process.env.BIGQUERY_DATASET;

    if (!projectId || !dataset) {
      return NextResponse.json({ success: true, mode: 'local' });
    }

    // Dynamically import BigQuery to avoid build errors if not installed
    let BigQuery;
    try {
      const bigqueryModule = await import('@google-cloud/bigquery');
      BigQuery = bigqueryModule.BigQuery;
    } catch {
      return NextResponse.json({ success: true, mode: 'local' });
    }

    // Initialize BigQuery
    const credentials = process.env.BIGQUERY_CREDENTIALS;

    // Prepare row for BigQuery
    const row = {
      eventName: event.eventName,
      timestamp: event.timestamp,
      sessionId: event.sessionId,
      referrer: event.referrer,
      userAgent: event.userAgent,
      url: event.url,
      pagePath: event.pagePath,
      deviceType: event.deviceType,
      utmParams: JSON.stringify(event.utmParams),
      timeOnSite: JSON.stringify(event.timeOnSite),
      data: JSON.stringify(event.data),
    };

    // Try BigQuery, fall back to logging if it fails
    try {
      const bigquery = credentials
        ? new BigQuery({ projectId, credentials: JSON.parse(credentials) })
        : new BigQuery({ projectId });

      await bigquery
        .dataset(dataset)
        .table('events')
        .insert([row]);

      return NextResponse.json({ success: true, mode: 'bigquery' });
    } catch (bqError) {
      // BigQuery failed - return success anyway
      // Analytics should never break the user experience
      console.error('[BigQuery Error]', bqError);
      return NextResponse.json({ success: true, mode: 'logged' });
    }
  } catch (error) {
    console.error('[Events API Error]', error);
    // Still return success - analytics errors shouldn't affect users
    return NextResponse.json({ success: true, mode: 'error' });
  }
}

// Allow OPTIONS for CORS preflight if needed
export async function OPTIONS() {
  return NextResponse.json({}, { status: 200 });
}
