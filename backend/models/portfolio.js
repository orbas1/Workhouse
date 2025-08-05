const { randomUUID } = require('crypto');

// In-memory storage for portfolio items
const portfolioItems = [];

function addItem(userId, { title, description = '', url = '', technologies = [], details = {} }) {
  const item = {
    id: randomUUID(),
    userId,
    title,
    description,
    url,
    technologies,
    details,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  portfolioItems.push(item);
  return item;
}

function getByUser(userId) {
  return portfolioItems.filter((item) => item.userId === userId);
}

function findById(projectId) {
  return portfolioItems.find((item) => item.id === projectId);
}

function addProjectDetail(projectId, details) {
  const item = findById(projectId);
  if (!item) return null;
  item.details = { ...item.details, ...details };
  item.updatedAt = new Date();
  return item;
}

module.exports = {
  portfolioItems,
  addItem,
  getByUser,
  findById,
  addProjectDetail,
};
