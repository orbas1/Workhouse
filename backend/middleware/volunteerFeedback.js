const feedbackService = require('../services/volunteerFeedback');
const logger = require('../utils/logger');

function requireOpportunityFeedback(req, res, next) {
  const { opportunityId } = req.params;
  const feedback = feedbackService.getFeedbackForOpportunity(opportunityId);
  if (
    feedback.volunteerFeedback.count === 0 &&
    feedback.organizationFeedback.count === 0
  ) {
    logger.info('No feedback found for opportunity', { opportunityId });
    return res.status(404).json({ error: 'No feedback found for opportunity' });
  }
  req.feedback = feedback;
  next();
}

module.exports = { requireOpportunityFeedback };
