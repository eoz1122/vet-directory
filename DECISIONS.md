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
