const milestoneModel = require('../models/milestone');
const logger = require('../utils/logger');

async function createMilestone(pathId, data) {
  const milestone = milestoneModel.createMilestone(pathId, data);
  logger.info('Milestone created', { pathId, milestoneId: milestone.id });
  return milestone;
}

async function getMilestone(milestoneId) {
  const milestone = milestoneModel.getMilestoneById(milestoneId);
  if (!milestone) {
    throw new Error('Milestone not found');
  }
  return milestone;
}

async function completeMilestone(milestoneId, userId) {
  const milestone = milestoneModel.completeMilestone(milestoneId, userId);
  if (!milestone) {
    throw new Error('Milestone not found');
  }
  logger.info('Milestone completed', { milestoneId, userId });
  return milestone;
}

async function setMilestoneReward(milestoneId, reward) {
  const milestone = milestoneModel.setReward(milestoneId, reward);
  if (!milestone) {
    throw new Error('Milestone not found');
  }
  logger.info('Milestone reward set', { milestoneId });
  return milestone;
}

async function getNotifications(userId) {
  return milestoneModel.getNotificationsByUser(userId);
}

module.exports = {
  createMilestone,
  getMilestone,
  completeMilestone,
  setMilestoneReward,
  getNotifications,
};
