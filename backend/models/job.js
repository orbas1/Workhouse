const { randomUUID } = require('crypto');

const jobs = new Map();

function createJob({ title, description, agencyId }) {
  const id = randomUUID();
  const timestamp = new Date();
  const job = {
    id,
    title,
    description: description || '',
    agencyId: agencyId || null,
    status: 'open',
    acceptedBy: null,
    acceptedAt: null,
    assignedTo: null,
    assignedAt: null,
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  jobs.set(id, job);
  return job;
}

function findById(id) {
  return jobs.get(id);
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

module.exports = {
  createJob,
  findById,
  acceptJob,
  assignJob,
};
