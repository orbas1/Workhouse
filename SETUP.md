# Workhouse Setup Guide

This project uses PostgreSQL for persistence. The backend includes a setup
wizard that creates an `.env` file, runs database migrations and seeds sample
data.

## Prerequisites

- Node.js 18+
- PostgreSQL server
- A registered domain if deploying publicly

## Browser-based setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the server and open the installer:

   ```bash
   npm start
   ```

   Navigate to [http://localhost:3000/install](http://localhost:3000/install) or replace `localhost` with your domain.

3. The wizard verifies file permissions, collects site name and URL, configures the database and creates the first administrator.
   When finished it writes `.env`, runs migrations, seeds sample data and presents Apache/Nginx configuration snippets for your domain.

4. Build production assets and restart the app:

   ```bash
   npm run build --workspace frontend
   node app.js
   ```

5. Configure your web server. Example configs are provided in `config/nginx.conf.example` and `config/apache.conf.example`.

   ### Apache

   The sample `apache.conf.example` forwards `/api` requests to the Node backend
   and serves the built frontend from the `public/` directory. Enable the proxy
   modules and copy the config into place:

   ```bash
   sudo a2enmod proxy proxy_http rewrite
   sudo cp config/apache.conf.example /etc/apache2/sites-available/workhouse.conf
   sudo mkdir -p /var/www/workhouse/public
   # copy frontend build output into /var/www/workhouse/public
   sudo a2ensite workhouse
   sudo systemctl reload apache2
   ```

   The `public/.htaccess` file rewrites requests to `index.html` so the Vite
   single-page app loads correctly.

## Scripted setup (optional)

For automated deployments the setup script performs the same steps without using the browser UI:

```bash
npm run setup
```

It installs dependencies, runs migrations and seeds the database using values from `.env`.

## Environment variables

A full list of variables with placeholder values can be found in
`.env.example`. Update them in `backend/.env` as needed before deploying to a VPS.
