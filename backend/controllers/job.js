const { acceptJob, assignJob } = require('../services/job');
const logger = require('../utils/logger');

async function acceptJobHandler(req, res) {
  const { jobId } = req.params;
  const agencyId = req.user?.username;
  try {
    const job = await acceptJob(jobId, agencyId);
    res.json(job);
  } catch (err) {
    logger.error('Failed to accept job', { error: err.message, jobId, agencyId });
    res.status(400).json({ error: err.message });
  }
}

async function assignJobHandler(req, res) {
  const { jobId, employeeId } = req.params;
  const agencyId = req.user?.username;
  try {
    const job = await assignJob(jobId, employeeId, agencyId);
    res.json(job);
  } catch (err) {
    logger.error('Failed to assign job', { error: err.message, jobId, employeeId, agencyId });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  acceptJobHandler,
  assignJobHandler,
};
