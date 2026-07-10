# Architectural Decisions Log

This document records the major architectural choices, conventions, and security boundaries established for the **EnglishSpeakingVets** (Vet Directory) project.

As per the Global AI Directives, every entry here prevents logic drift and serves as the source of truth for AI agents and human developers. Every entry MUST include an ISO 8601 timestamp in its heading.

---

## 2026-03-18T02:00:00+01:00 — Project Initialization Constraints

**Context:** The application was built as a standalone Vite/React SPA with a small Flask backend for contact form delivery. Security and architectural gaps were identified.

**Decisions:**
1.  **Backend Runtime:** The backend relies on Flask with Gunicorn. It serves exclusively for delivering emails via SMTP.
2.  **No Server-Side State:** The entire data source is a static JSON file (`vets.json`). Data ingestion is handled via separate Python scripts and exported to the web-app. The API does not have database access.
3.  **Client-Side Admin:** The `/admin` route allows in-browser filtering and exports of the `vets.json` file. The local-only basic auth was moved to an environment variable (`VITE_ADMIN_CODE`) to prevent shipping the password in source control.
4.  **Security Boundaries:**
    *   **Nginx:** Reverse proxies to Gunicorn. Blocks unencrypted traffic.
    *   **API:** Flask handles input validation, XSS sanitization, CORS origin restrictions, and rate-limiting (`flask-limiter`, 5 req/min on `/api/contact`).
    *   **System:** The `vet-api.service` runs as a dedicated non-root user (`englishspeaking:www-data`) with strict `systemd` isolation (`NoNewPrivileges`, `ProtectSystem=strict`, `PrivateTmp`).

**Trade-offs:** Client-side admin with an env-var password is not fully secure for a public environment, but it suffices since the admin portal requires no backend write access and relies merely on manual JSON exports.

---

## 2026-03-18T02:30:00+01:00 — Testing Framework Selection

**Context:** The codebase lacked any automated testing. We need a boring, stable, and fast testing setup to adhere to the TDD Iron Law.

**Decisions:**
1.  **Backend Testing:** Use `pytest` for the Python API, specifically testing the input validation logic and rate limiting handling.
2.  **Frontend Testing:** Use `vitest` + `jsdom` + `@testing-library/react` for the React application. Vitest is the native choice for Vite-based projects and provides seamless ESM support.
3.  **TDD Policy:** No production logic changes (especially to critical modules like distance calculations or API validation) without writing failing tests first.

---

## 2026-06-21T17:30:00+02:00 — URL Canonicalization: No Trailing Slash

**Context:** Google Search Console showed 50 pages as "Page with redirect" + 15 as "Alternative page with proper canonical" (≈68 of 115 not-indexed URLs). Root cause: the sitemap and all 35 `<link rel="canonical">` tags use the no-trailing-slash form (`/vets/berlin`), but nginx 301-redirected those to `/vets/berlin/` because the prerendered output is a directory (`/vets/berlin/index.html`), and nginx auto-appends a slash when `try_files` matches a directory before a file.

**Decision:** Standardize on the **no-trailing-slash** canonical form (the form the entire codebase already uses). Fix at the server, not in 60+ files: prepend `$uri/index.html` to nginx `try_files` so the prerendered file is matched first and served with HTTP 200, eliminating the directory trailing-slash redirect. Live change (in `/etc/nginx/sites-available/englishspeakinggermany.online`, web root `/home/englishspeaking/englishspeakinggermany.online`):
`try_files $uri $uri/ /index.html;` → `try_files $uri/index.html $uri $uri/ /index.html;`
`$uri` is kept in the list because this live server block has no separate static-asset `location`, so JS/CSS also resolve through this directive.

**Trade-offs:** Both `/vets/berlin` and `/vets/berlin/` now return 200, but the canonical tag and sitemap point only to the no-slash form, so Google consolidates correctly. Rejected the alternative (rewrite every canonical + sitemap loc + og:url to trailing slash) as a 60-file change that would chase a server quirk instead of fixing it.

**Verification:** `web-app/scripts/seo-smoke-test.sh` asserts canonical URLs return 200 (not 3xx). Confirmed RED pre-fix (6/7 paths 301), GREEN post-fix (7/7 = 200) on 2026-06-21. Asset load + per-page prerendered titles re-confirmed.

