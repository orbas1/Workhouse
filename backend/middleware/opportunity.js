const opportunityService = require('../services/opportunity');
const logger = require('../utils/logger');

module.exports = async (req, res, next) => {
  const { opportunityId } = req.params;
  try {
    const opportunity = await opportunityService.getOpportunity(opportunityId);
    if (!opportunity) {
      logger.error('Opportunity not found', { opportunityId });
      return res.status(404).json({ error: 'Opportunity not found' });
    }
    req.opportunity = opportunity;
    next();
  } catch (err) {
    logger.error('Error retrieving opportunity', { opportunityId, error: err.message });
    res.status(500).json({ error: 'Internal server error' });
  }
};
