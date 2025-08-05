const { getGoal } = require('../models/userFeedbackAdjustment');
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  const { goalId } = req.params;
  const goal = getGoal(goalId);
  if (!goal) {
    logger.error('Goal not found', { goalId });
    return res.status(404).json({ error: 'Goal not found' });
  }
  req.goal = goal;
  next();
};
