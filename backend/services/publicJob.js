const jobModel = require('../models/job');

async function listJobs() {
  return jobModel.listJobs();
}

async function getJobById(jobId) {
  return jobModel.findById(jobId);
}

module.exports = { listJobs, getJobById };
