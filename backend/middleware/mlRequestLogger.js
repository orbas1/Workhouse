const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  logger.info('ML request received', { path: req.originalUrl, user: req.user?.id });
  next();
};
