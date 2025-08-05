const { randomUUID } = require('crypto');

const goals = new Map();
const milestones = new Map();
const shares = new Map();

function createGoal(userId, { title, description = '', dueDate = null }) {
  const id = randomUUID();
  const now = new Date();
  const goal = {
    id,
    userId,
    title,
    description,
    dueDate,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  };
  goals.set(id, goal);
  return goal;
}

function updateGoal(goalId, updates) {
  const goal = goals.get(goalId);
  if (!goal) return null;
  const updated = { ...goal, ...updates, updatedAt: new Date() };
  goals.set(goalId, updated);
  return updated;
}

function deleteGoal(goalId) {
  goals.delete(goalId);
  for (const [id, milestone] of milestones) {
    if (milestone.goalId === goalId) {
      milestones.delete(id);
    }
  }
  for (const [id, share] of shares) {
    if (share.goalId === goalId) {
      shares.delete(id);
    }
  }
}

function getGoalsByUser(userId) {
  return Array.from(goals.values()).filter((g) => g.userId === userId);
}

function findGoalById(goalId) {
  return goals.get(goalId);
}

function createMilestone(goalId, { title, description = '', dueDate = null }) {
  const id = randomUUID();
  const now = new Date();
  const milestone = {
    id,
    goalId,
    title,
    description,
    dueDate,
    status: 'pending',
    createdAt: now,
    updatedAt: now,
  };
  milestones.set(id, milestone);
  return milestone;
}

function getMilestonesByGoal(goalId) {
  return Array.from(milestones.values()).filter((m) => m.goalId === goalId);
}

function findMilestoneById(milestoneId) {
  return milestones.get(milestoneId);
}

function updateMilestone(milestoneId, updates) {
  const milestone = milestones.get(milestoneId);
  if (!milestone) return null;
  const updated = { ...milestone, ...updates, updatedAt: new Date() };
  milestones.set(milestoneId, updated);
  return updated;
}

function deleteMilestone(milestoneId) {
  milestones.delete(milestoneId);
}

function shareGoal(goalId, sharedWith, sharedBy, message = '') {
  const id = randomUUID();
  const now = new Date();
  const share = { id, goalId, sharedWith, sharedBy, message, createdAt: now };
  shares.set(id, share);
  return share;
}

module.exports = {
  createGoal,
  updateGoal,
  deleteGoal,
  getGoalsByUser,
  findGoalById,
  createMilestone,
  getMilestonesByGoal,
  findMilestoneById,
  updateMilestone,
  deleteMilestone,
  shareGoal,
};
