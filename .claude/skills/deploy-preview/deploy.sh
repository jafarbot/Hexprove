#!/bin/bash

PROJECT_DIR="/Users/sino/Documents/Hexprove"
cd "$PROJECT_DIR" || exit 1

echo "=== Hexprove Deployment Checklist ==="
echo ""

# Environment variables check
echo "1. Environment Variables:"
if [ -f ".env" ]; then
  echo "   ✅ .env file exists"
  COMING_SOON=$(grep NEXT_PUBLIC_COMING_SOON .env | cut -d '=' -f2)
  echo "   Coming Soon Mode: $COMING_SOON"

  if [ "$COMING_SOON" = "true" ]; then
    echo "   ⚠️  WARNING: Coming soon page is ENABLED"
  else
    echo "   ✅ Coming soon page is disabled (full site will show)"
  fi
else
  echo "   ❌ .env file not found"
fi

# Build check
echo ""
echo "2. Build Test:"
echo "   Running production build..."
if npm run build > /tmp/hexprove-build.log 2>&1; then
  echo "   ✅ Build successful"
else
  echo "   ❌ Build failed - check errors below:"
  tail -20 /tmp/hexprove-build.log
fi

# TypeScript check
echo ""
echo "3. TypeScript Validation:"
if npx tsc --noEmit > /tmp/hexprove-tsc.log 2>&1; then
  echo "   ✅ No TypeScript errors"
else
  echo "   ❌ TypeScript errors found:"
  cat /tmp/hexprove-tsc.log | head -10
fi

# Dependencies check
echo ""
echo "4. Dependencies:"
if [ -d "node_modules" ]; then
  echo "   ✅ Dependencies installed"
else
  echo "   ❌ Run npm install"
fi

# Git status
echo ""
echo "5. Git Status:"
if git diff-index --quiet HEAD -- 2>/dev/null; then
  echo "   ✅ No uncommitted changes"
else
  echo "   ⚠️  Uncommitted changes detected:"
  git status -s
fi

# Check for critical files
echo ""
echo "6. Critical Files Check:"
FILES=("app/page.tsx" "app/layout.tsx" "public/logo.svg" "components/ContactForm.tsx")
for file in "${FILES[@]}"; do
  if [ -f "$file" ]; then
    echo "   ✅ $file"
  else
    echo "   ❌ $file missing"
  fi
done

# Image optimization check
echo ""
echo "7. Image Assets:"
if [ -d "public" ]; then
  IMAGE_COUNT=$(find public -type f \( -name "*.png" -o -name "*.jpg" -o -name "*.svg" \) | wc -l)
  echo "   Found $IMAGE_COUNT images in /public"

  # Check for large images
  LARGE_IMAGES=$(find public -type f \( -name "*.png" -o -name "*.jpg" \) -size +500k)
  if [ -n "$LARGE_IMAGES" ]; then
    echo "   ⚠️  Large images found (>500KB):"
    echo "$LARGE_IMAGES"
  else
    echo "   ✅ No oversized images detected"
  fi
fi

# SEO Meta Tags Check
echo ""
echo "8. SEO Check:"
if grep -q "metadata" app/layout.tsx 2>/dev/null; then
  echo "   ✅ Metadata export found in layout"
else
  echo "   ⚠️  No metadata export in layout.tsx"
fi

# Contact form check
echo ""
echo "9. Contact Form:"
if grep -q "ContactForm" app/page.tsx 2>/dev/null; then
  echo "   ✅ Contact form component present"
else
  echo "   ⚠️  Contact form not found on homepage"
fi

echo ""
echo "=== Deployment Readiness Summary ==="
echo ""
echo "---"
echo "Ask Claude to review this deployment checklist and confirm if Hexprove is ready to deploy, or identify issues that need to be fixed first."