**Applied:** Live on 2026-06-21 via `nginx -t && systemctl reload nginx` (graceful, zero downtime). The deploy pipeline (`deploy.sh`) does NOT manage nginx config, so this was a manual server edit; the repo's `web-app/nginx_site.conf` is a stale reference and does not match the live config (different root, no asset block).

**Rollback:** `cp /etc/nginx/sites-available/englishspeakinggermany.online.bak-20260621 /etc/nginx/sites-available/englishspeakinggermany.online && nginx -t && systemctl reload nginx`.

---

## 2026-06-21T21:00:00+02:00 — Single Slug Contract (city/district URLs)

**Context:** A full live crawl of all 211 sitemap URLs found ~9 pages broken + 25 canonical mismatches. Root cause was three divergent slug implementations plus lossy reverse-slug matching:
- `DistrictVets` matched by reversing the slug (`hyphens -> spaces`), which cannot undo `/`, `()`, `&`. Districts like "Friedrichshain / Others" produced a 3-segment path that matched no route -> homepage fallback (6 pages, no H1, ~47 words).
- `CityVets` compared the hyphenated slug directly to `vet.city.toLowerCase()` (spaces) -> every multi-word city ("Bad Homburg") rendered the noindex "City Not Found" page (3 pages).
- The sitemap percent-encoded unicode (`/vets/k%C3%B6nigstein`) while canonicals used raw UTF-8 (`/vets/königstein`) -> ~25 "Alternative page with proper canonical" flags.

**Decision:** One canonical `slugify()` in `src/utils/url.ts` is the single source of truth. Matching is always `slugify(candidate) === param` — never reverse-slug. The two build scripts (`generate-sitemap.js`, `prerender.js`) mirror the exact algorithm; `src/utils/url.test.ts` locks the contract. Display names are taken from the real data (`vet.city`/`vet.district`), falling back to `titleCaseSlug()`. Sitemap now emits raw UTF-8 so `<loc>` equals `<link rel="canonical">` byte-for-byte.

**Trade-offs:** Slug logic is duplicated across the TS app and the plain-JS build scripts (tsconfig has no `allowJs`, and node cannot import `.ts`). Accepted because the contract test + end-to-end crawl guard against drift. The alternative (a shared JS module imported by both) was rejected as more fragile under the current bundler/TS setup.

**Verification:** vitest 12/12, `tsc -b` clean. Post-deploy crawl confirmed the 6 districts + 3 cities now return 200 with unique titles/H1/~290-470 words, and a previously-working page was unchanged (no regression). Ships through the normal git -> deploy pipeline (no manual step).

---

## 2026-06-22T22:50:00+02:00 — Deploy model: GitHub-push-SSH -> VPS pull poller

**Context:** The push -> GitHub Action -> `appleboy/ssh-action` deploy failed repeatedly. Diagnosis from VPS logs: GitHub-hosted runner SYN packets to the VPS never reach sshd (no auth log, no UFW entry) and the action reports `dial tcp: i/o timeout`, while SSH from a normal IP and the VPS's own outbound traffic both work fine. Conclusion: inbound GitHub-runner -> VPS:22 is dropped at the **provider network edge** (not fixable from inside the box). Earlier this also manifested as silent staleness (a push "succeeds" but the red Action means the site never updated) and as `npm ci` races (a manual deploy overlapping an Action wiped node_modules -> `tsc: not found`).

**Decision:** Invert the deploy to **pull-based**, since outbound VPS -> GitHub is reliable.
- VPS systemd timer `esv-deploy.timer` runs `/usr/local/bin/esv-poll-deploy.sh` every 2 min; it `git fetch`es origin/main and runs `deploy.sh` only on change.
- `deploy.sh` hardened: `flock` serializes deploys (no more `npm ci` races) and a post-deploy `curl` liveness check fails loud.
- Host one-time setup: `git config --system --add safe.directory <repo>` (service runs as root; repo owned by `englishspeaking`) and `Environment=HOME=/root` in the unit.
- The GitHub Action is reduced to a manual-only no-op so pushes stop failing on the dead SSH step.
- Reference copies of the units/script live in `deploy/`.

**Trade-offs:** Up to ~2 min latency between push and deploy (fine; the prerender already takes ~3 min). Deploy now depends on the VPS timer rather than CI; mitigated by the units being version-controlled in `deploy/` for quick rebuild.

**Verification:** The timer/service deployed `4bd4a64` end-to-end (the commit the broken Action never shipped); server HEAD confirmed. `deploy.sh` liveness check passed.

