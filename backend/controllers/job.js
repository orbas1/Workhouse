const logger = require('../utils/logger');
const {
  acceptJob,
  assignJob,
  createJob,
  getJobsByAgency,
  updateJob,
  deleteJob,
  getJobApplications,
  updateApplicationProgress,
} = require('../services/job');

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

async function updateApplicationProgressHandler(req, res) {
  const { agencyId, jobId, appId } = req.params;
  try {
    const application = await updateApplicationProgress(agencyId, jobId, appId, req.body);
    res.json(application);
  } catch (err) {
    logger.error('Failed to update application progress', { error: err.message, jobId, appId });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  acceptJobHandler,
  assignJobHandler,
  createJobHandler,
  listJobsHandler,
  updateJobHandler,
  deleteJobHandler,
  getJobApplicationsHandler,
  updateApplicationProgressHandler,
};
