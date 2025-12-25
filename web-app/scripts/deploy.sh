#!/bin/bash

# Deployment Script for EnglishSpeakingVets
# Usage: ./scripts/deploy.sh

echo "🚀 Starting Deployment..."

# 1. Pull latest changes
echo "📥 Pulling from Git..."
git pull

# 2. Install dependencies (quietly)
echo "📦 Installing Dependencies..."
npm install --silent

# 3. Build the project
echo "🏗️ Building Project..."
npm run build

# 4. Success message
echo "✅ Deployment Complete! The dist/ folder has been updated."
echo "   (Make sure your Nginx/Apache is serving the 'dist' folder)"
