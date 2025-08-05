const { randomUUID } = require('crypto');

const milestones = new Map();
const notifications = new Map();

function createMilestone(pathId, { title, description = '', dueDate = null }) {
  const id = randomUUID();
  const now = new Date();
  const milestone = {
    id,
    pathId,
    title,
    description,
    dueDate,
    reward: null,
    status: 'pending',
    completedAt: null,
    createdAt: now,
    updatedAt: now,
  };
  milestones.set(id, milestone);
  return milestone;
}

function getMilestoneById(id) {
  return milestones.get(id);
}

function completeMilestone(id, userId) {
  const milestone = milestones.get(id);
  if (!milestone) return null;
  milestone.status = 'completed';
  milestone.completedAt = new Date();
  milestone.updatedAt = new Date();
  milestones.set(id, milestone);
  createNotification(userId, id, `Milestone "${milestone.title}" completed`);
  return milestone;
}

function setReward(id, reward) {
  const milestone = milestones.get(id);
  if (!milestone) return null;
  milestone.reward = reward;
  milestone.updatedAt = new Date();
  milestones.set(id, milestone);
  return milestone;
}

function createNotification(userId, milestoneId, message) {
  const id = randomUUID();
  const notification = {
    id,
    userId,
    milestoneId,
    message,
    read: false,
    createdAt: new Date(),
  };
  notifications.set(id, notification);
  return notification;
}

function getNotificationsByUser(userId) {
  return Array.from(notifications.values()).filter((n) => n.userId === userId);
}

module.exports = {
  createMilestone,
  getMilestoneById,
  completeMilestone,
  setReward,
  createNotification,
  getNotificationsByUser,
};
