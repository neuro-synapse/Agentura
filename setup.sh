#!/bin/bash
set -e

echo "==> Installing dependencies..."
npm install

echo "==> Building site..."
npm run build

echo ""
echo "✅ Agentura is ready!"
echo ""
echo "  Dev server:  npm run dev"
echo "  Deploy:      npx wrangler pages deploy dist"
echo ""
