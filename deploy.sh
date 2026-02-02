#!/bin/bash

# One-Step Deployment Script for VPS (Frontend + Backend)
# Usage: ./deploy.sh

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
  echo "✅ Frontend Build Successful."
else
  echo "❌ Frontend Build Failed!"
  exit 1
fi

# 3. Setup Backend
echo "🐍 Setting up Backend..."
cd ../api
if [ ! -d "venv" ]; then
    python3 -m venv venv
fi
source venv/bin/activate
pip install -r requirements.txt

# 4. Restart Backend Service (Assuming systemd service named 'vet-api')
# echo "🔄 Restarting Backend Service..."
# sudo systemctl restart vet-api

# 5. Deploy Frontend to Public Root
echo "🚀 Deploying Frontend to Public Root..."
cd ..
# Clean old files (optional, be careful)
# rm -rf index.html assets
cp -r web-app/dist/* .

echo "🎉 Deployment Complete!"
echo "NOTE: Ensure 'vet-api' service is running and Nginx handles /api/ location."
