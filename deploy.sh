#!/bin/bash
set -e

# ─── Concurrency guard ────────────────────────────────────────────────────────
# Serialize deploys so a manual run and the GitHub Action (or two Actions) never
# run `npm ci` at the same time and wipe node_modules mid-build (caused real
# `tsc: not found` failures). Waits up to 15 min for any in-flight deploy, then
# proceeds; the lock auto-releases when this script exits (even on error).
# Lock lives in the deploy user's home, not /tmp: a stale root-owned /tmp lock
# blocked the first non-root deploy (Permission denied) after the least-privilege
# switch on 2026-07-11.
exec 9>"${HOME}/.esv-deploy.lock"
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

# A source-root server would otherwise keep serving the old files after release
# publishing. Require the reviewed, one-time Nginx migration before auto-deploys.
if ! sudo -n /usr/local/sbin/esv-validate-public-root; then
    echo 'Public-root migration is required. Follow deploy/security-rollout.md before deploying.'
    exit 1
fi

verify_private_paths() {
    for private_path in /.git/config /.env /web-app/vets-database-internal.csv /api/main.py; do
        status=$(curl -sS -o /dev/null -w '%{http_code}' --head --max-time 10 "https://englishspeakinggermany.online${private_path}") || return 1
        case "$status" in 403|404) ;; *) echo 'Private-path live check failed.'; return 1 ;; esac
    done
}
verify_private_paths

verify_public_release() {
    local expected_release actual_release
    IFS= read -r expected_release < public-site/esv-release-id.txt || return 1
    [[ "$expected_release" =~ ^[0-9a-f]{32}$ ]] || return 1
    actual_release=$(curl -fsS --max-time 10 https://englishspeakinggermany.online/esv-release-id.txt) || return 1
    [ "$actual_release" = "$expected_release" ]
}
verify_public_release || { echo 'Nginx is not serving the current public release.'; exit 1; }

# 1. Pull latest code (forcing reset to prevent generated files like sitemap from blocking)
echo "📥 Pulling from GitHub..."
git fetch origin main
git reset --hard origin/main

# 2. Install frontend dependencies
echo "📦 Installing dependencies..."
cd web-app
npm ci --silent

# Reject regressions before touching the live release.
npm run test
npm run lint

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
pip install -r requirements-dev.txt --quiet
python -m pytest -q tests
python -m pytest -q ../deploy ../scripts/maintenance

# 6. Publish build output only. Nginx must point at the public-site symlink.
echo "🚀 Publishing isolated static release..."
cd ..
python deploy/publish-static.py
verify_public_release || { echo 'Static publication could not be verified; API not restarted.'; exit 1; }

# Only restart the API after a successful static publication.
sudo -n systemctl restart vet-api
verify_private_paths

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

# 9. Record success only after the build, copy and live health check complete.
echo "📝 Recording successful deployment..."
bash deploy/record-deploy-success.sh

echo ""
echo "🎉 Deployment complete!"
echo "   Next: check Google Search Console and request indexing for key pages."
