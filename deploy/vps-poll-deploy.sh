#!/bin/bash
# Pull-based deploy poller.
# Installed on the VPS at /usr/local/bin/esv-poll-deploy.sh and invoked by the
# esv-deploy.timer systemd timer every 2 minutes. It fetches origin/main and runs
# deploy.sh only when the remote has new commits.
#
# Why pull instead of the old push -> GitHub Action -> SSH model:
# GitHub-hosted runner IPs are dropped at this provider's network edge (inbound
# SSH to the VPS times out intermittently), while outbound VPS -> GitHub is
# reliable. Polling from the VPS removes the unreliable inbound dependency.
set -e
cd /home/englishspeaking/englishspeakinggermany.online
git fetch origin main -q
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)
if [ "$LOCAL" != "$REMOTE" ]; then
    echo "Deploying ${REMOTE:0:7} (was ${LOCAL:0:7})"
    bash deploy.sh
else
    echo "Up to date (${LOCAL:0:7})"
fi
