const { matchJobs, getMatchCriteria } = require('../services/matchmaking');
const logger = require('../utils/logger');

async function matchJobsHandler(req, res) {
  const { agencyId } = req.params;
  try {
    const matches = await matchJobs(agencyId, req.body);
    res.json({ matches });
  } catch (err) {
    logger.error('Job matching failed', { error: err.message, agencyId });
    res.status(400).json({ error: err.message });
  }
}

async function getCriteriaHandler(req, res) {
  const { agencyId } = req.params;
  try {
    const criteria = await getMatchCriteria(agencyId);
    res.json(criteria);
  } catch (err) {
    logger.error('Failed to fetch match criteria', { error: err.message, agencyId });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  matchJobsHandler,
  getCriteriaHandler,
};
