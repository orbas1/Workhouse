const { randomUUID } = require('crypto');

const initiatives = new Map();

function createInitiative({ title, description, startDate, endDate }) {
  const id = randomUUID();
  const now = new Date();
  const initiative = {
    id,
    title,
    description: description || '',
    startDate: startDate ? new Date(startDate) : null,
    endDate: endDate ? new Date(endDate) : null,
    status: 'active',
    createdAt: now,
    updatedAt: now,
  };
  initiatives.set(id, initiative);
  return initiative;
}

function getInitiatives() {
  return Array.from(initiatives.values());
}

module.exports = {
  createInitiative,
  getInitiatives,
};
