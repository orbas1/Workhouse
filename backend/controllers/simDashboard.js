const { fetchSimDashboard } = require('../services/simDashboard');

async function simDashboardHandler(req, res) {
  try {
    const data = await fetchSimDashboard();
    res.json(data);
  } catch (err) {
    console.error('SIM dashboard retrieval failed', err);
    res.status(500).json({ error: 'Failed to load dashboard' });
  }
}

module.exports = { simDashboardHandler };
