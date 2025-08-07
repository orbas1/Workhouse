# Workhouse


This repository hosts the core code for the platform.

## Directories

- `backend` – server-side code.
- `frontend` – web client.
- `mobile` – Flutter shell apps for professionals and general users.

## Overview
Workhouse is an ambitious full‑stack web platform that unifies tools for employment, freelancing, education, collaboration and media. The application bundles job boards, gig and service marketplaces, course management, project workspaces, live content and more into a single experience.

## Features
- **User accounts and profiles** – sign up, log in and manage personal information.
- **Employment tools** – job listings, applications, interview tracking and recruiter dashboards.
- **Gig and service marketplace** – create gigs, accept orders, handle payments and manage contracts.
- **Education hub** – courses, classrooms, schedules and progress tracking for students and teachers.
- **Project and task management** – dashboards for teams, milestones, files and collaboration.
- **Media and communication** – live feeds, messaging, podcasts, webinars and analytics.
- **Advertising & analytics** – campaign management, billing, statistics and AI‑powered insights.

The `agents.md` file in the repository root outlines the broad roadmap of page designs and modules that the frontend will eventually cover.

## Tech Stack
- **Frontend:** React with Vite, Chakra UI and supporting libraries.
- **Backend:** Node.js with Express, Joi for validation and other utilities.
- **Runtime integration:** `app.js` at the repository root mounts the backend API and serves the compiled frontend assets.

## Project Structure
```
Workhouse/
├── backend/    # Express API server and routes
├── frontend/   # React application served by Vite
├── app.js      # Entry point that serves frontend and proxies API calls
├── backend_guide.md / frontend_guide.md  # Extended documentation
└── .env.example # Example environment configuration
```

## Prerequisites
- Node.js v16+ and npm
- PostgreSQL database
- Copy `.env.example` to `.env` and update environment variables

## Getting Started
1. **Configure the database**
   - Install PostgreSQL and ensure it is running.
   - Copy `.env.example` to `.env` and update the `DB_*` variables to match your database credentials.
2. **Run the setup script** to install dependencies and prepare the database:
   ```bash
   npm run setup
   ```
   The script installs packages, runs database migrations using the configured credentials and seeds sample data.
3. **Start the services**:
   ```bash
   npm start          # start API on port 5000
   npm run start:frontend  # launch React dev server
   ```

For custom configuration through interactive prompts, run:
```bash
npm run setup:wizard
```

## Running the App
### Development
Run the API and frontend separately for a faster feedback loop. From the repository root you can use:
```bash
npm run start:backend   # launches API on port 5000
npm run start:frontend  # serves frontend with hot reload
```
Or you can still run the scripts from within each directory:
```bash
cd backend && npm start
cd frontend && npm run dev
```
Configure `VITE_API_URL` and `VITE_APP_URL` in `.env` to point the frontend to
the backend server and public site address.

### Production
Build the frontend and launch the combined server:
```bash
cd frontend && npm run build
cd .. && node app.js               # serves static frontend and mounts /api routes
```
`API_BASE_URL` in `.env` controls the path where the backend is mounted when using `app.js`.

## PM2 Process Management

### Development
Use PM2 to keep both services running in the background during development:

```bash
npm run setup
pm2 start npm --name workhouse-backend --workspace backend -- run start
pm2 start npm --name workhouse-frontend --workspace frontend -- run dev
```

### Production
Build the frontend and serve it with PM2:

```bash
npm run build --workspace frontend
pm2 start "serve -s dist" --name workhouse-frontend
pm2 start backend/app.js --name workhouse-backend
```

## Vercel Deployment
The repository includes a `vercel.json` configuration that builds the React frontend and packages the Express backend as a serverless function. To deploy:

1. In Vercel, create a project and set the root directory to the repository root (where `vercel.json` lives).
2. Add the required environment variables listed in `.env.example` to the project settings.
3. Trigger a deployment. Vercel will build `frontend` with Vite and expose the API under `/api` using the backend code.

If you prefer separate deployments, create one Vercel project with `frontend/` as the root and another with `backend/` configured with the Node runtime.

## Additional Resources
Detailed endpoint and UI design notes live in:
- `backend_guide.md` – overview of backend routes and planned services.
- `frontend_guide.md` – roadmap for frontend pages and design principles.
- `IDE_SETUP.md` – editor recommendations and debugging tips.
- `developer_guide.md` – commands and workflows for contributors.
- `UPDATE_PLAN.md` – short‑term roadmap derived from `agents.md`.
- `CHANGELOG.md` – record of notable changes.

## Docker
Build and run the combined application in a container:

```bash
docker-compose up --build
```

To open a shell in the container:

```bash
docker-compose run --rm workhouse sh
```

## Contributing
Contributions are welcome! Fork the repository, create a branch and open a pull request.


