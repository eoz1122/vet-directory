#!/bin/bash
#
# SEO smoke test: verifies that canonical URLs are served directly (HTTP 200)
# and are NOT 301-redirected to a trailing-slash variant.
#
# Background: the sitemap and every <link rel="canonical"> use the no-trailing-slash
# form (e.g. /vets/berlin). If nginx 301-redirects those to /vets/berlin/, Google
# files them under "Page with redirect" and refuses to index them. This test guards
# against that regression.
#
# Usage:
#   ./seo-smoke-test.sh                       # tests live site
#   BASE_URL=https://staging.example ./seo-smoke-test.sh
#
set -u

BASE_URL="${BASE_URL:-https://englishspeakinggermany.online}"
UA="Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"

# Representative paths that MUST resolve with a 200 (no redirect), one per page type.
PATHS=(
  "/"
  "/vets/berlin"
  "/vets/berlin/prenzlauer-berg"
  "/blog"
  "/blog/best-dog-parks-berlin"
  "/about"
  "/guides/emergency-vets-berlin"
)

echo "SEO smoke test against: $BASE_URL"
echo "Expecting HTTP 200 (no 3xx redirect) for canonical no-trailing-slash URLs."
echo "------------------------------------------------------------------"

fail=0
for p in "${PATHS[@]}"; do
  read -r code redirect < <(curl -s -o /dev/null -A "$UA" \
    -w "%{http_code} %{redirect_url}" "${BASE_URL}${p}")
  if [ "$code" = "200" ]; then
    printf "  PASS  %-3s  %s\n" "$code" "$p"
  else
    printf "  FAIL  %-3s  %s  -> %s\n" "$code" "$p" "${redirect:-<none>}"
    fail=1
  fi
done

echo "------------------------------------------------------------------"
if [ "$fail" -eq 0 ]; then
  echo "RESULT: PASS - all canonical URLs serve 200 with no redirect."
else
  echo "RESULT: FAIL - one or more canonical URLs redirect (Google will mark them"
  echo "        'Page with redirect' and not index them). Fix nginx try_files order."
fi
exit "$fail"
