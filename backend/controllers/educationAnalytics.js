const {
  fetchCoursesOverview,
  fetchCourseAnalytics,
  fetchUserEngagement,
} = require('../services/educationAnalytics');
const logger = require('../utils/logger');

async function getCoursesOverviewHandler(req, res) {
  try {
    const overview = await fetchCoursesOverview();
    res.json(overview);
  } catch (err) {
    logger.error('Failed to fetch courses overview', { error: err.message });
    res.status(500).json({ error: 'Failed to fetch courses overview' });
  }
}

async function getCourseAnalyticsHandler(req, res) {
  const { courseId } = req.params;
  try {
    const data = await fetchCourseAnalytics(courseId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch course analytics', { error: err.message, courseId });
    res.status(404).json({ error: err.message });
  }
}

async function getUserEngagementHandler(req, res) {
  const { userId } = req.params;
  try {
    const data = await fetchUserEngagement(userId);
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch user engagement', { error: err.message, userId });
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  getCoursesOverviewHandler,
  getCourseAnalyticsHandler,
  getUserEngagementHandler,
};
