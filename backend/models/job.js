const { randomUUID } = require('crypto');

const jobs = new Map();
const jobApplications = new Map();

function createJob(agencyId, { title, description, budget = null, deadline = null }) {
  const id = randomUUID();
  const timestamp = new Date();
  const job = {
    id,
    agencyId,
    title,
    description,
    budget,
    deadline,
    status: 'open',
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  jobs.set(id, job);
  jobApplications.set(id, []);
  return job;
}

function findJobsByAgency(agencyId) {
  return Array.from(jobs.values()).filter(job => job.agencyId === agencyId);
}

function findJobById(jobId) {
  return jobs.get(jobId);
}

function updateJob(jobId, updates) {
  const job = jobs.get(jobId);
  if (!job) return null;
  const updated = { ...job, ...updates, updatedAt: new Date() };
  jobs.set(jobId, updated);
  return updated;
}

function deleteJob(jobId) {
  jobs.delete(jobId);
  jobApplications.delete(jobId);
}

function addApplication(jobId, application) {
  const apps = jobApplications.get(jobId);
  if (!apps) return null;
  const record = { id: randomUUID(), appliedAt: new Date(), ...application };
  apps.push(record);
  return record;
}

function getApplications(jobId) {
  return jobApplications.get(jobId) || [];
}

module.exports = {
  createJob,
  findJobsByAgency,
  findJobById,
  updateJob,
  deleteJob,
  addApplication,
  getApplications,
};

