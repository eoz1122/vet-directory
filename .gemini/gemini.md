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
```bash
# Web-App
cd web-app
npm run build 
# (This automatically triggers postbuild: sitemap generation, export-db, and prerendering)

# API
cd api
source venv/bin/activate
pip install -r requirements.txt
systemctl restart vet-api
```
