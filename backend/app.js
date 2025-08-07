require('./config/env');
const express = require('express');
const cors = require('cors');
const products = require('./data/products.json');
const installRoutes = require('./routes/install');
const requireInstallation = require('./middleware/requireInstallation');
const authRoutes = require('./routes/auth');
const landingRoutes = require('./routes/landing');
const n8nRoutes = require('./routes/n8n');
const tasksRoutes = require('./routes/tasks');
const adminAuthRoutes = require('./routes/adminAuth');
const dashboardRoutes = require('./routes/dashboard');
const adminDashboardRoutes = require('./routes/adminDashboard');
const searchRoutes = require('./routes/search');
const api = require("./api");
const { initDb } = require('./utils/db');
const logger = require('./utils/logger');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/install', installRoutes);
app.use(requireInstallation);

app.get('/operations/retail/products', (req, res) => {
  res.json(products);
});

app.use('/auth', authRoutes);
app.use('/landing', landingRoutes);
app.use('/n8n', n8nRoutes);
app.use('/tasks', tasksRoutes);
app.use('/admin', adminAuthRoutes);
app.use('/admin', adminDashboardRoutes);
app.use('/search', searchRoutes);
app.use('/dashboard', dashboardRoutes);

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  logger.error('Unhandled error', { error: err.message });
  res.status(500).json({ error: 'Internal server error' });
});

const port = process.env.PORT || 5000;
async function start() {
  try {
    await initDb();
    app.listen(port, () => logger.info(`Server running on port ${port}`));
  } catch (err) {
    logger.error('Failed to start server', { error: err.message });
    process.exit(1);
  }
}

process.on('unhandledRejection', err => {
  logger.error('Unhandled promise rejection', { error: err.message });
});

process.on('uncaughtException', err => {
  logger.error('Uncaught exception', { error: err.message });
});

if (require.main === module) {
  start();
}

module.exports = app;
