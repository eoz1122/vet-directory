#!/bin/bash

# Deployment Script for EnglishSpeakingVets
# Usage: ./scripts/deploy.sh

echo "🚀 Starting Deployment..."

# 1. Pull latest changes
echo "📥 Pulling from Git..."
git pull

# 2. Check if we need to switch to web-app directory
if [ -d "web-app" ]; then
  echo "📂 Switching to web-app directory..."
  cd web-app
elif [ -f "package.json" ]; then
  echo "📂 Already in project root."
else
  echo "❌ Error: Could not find package.json in current or 'web-app' directory!"
  exit 1
fi

# 3. Install dependencies (quietly)
echo "📦 Installing Dependencies..."
npm install --silent

# 3. Install Puppeteer's Chrome if not already present (required for prerender step)
echo "🌐 Ensuring Puppeteer Chrome is installed..."
npx puppeteer browsers install chrome --silent 2>/dev/null || true

# 4. Build the project (includes prerender of all pages)
echo "🏗️ Building Project..."
npm run build

# 4. Success message
echo "✅ Deployment Complete! The dist/ folder has been updated."
echo "   (Make sure your Nginx/Apache is serving the 'dist' folder)"
