#!/bin/bash
set -e

# ─── Concurrency guard ────────────────────────────────────────────────────────
# Serialize deploys so a manual run and the GitHub Action (or two Actions) never
# run `npm ci` at the same time and wipe node_modules mid-build (caused real
# `tsc: not found` failures). Waits up to 15 min for any in-flight deploy, then
# proceeds; the lock auto-releases when this script exits (even on error).
exec 9>/tmp/esv-deploy.lock
if ! flock -w 900 9; then
    echo "❌ Another deploy held the lock for >15min. Aborting to avoid a race."
    exit 1
fi

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

# Restart the API so backend code changes take effect (gunicorn does not auto-reload).
sudo -n systemctl restart vet-api 2>/dev/null || echo "⚠️  vet-api restart skipped (run 'systemctl restart vet-api' manually if the API changed)"

# 6. Copy prerendered output to the nginx-served root
echo "🚀 Copying build output to nginx root..."
cd ..
cp -r web-app/dist/* .

# 7. Verify the live site actually serves after the swap (fail loud, not silent).
echo "🔎 Verifying live site responds..."
if curl -fsS -o /dev/null --max-time 25 https://englishspeakinggermany.online/; then
    echo "✅ Live site responding (HTTP 200)."
else
    echo "❌ Post-deploy check FAILED: site did not return 200. Investigate now."
    exit 1
fi

# 8. Notify IndexNow (Bing/Yandex/Seznam) of the current URL set. Non-fatal.
echo "🔔 Submitting URLs to IndexNow..."
node web-app/scripts/indexnow-submit.js || echo "IndexNow submit skipped (non-fatal)"

echo ""
echo "🎉 Deployment complete!"
echo "   Next: check Google Search Console and request indexing for key pages."
