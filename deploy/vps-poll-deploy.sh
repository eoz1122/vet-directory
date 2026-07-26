#!/bin/bash
# Pull-based deploy poller.
# Installed on the VPS at /usr/local/bin/esv-poll-deploy.sh and invoked by the
# esv-deploy.timer systemd timer every 2 minutes. It fetches origin/main and runs
# deploy.sh until that commit has completed a successful deployment.
#
# Why pull instead of the old push -> GitHub Action -> SSH model:
# GitHub-hosted runner IPs are dropped at this provider's network edge (inbound
# SSH to the VPS times out intermittently), while outbound VPS -> GitHub is
# reliable. Polling from the VPS removes the unreliable inbound dependency.
set -euo pipefail

REPO_DIR="${ESV_REPO_DIR:-/home/englishspeaking/englishspeakinggermany.online}"
DEPLOY_MARKER="${ESV_DEPLOY_MARKER:-${HOME}/.esv-last-successful-deploy}"

cd "${REPO_DIR}"
git fetch origin main -q
REMOTE=$(git rev-parse origin/main)

DEPLOYED=""
if [ -r "${DEPLOY_MARKER}" ]; then
    DEPLOYED=$(tr -d '\r\n' < "${DEPLOY_MARKER}")
fi
if [[ ! "${DEPLOYED}" =~ ^[0-9a-f]{40}$ ]]; then
    DEPLOYED=""
fi

if [ "${DEPLOYED}" != "${REMOTE}" ]; then
    PREVIOUS="${DEPLOYED:0:7}"
    echo "Deploying ${REMOTE:0:7} (last successful ${PREVIOUS:-none})"
    ESV_REPO_DIR="${REPO_DIR}" ESV_DEPLOY_MARKER="${DEPLOY_MARKER}" bash deploy.sh
else
    echo "Up to date (${DEPLOYED:0:7})"
fi
