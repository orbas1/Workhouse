const { getDashboardData } = require('../services/experienceDashboard');
const logger = require('../utils/logger');

async function getExperienceDashboard(req, res) {
  try {
    const data = await getDashboardData(req.user);
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch experience dashboard', { error: err.message });
    res.status(500).json({ error: 'Failed to load experience dashboard' });
  }
}

module.exports = { getExperienceDashboard };
