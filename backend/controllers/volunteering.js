const { getVolunteerStats, getEmployerStats } = require('../services/volunteering');
const logger = require('../utils/logger');

async function getDashboardHandler(req, res) {
  try {
    const userId = req.user?.id || req.user?.username;
    const role = req.user?.role;
    const data = role === 'organization'
      ? await getEmployerStats(userId)
      : await getVolunteerStats(userId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch volunteering dashboard', { error: err.message });
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
}

module.exports = { getDashboardHandler };

