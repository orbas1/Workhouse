const logger = require('../utils/logger');

/**
 * Parses optional startDate and endDate query parameters and attaches
 * normalized Date objects to req.analyticsQuery.
 * Defaults to the last 30 days if not provided.
 */
module.exports = function userAnalyticsQuery(req, res, next) {
  const { startDate, endDate } = req.query;
  let start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  let end = endDate ? new Date(endDate) : new Date();

  if (isNaN(start.getTime())) {
    logger.error('Invalid startDate', { startDate });
    return res.status(400).json({ error: 'Invalid startDate' });
  }
  if (isNaN(end.getTime())) {
    logger.error('Invalid endDate', { endDate });
    return res.status(400).json({ error: 'Invalid endDate' });
  }
  if (start > end) {
    logger.error('startDate occurs after endDate', { startDate, endDate });
    return res.status(400).json({ error: 'startDate must be before endDate' });
  }

  req.analyticsQuery = { startDate: start, endDate: end };
  next();
};

