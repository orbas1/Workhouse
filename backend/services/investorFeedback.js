const model = require('../models/investorFeedback');
const logger = require('../utils/logger');

async function submitInvestorFeedback(eventId, investorId, rating, comment) {
  const record = model.addFeedback(eventId, { investorId, rating, comment });
  logger.info('Investor feedback submitted', { eventId, investorId });
  return record;
}

async function getInvestorFeedbackForEvent(eventId) {
  const list = model.getFeedbackByEvent(eventId);
  logger.info('Investor feedback retrieved', { eventId, count: list.length });
  return list;
}

module.exports = {
  submitInvestorFeedback,
  getInvestorFeedbackForEvent,
};
