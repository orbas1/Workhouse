# Workhouse Setup Guide

This project uses PostgreSQL for persistence. The backend includes a setup
wizard that creates an `.env` file, runs database migrations and seeds sample
data.

## Prerequisites

- Node.js 18+
- PostgreSQL server

## Browser-based setup

1. From the repository root start the server:

   ```bash
   npm start
   ```

2. Once the server is running, visit the web-based installer at
   [http://localhost:3000/install](http://localhost:3000/install).
3. The wizard walks you through verifying file permissions, entering site
   details, configuring the database and creating the first administrative
   account.
4. After the final step the wizard applies database migrations, seeds sample
   data and redirects you to the landing page. Use the admin credentials you
   just created to log in.

## Quick setup script

1. Ensure PostgreSQL is installed and running.
2. Copy `.env.example` to `.env` and update the `DB_*` values to match your local database credentials.
3. From the repository root run:

   ```bash
   npm run setup
   ```

The script installs dependencies, runs migrations using the configured credentials and seeds the database with sample data. If `.env` is missing it will be created from `.env.example`.

After setup you can start the API and frontend:

```bash
npm start
npm run start:frontend
```

For deployment behind Apache, the `frontend/.htaccess` file rewrites requests to
`index.html` so the Vite single-page app loads correctly.

## Interactive setup (optional)

To customize environment variables or skip seeding, launch the interactive wizard:

```bash
npm run setup:wizard
```

The wizard shows existing values from `backend/.env` and logs to `backend/scripts/setup.log`. After answering prompts it can
run migrations, seed data and start the backend with pm2.

## Environment variables

A full list of variables with placeholder values can be found in
`.env.example`. Update them in `backend/.env` as needed before deploying to a
VPS.
