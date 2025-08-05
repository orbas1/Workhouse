const { randomUUID } = require('crypto');
const logger = require('../utils/logger');
const model = require('../models/aiEnhancedLearningDevelopment');

async function assessLearningOutcomes(courseId) {
  let record = model.getLearningOutcome(courseId);
  if (!record) {
    const outcome = {
      completionRate: Math.round(Math.random() * 100) / 100,
      averageScore: Math.round(Math.random() * 40) + 60,
    };
    const suggestions = [
      'Introduce more interactive exercises',
      'Provide periodic knowledge checks',
    ];
    record = model.saveLearningOutcome(courseId, outcome, suggestions);
    logger.info('Learning outcomes assessed', { courseId });
  }
  return record;
}

async function customizeLearningPath(userId) {
  let record = model.getLearningPath(userId);
  if (!record) {
    const path = [
      { id: randomUUID(), type: 'course', title: 'Intro to AI Concepts' },
      { id: randomUUID(), type: 'article', title: 'Best Practices for E-Learning' },
    ];
    record = model.saveLearningPath(userId, path);
    logger.info('Custom learning path generated', { userId });
  }
  return record;
}

module.exports = {
  assessLearningOutcomes,
  customizeLearningPath,
};
