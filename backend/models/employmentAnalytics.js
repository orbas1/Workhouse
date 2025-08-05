const { randomUUID } = require('crypto');

const jobs = new Map();
const applications = [];

function addJob({ title, status = 'open', views = 0, applications: appCount = 0, hires = 0 }) {
  const id = randomUUID();
  const job = { id, title, status, views, applications: appCount, hires };
  jobs.set(id, job);
  return job;
}

function recordApplication(jobId, status = 'pending') {
  const application = {
    id: randomUUID(),
    jobId,
    status,
    appliedAt: new Date(),
  };
  applications.push(application);
  const job = jobs.get(jobId);
  if (job) {
    job.applications += 1;
    if (status === 'hired') {
      job.hires += 1;
      job.status = 'closed';
    }
    jobs.set(jobId, job);
  }
  return application;
}

function getOverview() {
  let openJobs = 0;
  let closedJobs = 0;
  jobs.forEach(job => {
    if (job.status === 'open') openJobs += 1;
    if (job.status === 'closed') closedJobs += 1;
  });
  const hiredApplications = applications.filter(a => a.status === 'hired').length;
  return {
    totalJobs: jobs.size,
    openJobs,
    closedJobs,
    totalApplications: applications.length,
    hiredApplications,
  };
}

function getJobStats(jobId) {
  return jobs.get(jobId) || null;
}

function listJobs() {
  return Array.from(jobs.values());
}

function getApplicationStats() {
  const byStatus = applications.reduce((acc, curr) => {
    acc[curr.status] = (acc[curr.status] || 0) + 1;
    return acc;
  }, {});
  return {
    total: applications.length,
    byStatus,
  };
}

// Seed with sample data
(function seed() {
  const jobA = addJob({ title: 'Software Engineer', views: 150 });
  const jobB = addJob({ title: 'Project Manager', status: 'closed', views: 80, hires: 1 });
  recordApplication(jobA.id, 'pending');
  recordApplication(jobA.id, 'hired');
  recordApplication(jobB.id, 'rejected');
})();

module.exports = {
  addJob,
  recordApplication,
  getOverview,
  getJobStats,
  listJobs,
  getApplicationStats,
};
