# Workhouse Setup Guide

This project uses PostgreSQL for persistence. The backend includes a setup
wizard that creates an `.env` file, runs database migrations and seeds sample
data.

## Prerequisites

- Node.js 18+
- PostgreSQL server

## Backend setup

From the repository root you can launch the interactive setup wizard:

```bash
npm run setup
```

The wizard shows any existing values from `backend/.env` and logs all activity
to `backend/scripts/setup.log`. You can keep the defaults or supply new values
for the site name, URL, database settings, and optional Google/Firebase
credentials. After the questions are complete the wizard proceeds through
several stages:

1. **Run database migrations**
2. **Seed sample data**
3. **Start the backend with pm2**
4. **Check pm2 status**

For each stage you are prompted to continue or skip by entering `n`. When all
stages finish the script opens the configured site URL in your browser so the
frontend can resolve the correct address via `VITE_APP_URL`.

After setup you can start the API with:

```bash
npm start
```

The frontend dev server can be launched with:

```bash
npm run start:frontend
```

For deployment behind Apache, the `frontend/.htaccess` file rewrites requests to
`index.html` so the Vite single-page app loads correctly.

## Environment variables

A full list of variables with placeholder values can be found in
`.env.example`. Update them in `backend/.env` as needed before deploying to a
VPS.
