#!/bin/bash

# One-Step Deployment Script for VPS
# Usage: ./deploy.sh
# Run this from the root of the project (~/englishspeakinggermany.online/)

echo "🚀 Starting Deployment..."

# 1. Pull latest changes
echo "📥 Git Pulling..."
git pull

# 2. Build the Web App
echo "🏗️  Building Web App..."
cd web-app
npm install
npm run build

if [ $? -eq 0 ]; then
  echo "✅ Build Successful."
else
  echo "❌ Build Failed!"
  exit 1
fi

# 3. Deploy to Public Root
echo "🚀 Deploying to Public Root..."
# Move back to root
cd .. 
# Copy dist contents to current directory (Web Root)
cp -r web-app/dist/* .

echo "🎉 Deployment Complete!"
