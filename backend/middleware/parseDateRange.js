const logger = require('../utils/logger');

/**
 * Middleware to parse startDate and endDate query params into Date objects.
 * Defaults to the last 7 days if not provided.
 * Attaches { start, end } to req.dateRange.
 */
module.exports = function parseDateRange(req, res, next) {
  const { startDate, endDate } = req.query;
  const start = startDate ? new Date(startDate) : new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const end = endDate ? new Date(endDate) : new Date();

  if (isNaN(start) || isNaN(end) || start > end) {
    logger.error('Invalid date range provided', { startDate, endDate });
    return res.status(400).json({ error: 'Invalid date range' });
  }

  req.dateRange = { start, end };
  next();
};
