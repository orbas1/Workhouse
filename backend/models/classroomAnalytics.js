const { randomUUID } = require('crypto');

// In-memory data stores for classroom analytics
const engagementStore = new Map();
const completionStore = new Map();

// Seed with sample data for demonstration purposes
function seed() {
  if (engagementStore.size === 0) {
    const classroomId = randomUUID();
    engagementStore.set(classroomId, {
      classroomId,
      attendanceRate: 0.92,
      participationRate: 0.81,
      averageScore: 88.5,
      updatedAt: new Date(),
    });
    completionStore.set(classroomId, {
      classroomId,
      completionRate: 0.76,
      averageCompletionTime: 28, // days
      updatedAt: new Date(),
    });
  }
}

seed();

function findEngagementByClassroomId(classroomId) {
  return engagementStore.get(classroomId) || null;
}

function findCompletionByClassroomId(classroomId) {
  return completionStore.get(classroomId) || null;
}

module.exports = {
  findEngagementByClassroomId,
  findCompletionByClassroomId,
};

