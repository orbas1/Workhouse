const {
  createMilestone,
  getMilestone,
  completeMilestone,
  setMilestoneReward,
  getNotifications,
} = require('../services/milestone');
const logger = require('../utils/logger');

async function createMilestoneHandler(req, res) {
  const { pathId } = req.params;
  const userId = req.user?.id || req.user?.username;
  try {
    const milestone = await createMilestone(pathId, req.body);
    res.status(201).json(milestone);
  } catch (err) {
    logger.error('Failed to create milestone', { error: err.message, pathId, userId });
    res.status(400).json({ error: err.message });
  }
}

async function getMilestoneHandler(req, res) {
  const { milestoneId } = req.params;
  try {
    const milestone = await getMilestone(milestoneId);
    res.json(milestone);
  } catch (err) {
    logger.error('Milestone not found', { error: err.message, milestoneId });
    res.status(404).json({ error: err.message });
  }
}

async function completeMilestoneHandler(req, res) {
  const { milestoneId } = req.params;
  const userId = req.user?.id || req.user?.username;
  try {
    const milestone = await completeMilestone(milestoneId, userId);
    res.json(milestone);
  } catch (err) {
    logger.error('Failed to complete milestone', { error: err.message, milestoneId, userId });
    res.status(404).json({ error: err.message });
  }
}

async function setMilestoneRewardHandler(req, res) {
  const { milestoneId } = req.params;
  try {
    const milestone = await setMilestoneReward(milestoneId, req.body.reward);
    res.json(milestone);
  } catch (err) {
    logger.error('Failed to set milestone reward', { error: err.message, milestoneId });
    res.status(404).json({ error: err.message });
  }
}

async function getNotificationsHandler(req, res) {
  const { userId } = req.params;
  try {
    const notifications = await getNotifications(userId);
    res.json(notifications);
  } catch (err) {
    logger.error('Failed to fetch milestone notifications', { error: err.message, userId });
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  createMilestoneHandler,
  getMilestoneHandler,
  completeMilestoneHandler,
  setMilestoneRewardHandler,
  getNotificationsHandler,
};
