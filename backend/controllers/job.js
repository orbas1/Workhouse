const {
  createJob,
  getJobsByAgency,
  updateJob,
  deleteJob,
  getJobApplications,
} = require('../services/job');
const logger = require('../utils/logger');

async function createJobHandler(req, res) {
  const { agencyId } = req.params;
  try {
    const job = await createJob(agencyId, req.body);
    res.status(201).json(job);
  } catch (err) {
    logger.error('Failed to create job', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function listJobsHandler(req, res) {
  const { agencyId } = req.params;
  try {
    const jobs = await getJobsByAgency(agencyId);
    res.json(jobs);
  } catch (err) {
    logger.error('Failed to retrieve jobs', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function updateJobHandler(req, res) {
  const { agencyId, jobId } = req.params;
  try {
    const job = await updateJob(agencyId, jobId, req.body);
    res.json(job);
  } catch (err) {
    logger.error('Failed to update job', { error: err.message, jobId });
    res.status(404).json({ error: err.message });
  }
}

async function deleteJobHandler(req, res) {
  const { agencyId, jobId } = req.params;
  try {
    await deleteJob(agencyId, jobId);
    res.json({ message: 'Job deleted successfully' });
  } catch (err) {
    logger.error('Failed to delete job', { error: err.message, jobId });
    res.status(404).json({ error: err.message });
  }
}

async function getJobApplicationsHandler(req, res) {
  const { agencyId, jobId } = req.params;
  try {
    const applications = await getJobApplications(agencyId, jobId);
    res.json(applications);
  } catch (err) {
    logger.error('Failed to fetch job applications', { error: err.message, jobId });
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  createJobHandler,
  listJobsHandler,
  updateJobHandler,
  deleteJobHandler,
  getJobApplicationsHandler,
};
