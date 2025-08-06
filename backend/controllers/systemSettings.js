const service = require('../services/systemSettings');

async function getSystemSettings(req, res) {
  res.json(service.getSettings());
}

async function updateSystemSettings(req, res) {
  const updated = service.updateSettings(req.body);
  res.json(updated);
}

module.exports = { getSystemSettings, updateSystemSettings };
