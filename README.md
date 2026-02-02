# EnglishSpeakingVets - Vet Directory for Expats in Germany

A comprehensive directory of English-speaking veterinarians across Germany, built with React, TypeScript, and Vite.

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/eoz1122/vet-directory.git
cd vet-directory/web-app
```

1. Create `.env` file:

```bash
cp .env.example .env
```

1. Add your Google Maps API key to `.env`:

```env
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

1. Install dependencies:

```bash
npm install --legacy-peer-deps
```

1. Run development server:

```bash
npm run dev
```

Visit `http://localhost:5173`

## 📦 Production Build

```bash
npm run build
```

The built files will be in the `dist/` folder.

## 🌐 VPS Deployment

### On your VPS

```bash
# Navigate to your domain directory (WHEREVER YOU CLONED THE REPO)
cd /home/englishspeaking/englishspeakinggermany.online

# Run the one-step deployment script
chmod +x deploy.sh
./deploy.sh
```

### Manual Method (Backup)

```bash
git pull
cd web-app
npm install
npm run build
cp -r dist/* ../
```

# Clone the repository

git clone <https://github.com/eoz1122/vet-directory.git> temp
cd temp/web-app

# Create .env file with your API key

echo "VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here" > .env

# Install and build

npm install --legacy-peer-deps
npm run build

# Move built files to web root

mv dist/* ../../
cd ../../
rm -rf temp

# Create .htaccess for React Router

cat > .htaccess << 'EOF'
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
EOF

# Set permissions

chown -R www-data:www-data .
chmod -R 755 .

```

## 🔑 Google Maps API Key

This project requires a Google Maps API key for the location search feature.

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable **Maps JavaScript API** and **Places API**
4. Create credentials (API Key)
5. Restrict the key to your domain for security

## 📁 Project Structure

```text
/
├── web-app/                # React/Vite Web Application
│   ├── src/                # Source code
│   └── dist/               # Production build
├── scripts/                # Python Utilities
│   ├── ingestion/          # Scripts for adding new data (e.g., ingest_vets.py)
│   ├── maintenance/        # Scripts for cleaning/fixing data (e.g., cleanup_vets.py)
│   ├── analysis/           # Analysis tools
│   └── legacy/             # Old scripts
├── data/
│   ├── input/              # Input CSVs for ingestion
│   ├── processing/         # Intermediate processing files
│   └── archive/            # Archived source files
├── docs/                   # Documentation
└── requirements.txt        # Python dependencies
```

### Data Management

- **Ingestion**: Place new CSV files in `data/input/`. Run `python scripts/ingestion/ingest_vets.py` to merge them into `web-app/src/data/vets.json`.
- **Cleanup**: Run `python scripts/maintenance/cleanup_vets.py` to standardize the JSON data.

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Google Maps API** - Location search
- **React Helmet Async** - SEO meta tags

## 📊 Features

- 100+ verified English-speaking vets across Germany
- City-specific landing pages (Berlin, Hamburg, Frankfurt)
- Location-based search with Google Maps
- 4 SEO-optimized blog posts
- Contact form with topic routing
- Mobile-responsive design
- GDPR-compliant (Impressum, Privacy Policy)
- Google Analytics integration

## ⚠️ Security Note

**Never commit `.env` files to git!**

The `.env` file contains sensitive API keys and should only exist on your local machine and production server.

## 📝 License

© 2025 EnglishSpeakingVets. All rights reserved.
