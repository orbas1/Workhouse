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

module.exports = { create, list };
