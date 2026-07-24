#!/bin/bash
#
# SEO smoke test:
#   1. canonical URLs are served directly (HTTP 200), NOT 301-redirected to a
#      trailing-slash variant (the "Page with redirect" indexing regression).
#   2. retired URLs and both trailing variants 301 directly to their replacement
#      (so old inbound links / indexed pages keep their equity after the migration).
#
# Usage:
#   ./seo-smoke-test.sh                       # tests live site
#   BASE_URL=https://staging.example ./seo-smoke-test.sh
#
set -u

BASE_URL="${BASE_URL:-https://englishspeakinggermany.online}"
UA="Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"

# Canonical paths that MUST resolve with a 200 (no redirect), one per page type.
PATHS=(
  "/"
  "/vets/berlin"
  "/vets/berlin/prenzlauer-berg"
  "/blog"
  "/blog/best-dog-parks-berlin"
  "/blog/moving-to-germany-with-pet"
  "/blog/public-transport-with-dogs-berlin"
  "/blog/pet-insurance-germany"
  "/blog/best-dog-food-germany"
  "/blog/best-cat-food-germany"
  "/about"
  "/guides/emergency-vets-berlin"
)

# Retired URLs that MUST 301 directly to their replacement.
REDIRECTS=(
  "/blog/moving-to-germany-with-pet-2025|/blog/moving-to-germany-with-pet"
  "/blog/cat-registration-germany-2025|/blog/cat-registration-germany"
  "/blog/eu-pet-passport-germany-2025|/blog/eu-pet-passport-germany"
  "/blog/hundesteuer-dog-tax-germany-2025|/blog/hundesteuer-dog-tax-germany"
  "/blog/pet-friendly-apartments-germany-2025|/blog/pet-friendly-apartments-germany"
  "/blog/public-transport-with-dogs-berlin-2025|/blog/public-transport-with-dogs-berlin"
  "/blog/public-transport-with-dogs-hamburg-2025|/blog/public-transport-with-dogs-hamburg"
  "/blog/public-transport-with-dogs-frankfurt-2025|/blog/public-transport-with-dogs-frankfurt"
  "/blog/public-transport-with-dogs-munich-2025|/blog/public-transport-with-dogs-munich"
  "/blog/public-transport-with-dogs-stuttgart-2025|/blog/public-transport-with-dogs-stuttgart"
  "/blog/pet-sitting-germany-2025|/blog/pet-sitting-germany"
  "/blog/pet-insurance-germany-2025|/blog/pet-insurance-germany"
  "/blog/best-pet-food-germany-dinner-for-dogs|/blog/best-dog-food-germany"
  "/blog/public-transport-dogs-hamburg|/blog/public-transport-with-dogs-hamburg"
  "/blog/public-transport-dogs-munich-mvv|/blog/public-transport-with-dogs-munich"
  "/blog/public-transport-dogs-frankfurt-rmv|/blog/public-transport-with-dogs-frankfurt"
  "/blog/public-transport-dogs-stuttgart|/blog/public-transport-with-dogs-stuttgart"
  "/guides/emergency-vets-hamburg|/blog/emergency-vet-hamburg-english"
  "/blog/emergency-vet-berlin-english|/guides/emergency-vets-berlin"
  "/vets/nuremberg/schweinau|/vets/nuremberg"
  "/vets/frankfurt/am-nordpark-10,-60437-frankfurt-am-main|/vets/frankfurt/am-nordpark-10-60437-frankfurt-am-main"
)

# Literal placeholders discovered from the retired SearchAction schema.
SEARCH_TEMPLATE_REDIRECTS=(
  "/?s=%7Bsearch_term_string%7D"
  "/?q=%7Bsearch_term_string%7D"
)

# Real homepage searches must remain usable and must not match the rule above.
SEARCH_QUERY_PASSTHROUGHS=(
  "/?s=berlin"
  "/?q=hamburg"
)

echo "SEO smoke test against: $BASE_URL"
echo "------------------------------------------------------------------"
fail=0

echo "Canonical URLs must serve 200 (no redirect):"
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

echo ""
echo "Retired URLs must 301 directly to their replacements:"
for pair in "${REDIRECTS[@]}"; do
  old="${pair%%|*}"; new="${pair##*|}"
  for suffix in "" "/"; do
    request_path="${old}${suffix}"
    read -r code redirect < <(curl -s -o /dev/null -A "$UA" \
      -w "%{http_code} %{redirect_url}" "${BASE_URL}${request_path}")
    if [ "$code" = "301" ] && [[ "$redirect" == *"${new}" ]]; then
      printf "  PASS  301  %s\n" "$request_path"
    else
      printf "  FAIL  %-3s  %s  -> %s (want 301 -> %s)\n" "$code" "$request_path" "${redirect:-<none>}" "$new"
      fail=1
    fi
  done
done

echo ""
echo "Retired search placeholders must redirect without catching real searches:"
for request_path in "${SEARCH_TEMPLATE_REDIRECTS[@]}"; do
  read -r code redirect < <(curl -s -o /dev/null -A "$UA" \
    -w "%{http_code} %{redirect_url}" "${BASE_URL}${request_path}")
  if [ "$code" = "301" ] && [ "$redirect" = "${BASE_URL}/" ]; then
    printf "  PASS  301  %s\n" "$request_path"
  else
    printf "  FAIL  %-3s  %s  -> %s (want 301 -> %s/)\n" "$code" "$request_path" "${redirect:-<none>}" "$BASE_URL"
    fail=1
  fi
done

for request_path in "${SEARCH_QUERY_PASSTHROUGHS[@]}"; do
  read -r code redirect < <(curl -s -o /dev/null -A "$UA" \
    -w "%{http_code} %{redirect_url}" "${BASE_URL}${request_path}")
  if [ "$code" = "200" ]; then
    printf "  PASS  200  %s\n" "$request_path"
  else
    printf "  FAIL  %-3s  %s  -> %s (want 200)\n" "$code" "$request_path" "${redirect:-<none>}"
    fail=1
  fi
done

echo "------------------------------------------------------------------"
if [ "$fail" -eq 0 ]; then
  echo "RESULT: PASS - canonical URLs serve 200 and retired URLs 301 correctly."
else
  echo "RESULT: FAIL - see failing rows above."
fi
exit "$fail"
