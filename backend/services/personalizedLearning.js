const logger = require('../utils/logger');
const model = require('../models/personalizedLearning');

async function getAdaptiveContent(userId) {
  const progress = model.getProgress(userId);
  let level = progress.level;
  const score = progress.lastAssessmentScore || 0;
  if (score >= 80) level = 'advanced';
  else if (score >= 50) level = 'intermediate';
  else level = 'beginner';

  const recommendedContent = {
    level,
    topics: progress.topics.length ? progress.topics : ['core concepts'],
  };

  model.saveProgress(userId, { level });
  logger.info('Generated adaptive content', { userId, level });
  return { userId, recommendedContent };
}

async function evaluateAssessment(userId, assessmentId, answers) {
  const total = answers.length;
  const correct = answers.filter(a => a.userAnswer === a.correctAnswer).length;
  const score = Math.round((correct / total) * 100);

  let feedback;
  if (score >= 80) feedback = 'Excellent progress!';
  else if (score >= 50) feedback = 'Good effort, keep improving.';
  else feedback = 'Needs improvement. Review the material.';

  model.saveProgress(userId, { lastAssessmentScore: score });
  const result = model.saveAssessmentResult({
    userId,
    assessmentId,
    score,
    feedback,
    evaluatedAt: new Date(),
  });

  logger.info('Assessment evaluated', { userId, assessmentId, score });
  return result;
}

module.exports = {
  getAdaptiveContent,
  evaluateAssessment,
};
