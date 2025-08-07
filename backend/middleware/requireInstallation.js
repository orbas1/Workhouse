const { getStatus } = require('../models/installation');

function requireInstallation(req, res, next) {
  const status = getStatus();
  if (process.env.NODE_ENV !== 'test' && !status.installed) {
    return res.status(503).json({ error: 'Application is not installed' });
  }
  next();
}

module.exports = requireInstallation;
