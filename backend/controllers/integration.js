const {
  reflectLmsActivity,
  integrateMentorshipFeedback,
  updateJobApplicationProgress,
  acknowledgeProjectCompletion,
  logCertification,
  generateCareerInsights,
} = require('../services/integration');
const logger = require('../utils/logger');

async function reflectLmsActivityHandler(req, res) {
  const { userId } = req.params;
  try {
    const record = await reflectLmsActivity(userId, req.body);
    res.status(201).json(record);
  } catch (err) {
    logger.error('Failed to log LMS activity', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function integrateMentorshipFeedbackHandler(req, res) {
  const { userId } = req.params;
  try {
    const record = await integrateMentorshipFeedback(userId, req.body);
    res.status(201).json(record);
  } catch (err) {
    logger.error('Failed to log mentorship feedback', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function updateJobApplicationProgressHandler(req, res) {
  const { userId } = req.params;
  try {
    const record = await updateJobApplicationProgress(userId, req.body);
    res.status(201).json(record);
  } catch (err) {
    logger.error('Failed to update job application progress', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function acknowledgeProjectCompletionHandler(req, res) {
  const { userId } = req.params;
  try {
    const record = await acknowledgeProjectCompletion(userId, req.body);
    res.status(201).json(record);
  } catch (err) {
    logger.error('Failed to log project completion', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function logCertificationHandler(req, res) {
  const { userId } = req.params;
  try {
    const record = await logCertification(userId, req.body);
    res.status(201).json(record);
  } catch (err) {
    logger.error('Failed to log certification', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function getCareerInsightsHandler(req, res) {
  const { userId } = req.params;
  try {
    const insights = await generateCareerInsights(userId);
    res.json(insights);
  } catch (err) {
    logger.error('Failed to generate career insights', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  reflectLmsActivityHandler,
  integrateMentorshipFeedbackHandler,
  updateJobApplicationProgressHandler,
  acknowledgeProjectCompletionHandler,
  logCertificationHandler,
  getCareerInsightsHandler,
};
