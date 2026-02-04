#!/bin/bash

PROJECT_DIR="/Users/sino/Documents/Hexprove"
cd "$PROJECT_DIR" || exit 1

echo "=== Hexprove Status Report ==="
echo ""

# Check if coming soon is enabled
if [ -f ".env" ]; then
  COMING_SOON=$(grep NEXT_PUBLIC_COMING_SOON .env | cut -d '=' -f2)
  echo "Coming Soon Mode: $COMING_SOON"
else
  echo "Coming Soon Mode: .env not found"
fi

# Check dependencies
echo ""
echo "Dependencies:"
if [ -d "node_modules" ]; then
  echo "✅ node_modules installed"
else
  echo "❌ node_modules missing - run npm install"
fi

# Check for package.json
echo ""
echo "Project Info:"
if [ -f "package.json" ]; then
  echo "Project: $(grep '"name"' package.json | head -1 | cut -d '"' -f4)"
  echo "Framework: Next.js"
fi

# Check git status
echo ""
echo "Git Status:"
git status -s 2>/dev/null || echo "Not a git repository"

# List recent commits
echo ""
echo "Recent Commits:"
git log --oneline -3 2>/dev/null || echo "No git history"

# Check for TypeScript errors
echo ""
echo "TypeScript Check:"
if command -v npx &> /dev/null; then
  npx tsc --noEmit --pretty false 2>&1 | head -10
else
  echo "TypeScript not available"
fi

echo ""
echo "---"
echo "Ask Claude to analyze this status report and suggest next actions for the Hexprove website."
