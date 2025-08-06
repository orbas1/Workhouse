const { searchProfiles, addProfile } = require('../models/matchingEngine');
const {
  listTasks,
  updateTaskStatus,
  listJobAllocations,
  allocateJob,
  listHeadhunters,
} = require('../models/headhunter');

let seeded = false;
function seedCandidates() {
  if (seeded) return;
  addProfile({
    name: 'Jane Doe',
    role: 'jobseeker',
    skills: ['React', 'Node.js'],
    industry: 'tech',
    location: 'NY',
    experience: 5,
    salary: 95000,
  });
  addProfile({
    name: 'John Smith',
    role: 'jobseeker',
    skills: ['Python', 'Django'],
    industry: 'tech',
    location: 'SF',
    experience: 3,
    salary: 85000,
  });
  seeded = true;
}

function searchJobSeekers(req, res) {
  seedCandidates();
  const { q, skills, location, industry, minExperience, maxSalary } = req.query;
  const skillArr = skills ? skills.split(',') : [];
  let results = searchProfiles({
    role: 'jobseeker',
    skills: skillArr,
    industry,
    location,
    minExperience,
    maxSalary,
  });
  if (q) {
    const qLower = q.toLowerCase();
    results = results.filter((p) => p.name && p.name.toLowerCase().includes(qLower));
  }
  res.json(results);
}

function getRecommendations(req, res) {
  seedCandidates();
  const results = searchProfiles({ role: 'jobseeker' }).slice(0, 5);
  res.json(results);
}

function getTasks(req, res) {
  res.json(listTasks());
}

function patchTask(req, res) {
  const { id } = req.params;
  const { status } = req.body;
  const task = updateTaskStatus(id, status);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
}

function getJobAllocations(req, res) {
  res.json(listJobAllocations());
}

function postJobAllocation(req, res) {
  const { jobId, headhunterId } = req.body;
  const job = allocateJob(jobId, headhunterId);
  if (!job) return res.status(404).json({ error: 'Job not found' });
  res.json(job);
}

function getHeadhunters(req, res) {
  res.json(listHeadhunters());
}

module.exports = {
  searchJobSeekers,
  getRecommendations,
  getTasks,
  patchTask,
  getJobAllocations,
  postJobAllocation,
  getHeadhunters,
};
