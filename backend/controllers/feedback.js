const {
  submitClientFeedback,
  submitEmployeeFeedback,
  getQualityScores,
} = require('../services/feedback');
const logger = require('../utils/logger');

async function submitClientFeedbackHandler(req, res) {
  try {
    const feedback = await submitClientFeedback(req.body);
    res.status(201).json(feedback);
  } catch (err) {
    logger.error('Failed to submit client feedback', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function submitEmployeeFeedbackHandler(req, res) {
  try {
    const feedback = await submitEmployeeFeedback(req.body);
    res.status(201).json(feedback);
  } catch (err) {
    logger.error('Failed to submit employee feedback', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getQualityScoresHandler(req, res) {
  const { agencyId } = req.params;
  try {
    const scores = await getQualityScores(agencyId);
    res.json(scores);
  } catch (err) {
    logger.error('Failed to retrieve quality scores', { error: err.message, agencyId });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  submitClientFeedbackHandler,
  submitEmployeeFeedbackHandler,
  getQualityScoresHandler,
};
