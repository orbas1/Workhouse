const pathModel = require('../models/learningPath');
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  const { pathId } = req.params;
  const path = pathModel.findPathById(pathId);
  if (!path) {
    logger.error('Learning path not found', { pathId });
    return res.status(404).json({ error: 'Learning path not found' });
  }
  req.learningPath = path;
  next();
};
