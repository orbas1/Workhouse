const { randomUUID } = require('crypto');

// In-memory store for user progress and learning goals
const progressRecords = [];
const learningGoals = [];

function addProgress({ userId, courseId, activity, progress, details, trackedAt = new Date() }) {
  const record = {
    id: randomUUID(),
    userId,
    courseId,
    activity: activity || null,
    progress,
    details: details || null,
    trackedAt,
    updatedAt: new Date(),
  };
  progressRecords.push(record);
  return record;
}

function listProgressByUser(userId) {
  return progressRecords.filter((p) => p.userId === userId);
}

function listProgressByCourseForUser(courseId, userId) {
  return progressRecords.filter((p) => p.userId === userId && p.courseId === courseId);
}

function addLearningGoal(userId, { goal, targetDate }) {
  const record = {
    id: randomUUID(),
    userId,
    goal,
    targetDate: targetDate ? new Date(targetDate) : null,
    createdAt: new Date(),
  };
  learningGoals.push(record);
  return record;
}

function listLearningGoals(userId) {
  return learningGoals.filter((g) => g.userId === userId);
}

module.exports = {
  addProgress,
  listProgressByUser,
  listProgressByCourseForUser,
  addLearningGoal,
  listLearningGoals,
};

