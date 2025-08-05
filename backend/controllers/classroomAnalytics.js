const {
  getEngagementAnalytics,
  getCompletionAnalytics,
} = require('../services/classroomAnalytics');
const logger = require('../utils/logger');

async function getEngagementHandler(req, res) {
  const { classroomId } = req.params;
  try {
    const analytics = await getEngagementAnalytics(classroomId);
    res.json(analytics);
  } catch (err) {
    logger.error('Failed to fetch classroom engagement analytics', {
      error: err.message,
      classroomId,
    });
    res.status(404).json({ error: err.message });
  }
}

async function getCompletionHandler(req, res) {
  const { classroomId } = req.params;
  try {
    const analytics = await getCompletionAnalytics(classroomId);
    res.json(analytics);
  } catch (err) {
    logger.error('Failed to fetch classroom completion analytics', {
      error: err.message,
      classroomId,
    });
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  getEngagementHandler,
  getCompletionHandler,
};

