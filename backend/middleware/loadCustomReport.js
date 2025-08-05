const model = require('../models/externalDataML');
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  const { reportId } = req.params;
  const report = model.getReport(reportId);
  if (!report) {
    logger.error('Custom analytics report not found', { reportId });
    return res.status(404).json({ error: 'Report not found' });
  }
  req.report = report;
  next();
};
