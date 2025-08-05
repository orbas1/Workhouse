const { getAgencyEarnings, getAgencyPerformance } = require('../services/analytics');
const logger = require('../utils/logger');

async function getAgencyEarningsHandler(req, res) {
  const { agencyId } = req.params;
  const { startDate, endDate } = req.query;
  try {
    const data = await getAgencyEarnings(agencyId, {
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    });
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch agency earnings analytics', { agencyId, error: err.message });
    res.status(404).json({ error: err.message });
  }
}

async function getAgencyPerformanceHandler(req, res) {
  const { agencyId } = req.params;
  const { startDate, endDate } = req.query;
  try {
    const data = await getAgencyPerformance(agencyId, {
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
    });
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch agency performance analytics', { agencyId, error: err.message });
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  getAgencyEarningsHandler,
  getAgencyPerformanceHandler,
};
