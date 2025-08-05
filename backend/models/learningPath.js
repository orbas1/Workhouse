const { randomUUID } = require('crypto');

const paths = new Map();
const shares = new Map();

function createPath(userId, { title, description = '', courses = [] }) {
  const id = randomUUID();
  const now = new Date();
  const path = {
    id,
    userId,
    title,
    description,
    courses,
    rating: 0,
    createdAt: now,
    updatedAt: now,
  };
  paths.set(id, path);
  return path;
}

function updatePath(pathId, updates) {
  const path = paths.get(pathId);
  if (!path) return null;
  const updated = { ...path, ...updates, updatedAt: new Date() };
  paths.set(pathId, updated);
  return updated;
}

function findPathById(pathId) {
  return paths.get(pathId);
}

function listPopularPaths() {
  return Array.from(paths.values())
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 10);
}

function sharePath(pathId, sharedWith, sharedBy, message = '') {
  const id = randomUUID();
  const now = new Date();
  const share = { id, pathId, sharedWith, sharedBy, message, createdAt: now };
  shares.set(id, share);
  return share;
}

function getSharesByPath(pathId) {
  return Array.from(shares.values()).filter((s) => s.pathId === pathId);
}

module.exports = {
  createPath,
  updatePath,
  findPathById,
  listPopularPaths,
  sharePath,
  getSharesByPath,
};
