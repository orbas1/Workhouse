const goalModel = require('../models/goal');
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  const { milestoneId } = req.params;
  const milestone = goalModel.findMilestoneById(milestoneId);
  if (!milestone) {
    logger.error('Milestone not found', { milestoneId });
    return res.status(404).json({ error: 'Milestone not found' });
  }
  req.milestone = milestone;
  next();
};
