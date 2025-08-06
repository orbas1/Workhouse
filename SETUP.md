# Workhouse Setup Guide

This project uses MySQL for persistence. The backend includes a setup wizard that
creates an `.env` file, runs database migrations and seeds sample data.

## Prerequisites

- Node.js 18+
- MySQL server

## Backend setup

From the repository root you can launch the interactive setup wizard:

```bash
npm run setup
```

The wizard will ask for database credentials and then run the migrations and
seeders. All environment variables are written to `backend/.env` with safe
placeholders so the server starts even if optional keys are missing. The wizard
also exposes the frontend under `VITE_APP_URL` so the browser UI can resolve
the correct site address.

After setup you can start the API with:

```bash
npm start
```

## Environment variables

A full list of variables with placeholder values can be found in
`.env.example`. Update them in `backend/.env` as needed before deploying to a
VPS.
