const { randomUUID } = require('crypto');

// In-memory storage for learning outcomes and personalized paths
const learningOutcomes = new Map(); // courseId -> outcome record
const learningPaths = new Map(); // userId -> path record

function saveLearningOutcome(courseId, outcome, suggestions) {
  const record = {
    id: randomUUID(),
    courseId,
    outcome,
    suggestions,
    assessedAt: new Date(),
  };
  learningOutcomes.set(courseId, record);
  return record;
}

function getLearningOutcome(courseId) {
  return learningOutcomes.get(courseId) || null;
}

function saveLearningPath(userId, path) {
  const record = {
    id: randomUUID(),
    userId,
    path,
    createdAt: new Date(),
  };
  learningPaths.set(userId, record);
  return record;
}

function getLearningPath(userId) {
  return learningPaths.get(userId) || null;
}

module.exports = {
  saveLearningOutcome,
  getLearningOutcome,
  saveLearningPath,
  getLearningPath,
};
