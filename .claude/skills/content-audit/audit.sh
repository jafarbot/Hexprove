#!/bin/bash

PROJECT_DIR="/Users/sino/Documents/Hexprove"
cd "$PROJECT_DIR" || exit 1

echo "=== Hexprove Content Audit ==="
echo ""

# Extract metadata from layout
echo "1. SEO Metadata (from app/layout.tsx):"
if [ -f "app/layout.tsx" ]; then
  echo "---"
  grep -A 20 "export const metadata" app/layout.tsx 2>/dev/null || echo "No metadata export found"
  echo "---"
else
  echo "   ❌ layout.tsx not found"
fi

# Check page content
echo ""
echo "2. Homepage Content (from app/page.tsx):"
if [ -f "app/page.tsx" ]; then
  echo "   File exists: ✅"
  WORD_COUNT=$(wc -w < app/page.tsx)
  echo "   Word count: $WORD_COUNT"
else
  echo "   ❌ page.tsx not found"
fi

# Check for key messaging terms
echo ""
echo "3. Key Messaging Check:"
KEYWORDS=("crypto" "QA" "quality assurance" "testing" "Web3" "blockchain" "security" "audit")
for keyword in "${KEYWORDS[@]}"; do
  COUNT=$(grep -ri "$keyword" app/ components/ 2>/dev/null | wc -l)
  echo "   '$keyword': found $COUNT times"
done

# Check contact information
echo ""
echo "4. Contact Information:"
if grep -ri "email\|contact\|@" app/ components/ 2>/dev/null | grep -v "node_modules" | head -5; then
  echo "   ✅ Contact info found"
else
  echo "   ⚠️  No contact info detected"
fi

# Check for social links
echo ""
echo "5. Social Media Links:"
SOCIALS=("twitter" "linkedin" "github" "discord" "telegram")
for social in "${SOCIALS[@]}"; do
  if grep -ri "$social" app/ components/ public/ 2>/dev/null | grep -v "node_modules" > /dev/null; then
    echo "   ✅ $social"
  else
    echo "   ❌ $social not found"
  fi
done

# Check for CTAs
echo ""
echo "6. Call-to-Action Analysis:"
CTA_PATTERNS=("Book" "Contact" "Get Started" "Learn More" "Schedule" "Call")
for cta in "${CTA_PATTERNS[@]}"; do
  COUNT=$(grep -ri "$cta" app/ components/ 2>/dev/null | wc -l)
  if [ "$COUNT" -gt 0 ]; then
    echo "   '$cta': found $COUNT times"
  fi
done

# Check component structure
echo ""
echo "7. Component Structure:"
if [ -d "components" ]; then
  echo "   Components found:"
  ls -1 components/ 2>/dev/null | head -10
else
  echo "   ⚠️  No components directory"
fi

# Check for logo and branding
echo ""
echo "8. Branding Assets:"
ASSETS=("logo" "icon" "favicon")
for asset in "${ASSETS[@]}"; do
  FILES=$(find public app -type f -name "*${asset}*" 2>/dev/null)
  if [ -n "$FILES" ]; then
    echo "   ✅ $asset: $(echo "$FILES" | wc -l) file(s)"
  else
    echo "   ❌ $asset not found"
  fi
done

# Check for alt text in images
echo ""
echo "9. Image Accessibility:"
IMG_COMPONENTS=$(grep -r "Image\|img" app/ components/ 2>/dev/null | grep -v "node_modules" | wc -l)
ALT_TAGS=$(grep -r "alt=" app/ components/ 2>/dev/null | grep -v "node_modules" | wc -l)
echo "   Image components: $IMG_COMPONENTS"
echo "   Alt attributes: $ALT_TAGS"
if [ "$IMG_COMPONENTS" -gt 0 ] && [ "$ALT_TAGS" -lt "$IMG_COMPONENTS" ]; then
  echo "   ⚠️  Some images may be missing alt text"
fi

echo ""
echo "---"
echo "Ask Claude to analyze this content audit and provide recommendations for improving SEO, messaging, and accessibility for the Hexprove website."
