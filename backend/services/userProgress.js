const logger = require('../utils/logger');
const progressModel = require('../models/userProgress');

async function trackProgress(data) {
  const record = progressModel.addProgress(data);
  logger.info('Progress tracked', { userId: data.userId, courseId: data.courseId, progressId: record.id });
  return record;
}

async function getUserProgress(userId) {
  const entries = progressModel.listProgressByUser(userId);
  const summary = {};
  for (const entry of entries) {
    if (!summary[entry.courseId]) {
      summary[entry.courseId] = [];
    }
    summary[entry.courseId].push(entry.progress);
  }
  const courses = Object.keys(summary).map((courseId) => ({
    courseId,
    averageProgress: summary[courseId].reduce((a, b) => a + b, 0) / summary[courseId].length,
  }));
  return { userId, courses };
}

async function getCourseProgress(courseId, userId) {
  const entries = progressModel.listProgressByCourseForUser(courseId, userId);
  const average = entries.reduce((acc, e) => acc + e.progress, 0) / (entries.length || 1);
  return { userId, courseId, averageProgress: entries.length ? average : 0 };
}

async function getDetailedProgress(userId, courseId) {
  return progressModel.listProgressByCourseForUser(courseId, userId);
}

async function setLearningGoal(userId, data) {
  const goal = progressModel.addLearningGoal(userId, data);
  logger.info('Learning goal set', { userId, goalId: goal.id });
  return goal;
}

async function getLearningGoals(userId) {
  return progressModel.listLearningGoals(userId);
}

module.exports = {
  trackProgress,
  getUserProgress,
  getCourseProgress,
  getDetailedProgress,
  setLearningGoal,
  getLearningGoals,
};
