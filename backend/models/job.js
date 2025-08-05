const { randomUUID } = require('crypto');

const jobs = new Map();
const jobApplications = new Map();

function createJob(agencyId, { title, description, budget = null, deadline = null }) {
  const id = randomUUID();
  const timestamp = new Date();
  const job = {
    id,
    agencyId: agencyId || null,
    title,
    description: description || '',
    budget,
    deadline,
    status: 'open',
    acceptedBy: null,
    acceptedAt: null,
    assignedTo: null,
    assignedAt: null,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  jobs.set(id, job);
  jobApplications.set(id, []);
  return job;
}

function findById(id) {
  return jobs.get(id);
}

function listJobs() {
  return Array.from(jobs.values());
}

function findJobsByAgency(agencyId) {
  return Array.from(jobs.values()).filter((job) => job.agencyId === agencyId);
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

function acceptJob(id, agencyId) {
  const job = jobs.get(id);
  if (!job) return null;
  job.status = 'accepted';
  job.acceptedBy = agencyId;
  job.acceptedAt = new Date();
  job.updatedAt = new Date();
  jobs.set(id, job);
  return job;
}

function assignJob(id, employeeId) {
  const job = jobs.get(id);
  if (!job) return null;
  job.status = 'assigned';
  job.assignedTo = employeeId;
  job.assignedAt = new Date();
  job.updatedAt = new Date();
  jobs.set(id, job);
  return job;
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
  findById,
  listJobs,
  findJobsByAgency,
  updateJob,
  deleteJob,
  acceptJob,
  assignJob,
  addApplication,
  getApplications,
};
