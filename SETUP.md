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

The wizard will show the current configuration from `backend/.env`, logging it
to `backend/scripts/setup.log`. You can keep the existing values or enter new
ones for the site name, site URL and database credentials. When finished, the
wizard runs migrations and seeders, then exposes the frontend under
`VITE_APP_URL` so the browser UI can resolve the correct site address.

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
