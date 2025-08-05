const { getGoal } = require('../models/userFeedbackAdjustment');
const goalModel = require('../models/goal');
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  const { goalId } = req.params;
  const goal = getGoal(goalId);
  const goal = goalModel.findGoalById(goalId);
  if (!goal) {
    logger.error('Goal not found', { goalId });
    return res.status(404).json({ error: 'Goal not found' });
  }
  req.goal = goal;
  next();
};
