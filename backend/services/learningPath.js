const pathModel = require('../models/learningPath');
const logger = require('../utils/logger');

async function createLearningPath(userId, data) {
  const path = pathModel.createPath(userId, data);
  logger.info('Learning path created', { pathId: path.id, userId });
  return path;
}

async function updateLearningPath(pathId, userId, updates) {
  const path = pathModel.findPathById(pathId);
  if (!path || path.userId !== userId) {
    throw new Error('Learning path not found');
  }
  const updated = pathModel.updatePath(pathId, updates);
  logger.info('Learning path updated', { pathId });
  return updated;
}

async function getLearningPath(pathId) {
  const path = pathModel.findPathById(pathId);
  if (!path) {
    throw new Error('Learning path not found');
  }
  return path;
}

async function buildLearningPath(userId, data) {
  const path = pathModel.createPath(userId, data);
  logger.info('Learning path built', { pathId: path.id, userId });
  return path;
}

async function shareLearningPath(pathId, userId, { recipientId, message }) {
  const path = pathModel.findPathById(pathId);
  if (!path || path.userId !== userId) {
    throw new Error('Learning path not found');
  }
  const share = pathModel.sharePath(pathId, recipientId, userId, message);
  logger.info('Learning path shared', { pathId, recipientId });
  return share;
}

async function getPopularLearningPaths() {
  return pathModel.listPopularPaths();
}

async function getLearningPathRecommendations(userId) {
  const recommendations = [
    {
      title: 'Full Stack Web Development',
      description: 'Start with HTML/CSS, then move to JavaScript and backend.',
    },
    {
      title: 'Data Science Basics',
      description: 'Python, statistics, and introductory machine learning.',
    },
  ];
  logger.info('Learning path recommendations generated', { userId });
  return recommendations;
}

module.exports = {
  createLearningPath,
  updateLearningPath,
  getLearningPath,
  buildLearningPath,
  shareLearningPath,
  getPopularLearningPaths,
  getLearningPathRecommendations,
};
