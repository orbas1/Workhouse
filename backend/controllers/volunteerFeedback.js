const {
  submitVolunteerFeedback,
  submitOrganizationFeedback,
  getFeedbackForOpportunity,
} = require('../services/volunteerFeedback');
const logger = require('../utils/logger');

async function submitVolunteerFeedbackHandler(req, res) {
  try {
    const feedback = await submitVolunteerFeedback(req.body);
    res.status(201).json(feedback);
  } catch (err) {
    logger.error('Failed to submit volunteer feedback', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function submitOrganizationFeedbackHandler(req, res) {
  try {
    const feedback = await submitOrganizationFeedback(req.body);
    res.status(201).json(feedback);
  } catch (err) {
    logger.error('Failed to submit organization feedback', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getOpportunityFeedbackHandler(req, res) {
  const { opportunityId } = req.params;
  try {
    const feedback = await getFeedbackForOpportunity(opportunityId);
    res.json(feedback);
  } catch (err) {
    logger.error('Failed to retrieve opportunity feedback', { error: err.message, opportunityId });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  submitVolunteerFeedbackHandler,
  submitOrganizationFeedbackHandler,
  getOpportunityFeedbackHandler,
};
