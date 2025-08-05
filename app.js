const path = require('path');

// Reuse Express from the backend dependencies to avoid duplicating
// installations at the repository root.
const express = require('./backend/node_modules/express');
const backend = require('./backend/app');

const app = express();

// Serve the frontend static assets
const frontendPath = path.join(__dirname, 'frontend');
app.use(express.static(frontendPath));

// Delegate API requests to the backend under the "/api" prefix
app.use('/api', backend);

// Fallback to index.html for any other request (SPA behavior)
// Catch-all handler: send back index.html for any unmatched routes
app.use((req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

const port = process.env.PORT || 3000;
if (require.main === module) {
  app.listen(port, () => console.log(`Server running on port ${port}`));
}

module.exports = app;

