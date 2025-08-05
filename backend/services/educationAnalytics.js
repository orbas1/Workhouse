const logger = require('../utils/logger');
const model = require('../models/educationAnalytics');

async function fetchCoursesOverview() {
  const data = model.getCoursesOverview();
  logger.info('Fetched courses overview', { count: data.length });
  return data;
}

async function fetchCourseAnalytics(courseId) {
  const course = model.getCourseById(courseId);
  if (!course) {
    throw new Error('Course not found');
  }
  logger.info('Fetched course analytics', { courseId });
  return course;
}

async function fetchUserEngagement(userId) {
  const engagement = model.getUserEngagement(userId);
  if (!engagement) {
    throw new Error('User engagement not found');
  }
  logger.info('Fetched user engagement', { userId });
  return engagement;
}

module.exports = {
  fetchCoursesOverview,
  fetchCourseAnalytics,
  fetchUserEngagement,
};
