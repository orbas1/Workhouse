const logger = require('../utils/logger');
const analyticsModel = require('../models/classroomAnalytics');

async function getEngagementAnalytics(classroomId) {
  const data = analyticsModel.findEngagementByClassroomId(classroomId);
  if (!data) {
    throw new Error('Engagement analytics not found for the specified classroom');
  }
  logger.info('Classroom engagement analytics retrieved', { classroomId });
  return data;
}

async function getCompletionAnalytics(classroomId) {
  const data = analyticsModel.findCompletionByClassroomId(classroomId);
  if (!data) {
    throw new Error('Completion analytics not found for the specified classroom');
  }
  logger.info('Classroom completion analytics retrieved', { classroomId });
  return data;
}

module.exports = {
  getEngagementAnalytics,
  getCompletionAnalytics,
};

