const {
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
} = require('../services/goal');
const logger = require('../utils/logger');

async function createGoalHandler(req, res) {
  const userId = req.user?.id || req.user?.username;
  try {
    const goal = await createGoal(userId, req.body);
    res.status(201).json(goal);
  } catch (err) {
    logger.error('Failed to create goal', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function updateGoalHandler(req, res) {
  const { goalId } = req.params;
  const userId = req.user?.id || req.user?.username;
  try {
    const goal = await updateGoal(goalId, userId, req.body);
    res.json(goal);
  } catch (err) {
    logger.error('Failed to update goal', { error: err.message, goalId, userId });
    res.status(404).json({ error: err.message });
  }
}

async function createMilestoneHandler(req, res) {
  const { goalId } = req.params;
  const userId = req.user?.id || req.user?.username;
  try {
    const milestone = await createMilestone(goalId, userId, req.body);
    res.status(201).json(milestone);
  } catch (err) {
    logger.error('Failed to create milestone', { error: err.message, goalId, userId });
    res.status(404).json({ error: err.message });
  }
}

async function getGoalRecommendationsHandler(req, res) {
  const { userId } = req.params;
  try {
    const recommendations = await getGoalRecommendations(userId);
    res.json(recommendations);
  } catch (err) {
    logger.error('Failed to get goal recommendations', { error: err.message, userId });
    res.status(500).json({ error: err.message });
  }
}

async function shareGoalHandler(req, res) {
  const { goalId } = req.params;
  const userId = req.user?.id || req.user?.username;
  try {
    const share = await shareGoal(goalId, userId, req.body);
    res.status(201).json(share);
  } catch (err) {
    logger.error('Failed to share goal', { error: err.message, goalId, userId });
    res.status(404).json({ error: err.message });
  }
}

async function listGoalsHandler(req, res) {
  const { userId } = req.params;
  try {
    const goals = await listGoals(userId);
    res.json(goals);
  } catch (err) {
    logger.error('Failed to list goals', { error: err.message, userId });
    res.status(500).json({ error: err.message });
  }
}

async function deleteGoalHandler(req, res) {
  const { goalId } = req.params;
  const userId = req.user?.id || req.user?.username;
  try {
    await deleteGoal(goalId, userId);
    res.json({ message: 'Goal deleted successfully' });
  } catch (err) {
    logger.error('Failed to delete goal', { error: err.message, goalId, userId });
    res.status(404).json({ error: err.message });
  }
}

async function listMilestonesHandler(req, res) {
  const { goalId } = req.params;
  const userId = req.user?.id || req.user?.username;
  try {
    const milestones = await listMilestones(goalId, userId);
    res.json(milestones);
  } catch (err) {
    logger.error('Failed to list milestones', { error: err.message, goalId, userId });
    res.status(404).json({ error: err.message });
  }
}

async function updateMilestoneHandler(req, res) {
  const { milestoneId } = req.params;
  const userId = req.user?.id || req.user?.username;
  try {
    const milestone = await updateMilestone(milestoneId, userId, req.body);
    res.json(milestone);
  } catch (err) {
    logger.error('Failed to update milestone', { error: err.message, milestoneId, userId });
    res.status(404).json({ error: err.message });
  }
}

async function deleteMilestoneHandler(req, res) {
  const { milestoneId } = req.params;
  const userId = req.user?.id || req.user?.username;
  try {
    await deleteMilestone(milestoneId, userId);
    res.json({ message: 'Milestone deleted successfully' });
  } catch (err) {
    logger.error('Failed to delete milestone', { error: err.message, milestoneId, userId });
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  createGoalHandler,
  updateGoalHandler,
  createMilestoneHandler,
  getGoalRecommendationsHandler,
  shareGoalHandler,
  listGoalsHandler,
  deleteGoalHandler,
  listMilestonesHandler,
  updateMilestoneHandler,
  deleteMilestoneHandler,
};
