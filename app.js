require('dotenv').config();
const path = require('path');

// Use the root-level Express installation, which is hoisted by the
// workspace setup. Requiring it directly ensures the server starts even
// when backend dependencies aren't duplicated under `backend/node_modules`.
const express = require('express');
const backend = require('./backend/app');
const { initDb } = require('./backend/utils/db');
const { getStatus } = require('./backend/models/installation');

const app = express();

// Serve the frontend static assets
const frontendPath = path.join(__dirname, 'frontend');
app.use(express.static(frontendPath));

// Delegate API requests to the backend using a configurable base path
const apiBase = process.env.API_BASE_URL || '/api';
app.use(apiBase, backend);

// Expose runtime configuration to the frontend
app.get('/config.js', (req, res) => {
  res.type('application/javascript');
  res.send(
    `window.API_BASE_URL='${apiBase}';` +
    `window.env=Object.assign(window.env||{}, {API_BASE_URL:'${apiBase}'});`
  );
});

// Fallback to index.html for any other request (SPA behavior)
// Catch-all handler: send back index.html for any unmatched routes
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

const port = process.env.PORT || 3000;

async function start() {
  const status = getStatus();
  if (status.installed) {
    await initDb();
  }
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

if (require.main === module) {
  start();
}

module.exports = app;

