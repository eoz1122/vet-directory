# EnglishSpeakingVets Directory - AI Directives

## Project Overview
This project is a React-based SPA (Single Page Application) directory for English-speaking veterinarians in Germany, with a lightweight Python/Flask backend acting solely as an email gateway for contact forms. 

## Architectural Foundations
*   **Web App**: React 19, TypeScript, Vite, Tailwind CSS 4, React Router 7.
*   **State & Data**: All core data is static (`vets.json`). Search, filtering, and radius distance (Haversine via `@vis.gl/react-google-maps`) happen entirely on the client-side.
*   **API**: Python 3.12, Flask, Gunicorn. Strictly an SMTP relay. No database connected.
*   **Deployment**: Static build output is served via Nginx. Puppeteer is used via `prerender.js` to create static HTML for SEO.

## Development Rules & Conventions
*   **TDD First**: As per global rules, no logic changes without a failing test first. `pytest` for backend, `vitest` + `@testing-library/react` for frontend.
*   **Decomposition**: Components exceeding ~200 lines must be reviewed for extraction. React components should follow SOLID principles.
*   **Strict Security**: Never commit API keys. The Flask API must validate and sanitize all inputs to prevent XSS. The server runs as a non-root `englishspeaking` user.
*   **CSS System**: Use the single Tailwind v4 `@theme` block in `index.css`. Do not re-introduce `tailwind.config.js`.

## Deployment Workflow

**Single canonical path: `git push origin main`**

GitHub Actions (`.github/workflows/deploy.yml`) automatically:
1. SSHs into VPS (`72.62.95.46`) as `root`
2. Runs `bash deploy.sh` from the project root

`deploy.sh` handles everything: `git pull` -> `npm ci` -> Puppeteer Chrome install -> `npm run build` (vite + prerender 203 pages) -> `cp -r web-app/dist/* .` (copies to nginx root) -> backend pip install.

**Manual fallback** (run on VPS directly):
```bash
cd /home/englishspeaking/englishspeakinggermany.online
bash deploy.sh
```
