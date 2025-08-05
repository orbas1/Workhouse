const { listJobs, getJobById } = require('../services/publicJob');
const logger = require('../utils/logger');

async function listJobsHandler(req, res) {
  try {
    const jobs = await listJobs();
    res.json(jobs);
  } catch (err) {
    logger.error('Failed to list jobs', { error: err.message });
    res.status(500).json({ error: 'Failed to list jobs' });
  }
}

async function getJobHandler(req, res) {
  try {
    const job = await getJobById(req.params.jobId);
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    res.json(job);
  } catch (err) {
    logger.error('Failed to get job', { error: err.message, jobId: req.params.jobId });
    res.status(500).json({ error: 'Failed to get job' });
  }
}

module.exports = { listJobsHandler, getJobHandler };
