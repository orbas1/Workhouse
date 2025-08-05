const logger = require('../utils/logger');
const jobModel = require('../models/job');

async function createJob(agencyId, data) {
  const job = jobModel.createJob(agencyId, data);
  logger.info('Job created', { agencyId, jobId: job.id });
  return job;
}

async function getJobsByAgency(agencyId) {
  return jobModel.findJobsByAgency(agencyId);
}

async function updateJob(agencyId, jobId, updates) {
  const job = jobModel.findJobById(jobId);
  if (!job || job.agencyId !== agencyId) {
    throw new Error('Job not found');
  }
  const updated = jobModel.updateJob(jobId, updates);
  logger.info('Job updated', { jobId });
  return updated;
}

async function deleteJob(agencyId, jobId) {
  const job = jobModel.findJobById(jobId);
  if (!job || job.agencyId !== agencyId) {
    throw new Error('Job not found');
  }
  jobModel.deleteJob(jobId);
  logger.info('Job deleted', { jobId });
}

async function getJobApplications(agencyId, jobId) {
  const job = jobModel.findJobById(jobId);
  if (!job || job.agencyId !== agencyId) {
    throw new Error('Job not found');
  }
  return jobModel.getApplications(jobId);
}

module.exports = {
  createJob,
  getJobsByAgency,
  updateJob,
  deleteJob,
  getJobApplications,
};
