const { randomUUID } = require('crypto');

const items = [];

function create(data) {
  const id = randomUUID();
  const item = {
    id,
    type: data.type,
    title: data.title,
    description: data.description,
    tags: data.tags || [],
    categories: data.categories || [],
    duration: data.duration || 0,
    coverImage: data.coverImage || null,
    promoVideo: data.promoVideo || null,
    audioUrl: data.audioUrl || null,
    slidesUrl: data.slidesUrl || null,
    publishAt: data.publishAt || null,
    visibility: data.visibility || 'public',
    price: data.price || 0,
    status: data.status || 'draft',
    ownerId: data.ownerId,
  };
  items.push(item);
  return item;
}

function list(type) {
  return type ? items.filter((i) => i.type === type) : items;
}

function findById(id) {
  return items.find((i) => i.id === id);
}

function update(id, data) {
  const idx = items.findIndex((i) => i.id === id);
  if (idx === -1) return null;
  items[idx] = { ...items[idx], ...data };
  return items[idx];
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

module.exports = { create, list, update, remove, findById, updateStatus };
