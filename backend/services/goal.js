const goalModel = require('../models/goal');
const logger = require('../utils/logger');

async function createGoal(userId, data) {
  const goal = goalModel.createGoal(userId, data);
  logger.info('Goal created', { goalId: goal.id, userId });
  return goal;
}

async function updateGoal(goalId, userId, updates) {
  const goal = goalModel.findGoalById(goalId);
  if (!goal || goal.userId !== userId) {
    throw new Error('Goal not found');
  }
  const updated = goalModel.updateGoal(goalId, updates);
  logger.info('Goal updated', { goalId });
  return updated;
}

async function deleteGoal(goalId, userId) {
  const goal = goalModel.findGoalById(goalId);
  if (!goal || goal.userId !== userId) {
    throw new Error('Goal not found');
  }
  goalModel.deleteGoal(goalId);
  logger.info('Goal deleted', { goalId });
}

async function listGoals(userId) {
  return goalModel.getGoalsByUser(userId);
}

async function createMilestone(goalId, userId, data) {
  const goal = goalModel.findGoalById(goalId);
  if (!goal || goal.userId !== userId) {
    throw new Error('Goal not found');
  }
  const milestone = goalModel.createMilestone(goalId, data);
  logger.info('Milestone created', { goalId, milestoneId: milestone.id });
  return milestone;
}

async function listMilestones(goalId, userId) {
  const goal = goalModel.findGoalById(goalId);
  if (!goal || goal.userId !== userId) {
    throw new Error('Goal not found');
  }
  return goalModel.getMilestonesByGoal(goalId);
}

async function updateMilestone(milestoneId, userId, updates) {
  const milestone = goalModel.findMilestoneById(milestoneId);
  if (!milestone) {
    throw new Error('Milestone not found');
  }
  const goal = goalModel.findGoalById(milestone.goalId);
  if (!goal || goal.userId !== userId) {
    throw new Error('Goal not found');
  }
  const updated = goalModel.updateMilestone(milestoneId, updates);
  logger.info('Milestone updated', { milestoneId });
  return updated;
}

async function deleteMilestone(milestoneId, userId) {
  const milestone = goalModel.findMilestoneById(milestoneId);
  if (!milestone) {
    throw new Error('Milestone not found');
  }
  const goal = goalModel.findGoalById(milestone.goalId);
  if (!goal || goal.userId !== userId) {
    throw new Error('Goal not found');
  }
  goalModel.deleteMilestone(milestoneId);
  logger.info('Milestone deleted', { milestoneId });
}

async function shareGoal(goalId, userId, { recipientId, message }) {
  const goal = goalModel.findGoalById(goalId);
  if (!goal || goal.userId !== userId) {
    throw new Error('Goal not found');
  }
  const share = goalModel.shareGoal(goalId, recipientId, userId, message);
  logger.info('Goal shared', { goalId, recipientId });
  return share;
}

async function getGoalRecommendations(userId) {
  const recommendations = [
    {
      title: 'Update your resume',
      description: 'Keep your resume current with latest achievements.',
    },
    {
      title: 'Complete a certification',
      description: 'Enhance skills with a relevant certification.',
    },
  ];
  logger.info('Goal recommendations generated', { userId });
  return recommendations;
}

module.exports = {
  createGoal,
  updateGoal,
  deleteGoal,
  listGoals,
  createMilestone,
  listMilestones,
  updateMilestone,
  deleteMilestone,
  shareGoal,
  getGoalRecommendations,
};
