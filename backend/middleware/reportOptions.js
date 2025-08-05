const logger = require('../utils/logger');

function parseReportOptions(req, _res, next) {
  const { format } = req.query;
  req.reportOptions = {
    format: format === 'csv' ? 'csv' : 'json',
  };
  logger.info('Report options parsed', req.reportOptions);
  next();
}

module.exports = parseReportOptions;
