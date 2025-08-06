const { randomUUID } = require('crypto');

const items = [];

function create({ type, title, description, ownerId }) {
  const id = randomUUID();
  const item = { id, type, title, description, status: 'draft', ownerId };
  items.push(item);
  return item;
}

function list(type) {
  if (type) {
    return items.filter((i) => i.type === type);
  }
  return items;
}

function findById(id) {
  return items.find((i) => i.id === id);
}

function updateStatus(id, status) {
  const item = findById(id);
  if (!item) return null;
  item.status = status;
  return item;
}

function remove(id) {
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return false;
  items.splice(idx, 1);
  return true;
}

module.exports = { create, list, findById, updateStatus, remove };
