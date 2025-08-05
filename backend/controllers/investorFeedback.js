const {
  submitInvestorFeedback,
  getInvestorFeedbackForEvent,
} = require('../services/investorFeedback');
const logger = require('../utils/logger');

async function submitInvestorFeedbackHandler(req, res) {
  const { eventId } = req.params;
  const investorId = req.user.id;
  const { rating, comment } = req.body;
  try {
    const feedback = await submitInvestorFeedback(eventId, investorId, rating, comment);
    res.status(201).json(feedback);
  } catch (err) {
    logger.error('Failed to submit investor feedback', {
      error: err.message,
      eventId,
      investorId,
    });
    res.status(400).json({ error: err.message });
  }
}

async function getInvestorFeedbackHandler(req, res) {
  const { eventId } = req.params;
  try {
    const feedback = await getInvestorFeedbackForEvent(eventId);
    res.json({ feedback });
  } catch (err) {
    logger.error('Failed to retrieve investor feedback', { error: err.message, eventId });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  submitInvestorFeedbackHandler,
  getInvestorFeedbackHandler,
};
