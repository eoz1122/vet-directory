#!/bin/bash
set -euo pipefail

SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)
REPO_DIR="${ESV_REPO_DIR:-$(cd "${SCRIPT_DIR}/.." && pwd)}"
DEPLOY_MARKER="${ESV_DEPLOY_MARKER:-${HOME}/.esv-last-successful-deploy}"
DEPLOYED_SHA=$(git -C "${REPO_DIR}" rev-parse HEAD)
MARKER_DIRECTORY=$(dirname -- "${DEPLOY_MARKER}")

mkdir -p "${MARKER_DIRECTORY}"
TEMP_MARKER=$(mktemp "${DEPLOY_MARKER}.tmp.XXXXXX")

cleanup_marker() {
    if [ -e "${TEMP_MARKER}" ]; then
        unlink "${TEMP_MARKER}"
    fi
}
trap cleanup_marker EXIT

printf '%s\n' "${DEPLOYED_SHA}" > "${TEMP_MARKER}"
chmod 600 "${TEMP_MARKER}"
mv "${TEMP_MARKER}" "${DEPLOY_MARKER}"
trap - EXIT

echo "Recorded successful deployment ${DEPLOYED_SHA:0:7}"
