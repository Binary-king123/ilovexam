#!/bin/bash
# ==============================================================================
# iLoveExams Production Setup & Deployment Script for Ubuntu 24.04 LTS
# ==============================================================================

# Exit on error
set -e

echo "🚀 Starting iLoveExams deployment on Ubuntu..."

# 1. Update system packages
echo "Updating packages..."
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js (Version 20 LTS) & npm
if ! command -v node &> /dev/null; then
    echo "Installing Node.js 20..."
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
else
    echo "Node.js is already installed: $(node -v)"
fi

# 3. Install build tools for better-sqlite3 compilation
echo "Installing essential build dependencies..."
sudo apt install -y build-essential python3

# 4. Install PM2 (Process Manager) globally
if ! command -v pm2 &> /dev/null; then
    echo "Installing PM2..."
    sudo npm install -g pm2
else
    echo "PM2 is already installed."
fi

# 5. Install Nginx (Reverse Proxy) & Certbot (SSL)
if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx and Certbot..."
    sudo apt install -y nginx certbot python3-certbot-nginx
else
    echo "Nginx is already installed."
fi

# 6. Install Project Dependencies
echo "Installing application dependencies..."
npm install

# 7. Seed & Encrypt PG Questions
echo "Encrypting and seeding clinical QBank..."
npm run encrypt

# 8. Start/Restart Application with PM2
echo "Starting application with PM2..."
pm2 start server.js --name "iloveexams" || pm2 restart "iloveexams"

# 9. Configure PM2 to start on system boot
echo "Setting up PM2 startup hook..."
pm2 startup || true
pm2 save

echo "=============================================================================="
echo "✅ Server dependencies installed and application launched under PM2!"
echo "👉 To bind a domain (e.g., iloveexams.com) and configure SSL, check PRODUCTION_SETUP.md."
echo "=============================================================================="
