const { randomUUID } = require('crypto');
const { addPost } = require('./liveFeed');

const tasks = new Map();
const proposals = new Map();

function createTask({ title, description = '', price = 0, creatorId, maxTaskers = 1, postcode = null, location = null }) {
  const id = randomUUID();
  const task = {
    id,
    title,
    description,
    price,
    creatorId,
    maxTaskers,
    postcode,
    location,
    status: 'open',
    assignees: [],
    createdAt: new Date(),
  };
  tasks.set(id, task);
  addPost({ author: creatorId, content: `Task posted: ${title}`, category: 'tasks' });
  return task;
}

function listTasks() {
  return Array.from(tasks.values());
}

function createProposal({ taskId, bidderId, amount, message }) {
  if (!tasks.has(taskId)) return null;
  const id = randomUUID();
  const proposal = { id, taskId, bidderId, amount, message: message || '', status: 'pending', createdAt: new Date() };
  proposals.set(id, proposal);
  return proposal;
}

function listProposals(taskId) {
  return Array.from(proposals.values()).filter((p) => p.taskId === taskId);
}

function acceptProposal(taskId, proposalId) {
  const task = tasks.get(taskId);
  const proposal = proposals.get(proposalId);
  if (!task || !proposal || proposal.taskId !== taskId) return null;
  proposal.status = 'accepted';
  task.assignees.push(proposal.bidderId);
  if (task.assignees.length >= task.maxTaskers) {
    task.status = 'assigned';
  }
  tasks.set(taskId, task);
  proposals.set(proposalId, proposal);
  return { task, proposal };
}

function closeTask(taskId) {
  const task = tasks.get(taskId);
  if (!task) return null;
  task.status = 'closed';
  tasks.set(taskId, task);
  return task;
}

function haversineDistance(a, b) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad((b.lat || 0) - (a.lat || 0));
  const dLon = toRad((b.lng || 0) - (a.lng || 0));
  const lat1 = toRad(a.lat || 0);
  const lat2 = toRad(b.lat || 0);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return R * c;
}

function findTasksNearby({ lat, lng, radiusKm }) {
  const origin = { lat, lng };
  return Array.from(tasks.values()).filter(
    (t) => t.location && haversineDistance(origin, t.location) <= radiusKm
  );
}

module.exports = {
  createTask,
  listTasks,
  createProposal,
  listProposals,
  acceptProposal,
  closeTask,
  findTasksNearby,
};
