const { assessLearningOutcomes, customizeLearningPath } = require('../services/aiEnhancedLearningDevelopment');
const logger = require('../utils/logger');

async function getLearningOutcomesHandler(req, res) {
  const { courseId } = req.params;
  try {
    const results = await assessLearningOutcomes(courseId);
    res.json(results);
  } catch (err) {
    logger.error('Failed to get learning outcomes', { error: err.message, courseId });
    res.status(500).json({ error: 'Unable to assess learning outcomes' });
  }
}

async function customizeLearningPathHandler(req, res) {
  const { userId } = req.params;
  try {
    const path = await customizeLearningPath(userId);
    res.json(path);
  } catch (err) {
    logger.error('Failed to customize learning path', { error: err.message, userId });
    res.status(500).json({ error: 'Unable to customize learning path' });
  }
}

module.exports = {
  getLearningOutcomesHandler,
  customizeLearningPathHandler,
};
