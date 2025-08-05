const logger = require('../utils/logger');

function logAnalyticsAccess(req, res, next) {
  logger.info('Live feed analytics accessed', {
    path: req.originalUrl,
    method: req.method,
    userId: req.user ? req.user.id : 'anonymous',
  });
  next();
}

module.exports = { logAnalyticsAccess };
