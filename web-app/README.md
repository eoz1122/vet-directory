# EnglishSpeakingGermany.online 🇪🇺🐶

## 1. Project Overview
A mobile-first directory for English-speaking veterinarians across Germany.
The public application reads its directory from a unified JSON dataset.

## 2. Quick Start
```bash
# Install dependencies
npm install

# Start Development Server
npm run dev
```

## 3. Architecture
- **Frontend:** React (Vite) + TypeScript
- **Styling:** Tailwind CSS (Custom Palette: Deep Forest, Soft Sand, Safety Orange)
- **Data Source:** `src/data/vets.json`
- **Maps:** Google Maps, loaded on demand on mobile

## 4. Operational Safety

The former simulated monthly-maintenance command has been retired. Do not run ad hoc scripts against `src/data/vets.json`. Dataset changes must use a reviewed repository-root maintenance workflow, preserve a recoverable original, and be verified with tests and `git diff` before they are accepted.

## 5. Legal & Compliance
- **HWG/UWG:** Listings use neutral language. Disclaimer added to all cards.
- **GDPR:** Transparency notes and removal links implemented on every card.

## Compliance Note
*This directory serves as an information aggregator. Recommendations are user-submitted or AI-synthesized and not individually verified by the operator.*
