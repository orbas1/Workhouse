const portfolioModel = require('../models/portfolio');
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  const { projectId } = req.params;
  const project = portfolioModel.findById(projectId);
  if (!project) {
    logger.error('Portfolio item not found', { projectId });
    return res.status(404).json({ error: 'Portfolio item not found' });
  }
  req.project = project;
  next();
};
