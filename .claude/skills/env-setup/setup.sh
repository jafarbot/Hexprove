#!/bin/bash

PROJECT_DIR="/Users/sino/Documents/Hexprove"
cd "$PROJECT_DIR" || exit 1

echo "=== Hexprove Environment Setup ==="
echo ""

# Check for .env.example
if [ -f ".env.example" ]; then
  echo "✅ .env.example found"
  echo ""
  echo "Contents of .env.example:"
  echo "---"
  cat .env.example
  echo "---"
else
  echo "⚠️  .env.example not found"
  echo ""
  echo "Creating default .env.example:"
  cat > .env.example << 'EOF'
# Hexprove Environment Variables

# Coming Soon Page Toggle
# Set to "true" to show coming soon page, "false" to show full website
NEXT_PUBLIC_COMING_SOON=true

# Domain Configuration
NEXT_PUBLIC_DOMAIN=hexprove.io

# Contact Form (optional - for future email integration)
# SMTP_HOST=
# SMTP_PORT=
# SMTP_USER=
# SMTP_PASS=
# CONTACT_EMAIL=hello@hexprove.io
EOF
  echo "✅ Created .env.example"
fi

# Check for .env
echo ""
if [ -f ".env" ]; then
  echo "✅ .env file exists"
  echo ""
  echo "Current environment variables:"
  echo "---"
  cat .env
  echo "---"
else
  echo "⚠️  .env file not found"
  echo ""
  echo "Would you like to create .env from .env.example? (This needs manual confirmation)"
  echo ""
  echo "To create .env, run:"
  echo "  cp .env.example .env"
fi

# Validate environment variables
echo ""
echo "Environment Variable Validation:"
if [ -f ".env" ]; then
  # Check NEXT_PUBLIC_COMING_SOON
  if grep -q "NEXT_PUBLIC_COMING_SOON" .env; then
    COMING_SOON=$(grep NEXT_PUBLIC_COMING_SOON .env | cut -d '=' -f2)
    echo "  ✅ NEXT_PUBLIC_COMING_SOON = $COMING_SOON"

    if [ "$COMING_SOON" = "true" ]; then
      echo "     ⚠️  Coming soon page is ENABLED (visitors will see placeholder)"
    else
      echo "     ✅ Coming soon page is DISABLED (full site visible)"
    fi
  else
    echo "  ❌ NEXT_PUBLIC_COMING_SOON not set"
  fi

  # Check domain
  if grep -q "NEXT_PUBLIC_DOMAIN" .env; then
    DOMAIN=$(grep NEXT_PUBLIC_DOMAIN .env | cut -d '=' -f2)
    echo "  ✅ NEXT_PUBLIC_DOMAIN = $DOMAIN"
  else
    echo "  ⚠️  NEXT_PUBLIC_DOMAIN not set (optional)"
  fi
fi

# Check .gitignore
echo ""
echo "Security Check:"
if [ -f ".gitignore" ]; then
  if grep -q "^\.env$" .gitignore; then
    echo "  ✅ .env is in .gitignore (not committed to git)"
  else
    echo "  ❌ .env should be added to .gitignore"
  fi
else
  echo "  ⚠️  .gitignore not found"
fi

echo ""
echo "---"
echo "Ask Claude to review the environment setup and help configure any missing variables for the Hexprove website."