**Rollback:** `systemctl disable --now esv-deploy.timer` reverts to manual `bash deploy.sh`; the old push->SSH workflow remains in git history.

---

## 2026-06-23T03:15:00+02:00 — Community "confirm English-speaking" (email relay, no DB)

**Context:** Wanted a positive community-verification signal (the directory is community-sourced) without adding a database, staying consistent with the "no server-side state" decision. At current traffic, live confirm-counts would mostly read "0", so deferred storage.

**Decision:** One-click "Confirm they speak English" button on vet cards posts to a new `POST /api/confirm-vet` (Flask), which validates + sanitizes + honeypots + rate-limits (10/min) and emails the admin; the admin then bumps `community_status`/`last_scanned` in `vets.json`. Mirrors the existing `submit_vet`/`report_issue` email-relay pattern. Added a `company` honeypot to the contact form too, and a shared `send_email` helper (DRY). TDD: 11 backend tests.

**Deploy note (gotcha):** `deploy.sh` now `systemctl restart vet-api` so backend code changes take effect (gunicorn does not auto-reload). BUT `deploy.sh` git-resets itself at step 1, so a change *to deploy.sh* lands a deploy late (bash already buffered the old script). The restart line therefore first took effect one deploy after it was added; the initial rollout needed a manual `systemctl restart vet-api`.

**Trade-offs:** No live social-proof counts (Option B / SQLite deferred until traffic justifies it). Anonymous confirmations are spammable; mitigated by rate-limit + honeypot, and they only *notify* the admin (no automatic data change).

**Verification:** Backend pytest 11/11; live endpoint returns 400 on bad input and 200 on honeypot (no email); button renders on prerendered city/district pages.

---

## 2026-06-23T00:30:00+02:00 — Evergreen blog URLs (drop -2025) + 301 redirects

**Context:** 12 blog posts had year-stamped slugs (`/blog/...-2025`) that read as permanently dated. The April SEO audit recommended evergreen URLs.

**Decision:** Rename all 12 to drop `-2025` and 301-redirect the old URLs so indexed equity and inbound links survive. Updated in lockstep so sitemap loc = `<link rel="canonical">` = `og:url` = Article schema url = App.tsx route = internal `<Link>` refs (the same agreement that the slug-contract fix established for city/district pages — a mismatch recreates the "Page with redirect" / "Alternative page" indexing failures). Redirects are exact-match nginx rules (`location = /blog/<old> { return 301 .../<new>; }`) placed before `location /`, so they intercept before try_files. Kept the no-trailing-slash convention.

**Trade-offs:** Redirects live only in the hand-maintained nginx config (not deploy-managed), so a VPS rebuild must reapply them from `web-app/nginx_site.conf`. `datePublished` left at the real historical date.

**Verification:** `web-app/scripts/seo-smoke-test.sh` extended — new URLs must 200, all 12 retired URLs must 301 to the evergreen target. Confirmed PASS live. Orphaned `-2025` prerendered dirs removed from the web root.

**Follow-up:** Resubmit the sitemap in Google Search Console so the new URLs are recrawled and the redirects validated.

## 2026-07-10T14:00:00+02:00 — IndexNow for Bing/Yandex Recrawl

**Context:** Google indexing of the directory's long tail is throttled by processing lag and thin-page authority, which more code cannot fix. IndexNow is a free, legitimate lever for the non-Google engines (Bing, Yandex, Seznam) that honor push notifications.

**Decisions:**
1.  **Key file:** `web-app/public/fcf5c3b58393e18fa2aa5f59fede4a13.txt` (bare 32-hex key, no newline). Ships in the build to the web root and is served at `https://englishspeakinggermany.online/<key>.txt` as IndexNow's ownership proof. Public by design, not a secret.
2.  **Submit script:** `web-app/scripts/indexnow-submit.js` auto-detects the key file, reads `public/sitemap.xml`, and bulk-POSTs all URLs to `api.indexnow.org/indexnow`. Non-fatal: logs and exits 0 on any API error.
3.  **Deploy hook:** `deploy.sh` step 8 runs the submit after the liveness check, so every deploy nudges the non-Google engines automatically.

**Trade-offs:** Google ignores IndexNow entirely, so this does not move the primary GSC numbers; it only serves Bing/Yandex traffic (~3-5% of search). First submission returns `403 SiteVerificationNotCompleted` until the engine fetches the key file async; it self-heals on retry (confirmed HTTP 200 for 222 URLs on 2026-07-10).
