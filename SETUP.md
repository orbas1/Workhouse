# Workhouse Setup Guide

This project uses PostgreSQL for persistence. The backend includes a setup
wizard that creates an `.env` file, runs database migrations and seeds sample
data.

## Prerequisites

- Node.js 18+
- PostgreSQL server

## Quick setup

From the repository root run:

```bash
npm run setup
```

This script copies `.env.example` to `.env` if missing, installs all dependencies and runs database migrations with seed data.

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
