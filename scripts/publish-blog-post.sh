#!/bin/bash
# publish-blog-post.sh
# Usage: ./scripts/publish-blog-post.sh
# Triggered by cron on Monday mornings to build, prerender, and deploy.
# 
# Cron config (add via: crontab -e):
# 0 8 * * 1 /path/to/project/scripts/publish-blog-post.sh >> /path/to/project/logs/publish.log 2>&1

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
WEB_APP="$PROJECT_ROOT/web-app"
LOG="$PROJECT_ROOT/logs/publish.log"
DATE=$(date '+%Y-%m-%dT%H:%M:%S')

mkdir -p "$PROJECT_ROOT/logs"
echo "[$DATE] Starting publish pipeline..." | tee -a "$LOG"

# 1. Pull latest changes
cd "$PROJECT_ROOT"
git pull origin main >> "$LOG" 2>&1
echo "[$DATE] Git pull complete" | tee -a "$LOG"

# 2. Install any new dependencies
cd "$WEB_APP"
npm ci >> "$LOG" 2>&1

# 3. Build (includes postbuild: sitemap + export-db + prerender)
echo "[$DATE] Building..." | tee -a "$LOG"
npm run build >> "$LOG" 2>&1
echo "[$DATE] Build complete" | tee -a "$LOG"

# 4. Deploy to VPS (rsync dist to nginx root)
echo "[$DATE] Deploying to VPS..." | tee -a "$LOG"

# Load VPS config from .env if present
if [ -f "$PROJECT_ROOT/.env.deploy" ]; then
    source "$PROJECT_ROOT/.env.deploy"
fi

# VPS_USER, VPS_HOST, VPS_APP_PATH must be set (either from .env.deploy or environment)
if [ -z "$VPS_USER" ] || [ -z "$VPS_HOST" ] || [ -z "$VPS_APP_PATH" ]; then
    echo "[$DATE] ERROR: VPS_USER, VPS_HOST, or VPS_APP_PATH not set. Skipping deploy." | tee -a "$LOG"
    exit 1
fi

rsync -avz \
    --delete \
    --exclude=".git" \
    "$WEB_APP/dist/" \
    "$VPS_USER@$VPS_HOST:$VPS_APP_PATH/" \
    >> "$LOG" 2>&1

echo "[$DATE] Deploy complete. Site is live." | tee -a "$LOG"

# 5. Verify (lightweight curl check on the homepage)
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://englishspeakinggermany.online")
if [ "$HTTP_STATUS" = "200" ]; then
    echo "[$DATE] Site health check: OK (HTTP $HTTP_STATUS)" | tee -a "$LOG"
else
    echo "[$DATE] WARNING: Site health check returned HTTP $HTTP_STATUS" | tee -a "$LOG"
fi

echo "[$DATE] Publish pipeline finished." | tee -a "$LOG"
