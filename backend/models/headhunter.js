const { randomUUID } = require('crypto');

// In-memory collections for headhunter-related data
const tasks = [
  { id: randomUUID(), title: 'Screen frontend developer candidates', status: 'pending' },
  { id: randomUUID(), title: 'Schedule interview with Jane Doe', status: 'in-progress' },
];

const jobAllocations = [
  { id: randomUUID(), title: 'Backend Engineer', headhunterId: null },
];

const headhunters = new Map([
  [
    'hh1',
    {
      id: 'hh1',
      name: 'Alice Johnson',
      metrics: { candidatesSourced: 12, interviewsScheduled: 5, placementsMade: 3, successRate: 0.25 },
    },
  ],
  [
    'hh2',
    {
      id: 'hh2',
      name: 'Bob Smith',
      metrics: { candidatesSourced: 8, interviewsScheduled: 4, placementsMade: 2, successRate: 0.25 },
    },
  ],
]);

function listTasks() {
  return tasks;
}

function updateTaskStatus(id, status) {
  const task = tasks.find((t) => t.id === id);
  if (task) {
    task.status = status;
  }
  return task;
}

function listJobAllocations() {
  return jobAllocations;
}

function allocateJob(jobId, headhunterId) {
  const job = jobAllocations.find((j) => j.id === jobId);
  if (job) {
    job.headhunterId = headhunterId;
  }
  return job;
}

function listHeadhunters() {
  return Array.from(headhunters.values());
}

module.exports = {
  listTasks,
  updateTaskStatus,
  listJobAllocations,
  allocateJob,
  listHeadhunters,
};
