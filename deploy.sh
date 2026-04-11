#!/bin/bash
set -e

# ─── EnglishSpeakingVets - VPS Deploy Script ──────────────────────────────────
#
# SINGLE source of truth for deployment.
# Triggered automatically by: git push origin main (via GitHub Actions)
# Can also be run manually on VPS: bash deploy.sh
#
# Flow: git pull -> build (tsc + vite + prerender 203 pages) -> copy to nginx root
# ──────────────────────────────────────────────────────────────────────────────

echo "🚀 Starting Deployment..."

# 1. Pull latest code (forcing reset to prevent generated files like sitemap from blocking)
echo "📥 Pulling from GitHub..."
git fetch origin main
git reset --hard origin/main

# 2. Install frontend dependencies
echo "📦 Installing dependencies..."
cd web-app
npm ci --silent

# 3. Ensure Puppeteer Chrome is present (required for the prerender step)
#    No-op if already installed, safe to run on every deploy.
echo "🌐 Ensuring Puppeteer Chrome is installed..."
npx puppeteer browsers install chrome 2>/dev/null || true

# 4. Build (TypeScript compile + Vite bundle + postbuild: sitemap + prerender)
echo "🏗️  Building project (this includes prerendering all 203 pages)..."
npm run build

echo "✅ Frontend build complete."

# 5. Backend - refresh dependencies (contact form email relay only)
echo "🐍 Refreshing backend dependencies..."
cd ../api
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate
pip install -r requirements.txt --quiet

# 6. Copy prerendered output to the nginx-served root
echo "🚀 Copying build output to nginx root..."
cd ..
cp -r web-app/dist/* .

echo ""
echo "🎉 Deployment complete!"
echo "   Next: check Google Search Console and request indexing for key pages."
