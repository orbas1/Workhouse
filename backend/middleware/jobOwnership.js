const jobModel = require('../models/job');
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  const { agencyId, jobId } = req.params;
  const job = jobModel.findJobById(jobId);
  if (!job || job.agencyId !== agencyId) {
    logger.error('Job not found or unauthorized access', { agencyId, jobId });
    return res.status(404).json({ error: 'Job not found' });
  }
  req.job = job;
  next();
};
