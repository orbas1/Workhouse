const marketplace = require('../models/taskMarketplace');

async function createTask(req, res) {
  try {
    const task = marketplace.createTask(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

async function listTasks(req, res) {
  const tasks = marketplace.listTasks();
  res.json(tasks);
}

async function createProposal(req, res) {
  const { taskId } = req.params;
  const proposal = marketplace.createProposal({ taskId, ...req.body });
  if (!proposal) return res.status(404).json({ error: 'Task not found' });
  res.status(201).json(proposal);
}

async function listProposals(req, res) {
  const { taskId } = req.params;
  const list = marketplace.listProposals(taskId);
  res.json(list);
}

async function acceptProposal(req, res) {
  const { taskId, proposalId } = req.params;
  const result = marketplace.acceptProposal(taskId, proposalId);
  if (!result) return res.status(404).json({ error: 'Not found' });
  res.json(result);
}

async function closeTask(req, res) {
  const { taskId } = req.params;
  const task = marketplace.closeTask(taskId);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
}

async function findNearby(req, res) {
  const { lat, lng, radiusKm } = req.query;
  const tasks = marketplace.findTasksNearby({ lat: Number(lat), lng: Number(lng), radiusKm: Number(radiusKm) });
  res.json(tasks);
}

module.exports = {
  createTask,
  listTasks,
  createProposal,
  listProposals,
  acceptProposal,
  closeTask,
  findNearby,
};
