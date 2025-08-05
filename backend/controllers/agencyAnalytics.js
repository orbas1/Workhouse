const { getAgencyAnalytics } = require('../services/agencyAnalytics');
const logger = require('../utils/logger');

async function getAgencyAnalyticsHandler(req, res) {
  const { agencyId } = req.params;
  try {
    const analytics = await getAgencyAnalytics(agencyId);
    res.json(analytics);
  } catch (err) {
    logger.error('Failed to fetch agency analytics', { error: err.message, agencyId });
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  getAgencyAnalyticsHandler,
};
