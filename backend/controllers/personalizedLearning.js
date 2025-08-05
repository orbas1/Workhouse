const { getAdaptiveContent, evaluateAssessment } = require('../services/personalizedLearning');
const logger = require('../utils/logger');

async function adaptiveContentHandler(req, res) {
  const { userId } = req.params;
  try {
    const content = await getAdaptiveContent(userId);
    res.json(content);
  } catch (err) {
    logger.error('Failed to generate adaptive content', { error: err.message, userId });
    res.status(500).json({ error: 'Unable to generate adaptive content' });
  }
}

async function assessmentEvaluationHandler(req, res) {
  const { userId, assessmentId, answers } = req.body;
  try {
    const result = await evaluateAssessment(userId, assessmentId, answers);
    res.json(result);
  } catch (err) {
    logger.error('Failed to evaluate assessment', { error: err.message, userId, assessmentId });
    res.status(500).json({ error: 'Assessment evaluation failed' });
  }
}

module.exports = {
  adaptiveContentHandler,
  assessmentEvaluationHandler,
};
