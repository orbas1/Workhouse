const jobModel = require('../models/job');
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  const { jobId } = req.params;
  const job = jobModel.findById(jobId);
  if (!job) {
    logger.error('Job not found', { jobId });
    return res.status(404).json({ error: 'Job not found' });
  }
  req.job = job;
  next();
};
