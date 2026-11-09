# Security release gate

## Status and rollback baseline

Prepared locally on 2026-11-09. Not applied to the VPS. The previous working
application commit is `e4dbb4726a05aa8f4f7e874e33d43a9c2cdb210e`.
Do not push this change to main until Ali approves the local preview.

## One-time migration, after preview approval

1. Pause `esv-deploy.timer` and verify no deploy is running. Retain the current
   active Nginx configuration as a timestamped backup outside the public root.
2. On the VPS, prepare the approved checkout. Run the frontend tests, lint,
   production build and API tests. Install the matching Puppeteer browser if the
   build runtime requests it. Check the prerender and sitemap totals.
3. Run `api/venv/bin/python deploy/publish-static.py` from the repository root.
   Verify `public-site/index.html` and representative generated routes exist.
   Verify the public `esv-release-id.txt` identity is present too.
   This publishes build output only; it does not copy source or runtime logs.
4. As the operator, install `deploy/validate-public-root.py` as root-owned,
   non-deploy-user-writable `/usr/local/sbin/esv-validate-public-root` (mode 0755).
   Permit the deploy user to sudo only this helper, alongside the existing narrow
   `systemctl restart vet-api` permission. The helper runs `nginx -T`, validates
   the target TLS blocks and included locations, and never prints the config dump.
   Install the reviewed `web-app/nginx_site.conf` as the root-owned server config.
   Copy the approved committed `api/nginx_vet_api.conf` into root-owned
   `/etc/nginx/snippets/esv-api.conf` (mode 0644, not deploy-user-writable).
   Do not point Nginx at a mutable checkout file or copy unreviewed working-tree
   changes into the privileged control plane. Both the snippet and its parent
   directory must be operator-owned and non-writable by the deploy account.
   Confirm certificate paths and other local settings
   match the saved live configuration. Run `sudo nginx -t` before reloading.
5. Reload Nginx, run the validation helper, then verify the homepage, hashed assets,
   sitemap, `/api/health`, directory filters and consent controls.
   Check that the live `/esv-release-id.txt` equals the identity in `public-site`;
   this catches configuration edits that have not actually been reloaded.
   The deployment pipeline now publishes successfully before restarting `vet-api`.
6. Confirm GET and HEAD both return 404 for `/.git/config`, `/.env`,
   `/web-app/vets-database-internal.csv`, `/api/newsletter_subscribers.jsonl`,
   `/api/confirmations.jsonl`, source scripts and unknown API routes. Do not
   download or print private contents while checking.
7. Verify enforcing CSP and HSTS headers, inspect real CSP errors, and check
   Maps and allowed analytics without generating affiliate clicks or test mail.
   Check access logs for prior requests to exposed paths. Rotate credentials
   only if investigation establishes exposure, using the operator's secret store.
8. Record the deployed commit only after these checks. Resume the deploy timer.

## Rollback

Before each static switch the publisher retains `previous-public-site`. An
operator can atomically repoint `public-site` to that release if a frontend
regression appears. Keep the public-only document root and private-path blocks
in place. Do not roll back to serving the source checkout.

For an API regression, restore the prior approved backend revision and restart
`vet-api`. For an Nginx syntax/configuration failure, restore the saved config,
run `nginx -t`, and reload only after validation. HSTS is cached by browsers;
reverting its header does not immediately remove an already cached policy.

## Operational boundaries

- Nginx is the shared per-IP rate limiter; Flask's memory limiter is a second,
  worker-local layer. Public email budgets use a non-blocking cross-worker file
  lock and hashed deduplication keys. Do not treat Origin or honeypots as bot proof.
- Newsletter records remain admin-managed opt-ins, not verified mailbox ownership.
  No automatic campaigns or double-opt-in mail are introduced by this release.
- Release directories are intentionally retained for rollback. Monitor disk use;
  remove only explicitly identified superseded releases through maintenance.
- The minimatch override is limited to the lint toolchain and can be removed
  when typescript-eslint adopts the patched dependency upstream.
