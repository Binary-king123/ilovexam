# 🚀 iLoveExams — Production Deployment Guide

This guide describes how to deploy the **iLoveExams** application to your Hostinger Ubuntu 24.04 LTS VPS (`72.62.39.82`) as a production-ready service under a reverse proxy with SSL enabled.

---

## 📋 Prerequisites

Before deploying, ensure you have:
1. Pointed your domain name (e.g., `ilovedesi.fun` or `pg.ilovedesi.fun`) to your VPS IP address (`72.62.39.82`) in your domain DNS control panel.
2. Verified that your project files are pushed to your GitHub repository.

---

## ⚡ 1-Step Automatic Setup

Once you clone your repository onto the VPS, you can install and configure all dependencies (NodeJS, PM2, Nginx, SQLite and Certbot) automatically.

1. **SSH into your VPS**:
   ```bash
   ssh root@72.62.39.82
   ```

2. **Clone and Enter Repository**:
   ```bash
   git clone <YOUR_GITHUB_LINK> /var/www/iloveexams
   cd /var/www/iloveexams
   ```

3. **Run Deployment Script**:
   Make the script executable and run it:
   ```bash
   chmod +x deploy.sh
   ./deploy.sh
   ```

---

## 🔧 Nginx & SSL Configuration

After running the script, Nginx is installed but needs to direct traffic to your Node app running on port `8085`.

1. **Configure Nginx Site**:
   Create a site config:
   ```bash
   nano /etc/nginx/sites-available/iloveexams
   ```
   Paste the following config (replace `ilovedesi.fun` with your domain):
   ```nginx
   server {
       listen 80;
       server_name ilovedesi.fun www.ilovedesi.fun;

       location / {
           proxy_pass http://localhost:8085;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
           client_max_body_size 50M;
       }
   }
   ```

2. **Enable Config & Restart Nginx**:
   ```bash
   ln -s /etc/nginx/sites-available/iloveexams /etc/nginx/sites-enabled/
   rm -f /etc/nginx/sites-enabled/default
   nginx -t
   systemctl restart nginx
   ```

3. **Secure with Free SSL (Let's Encrypt / Certbot)**:
   Run Certbot to fetch and configure SSL certificates:
   ```bash
   certbot --nginx -d ilovedesi.fun -d www.ilovedesi.fun
   ```
   Follow the prompts to enable HTTPS redirect. Certbot will handle automatic renewals.

---

## 🐳 Environment Variables (`.env`)

Create a `.env` file in the root folder (`/var/www/iloveexams/.env`) with your production keys:
```env
PORT=8085
COOKIE_SECRET=ilovexams_neetpg_cookie_secret_2027!!
# Razorpay Credentials (for premium PG upgrades)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

Restart the app in PM2 to load changes:
```bash
pm2 restart iloveexams
```

---

## 🛠️ Management Commands

* **Check Logs**: `pm2 logs iloveexams`
* **Restart App**: `pm2 restart iloveexams`
* **Check Status**: `pm2 status`
* **Stop App**: `pm2 stop iloveexams`
