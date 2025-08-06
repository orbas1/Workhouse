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

## Getting Started
1. **Clone the repository** and create an environment file:
   ```bash
   cp .env.example .env
   ```
2. **Install dependencies** for both services:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

## Running the App
### Development
Run the API and frontend separately for a faster feedback loop:
```bash
cd backend && npm start            # launches API on port 5000
cd ../frontend && npm run dev      # serves frontend with hot reload
```
Configure `VITE_API_URL` in `.env` to point the frontend to the backend server.

### Production
Build the frontend and launch the combined server:
```bash
cd frontend && npm run build
cd .. && node app.js               # serves static frontend and mounts /api routes
```
`API_BASE_URL` in `.env` controls the path where the backend is mounted when using `app.js`.

## Additional Resources
Detailed endpoint and UI design notes live in:
- `backend_guide.md` – overview of backend routes and planned services.
- `frontend_guide.md` – roadmap for frontend pages and design principles.

## Contributing
Contributions are welcome! Fork the repository, create a branch and open a pull request.


