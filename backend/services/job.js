const logger = require('../utils/logger');
const jobModel = require('../models/job');
const employeeModel = require('../models/employee');

async function acceptJob(jobId, agencyId) {
  const job = jobModel.findById(jobId);
  if (!job) {
    throw new Error('Job not found');
  }
  if (job.status !== 'open') {
    throw new Error('Job is not available for acceptance');
  }
  jobModel.acceptJob(jobId, agencyId);
  logger.info('Job accepted', { jobId, agencyId });
  return jobModel.findById(jobId);
}

async function assignJob(jobId, employeeId, agencyId) {
  const job = jobModel.findById(jobId);
  if (!job) {
    throw new Error('Job not found');
  }
  if (job.status !== 'accepted') {
    throw new Error('Job must be accepted before assignment');
  }
  if (job.acceptedBy !== agencyId) {
    throw new Error('Agency not authorized to assign this job');
  }
  const employee = employeeModel.findById(employeeId);
  if (!employee) {
    throw new Error('Employee not found');
  }
  jobModel.assignJob(jobId, employeeId);
  logger.info('Job assigned', { jobId, employeeId, agencyId });
  return jobModel.findById(jobId);
}

module.exports = {
  acceptJob,
  assignJob,

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
