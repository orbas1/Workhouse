# Developer Guide

This document explains how to get a local development environment running and outlines useful commands for day‑to‑day work.

## Prerequisites
- Node.js 18+
- npm 9+
- A running database as configured in `.env`

## Installation
1. Run the setup script to install dependencies and create the `.env` file:
   ```bash
   npm run setup
   ```
   Adjust values in `.env` as needed after the script completes.

## Working with Workspaces
The project uses npm workspaces. Commands can target a workspace:
```bash
npm run start:backend    # run API server on port 5000
npm run start:frontend   # start React dev server on port 3000
```

## Testing
Run all tests across workspaces:
```bash
npm test
```
To test a single workspace:
```bash
npm test --workspace backend
npm test --workspace frontend
```

## Linting
At the moment no linter is configured. Contributions adding ESLint or other tooling are welcome.

## Submitting Changes
1. Create descriptive commits.
2. Run the full test suite before pushing.
3. Update documentation and `CHANGELOG.md` for user facing changes.

## Docker Development
A `Dockerfile` and `docker-compose.yml` are provided for parity with production. Build and start the container with:
```bash
docker-compose up --build
```
To access a shell inside the container:
```bash
docker-compose run --rm workhouse sh
```

