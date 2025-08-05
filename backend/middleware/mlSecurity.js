const logger = require('../utils/logger');

function mlSecurityLogger(req, res, next) {
  logger.info('ML security request', { path: req.originalUrl, user: req.user?.username });
  next();
}

module.exports = { mlSecurityLogger };

