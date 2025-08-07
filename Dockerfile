# Simple development Dockerfile for Workhouse
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
COPY backend/package.json backend/package.json
COPY frontend/package.json frontend/package.json
RUN npm install

# Copy source
COPY . .

# Build frontend assets
RUN npm run build --workspace frontend

# Expose ports for frontend (3000) and backend API (5000)
EXPOSE 3000 5000

# Default command starts the combined server
CMD ["node", "app.js"]
