# Toggle Coming Soon Page

Toggle the coming soon page on/off by updating the NEXT_PUBLIC_COMING_SOON environment variable in .env.

## Steps:
1. Check current state in .env file
2. Toggle between `true` (coming soon enabled) and `false` (full site visible)
3. Restart the development server if it's running
4. Verify the change took effect

## Context:
- When `NEXT_PUBLIC_COMING_SOON=true`: Visitors see the coming soon placeholder
- When `NEXT_PUBLIC_COMING_SOON=false`: Visitors see the full Hexprove website

## After toggling:
- If deploying to Vercel, make sure to update the environment variable in Vercel dashboard as well
- Test the change locally before deploying
