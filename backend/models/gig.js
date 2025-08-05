const { randomUUID } = require('crypto');

// In-memory storage for gigs
const gigs = new Map();

function createGig({ title, description, category, tags = [], price, status = 'active', ownerId }) {
  const id = randomUUID();
  const now = new Date();
  const gig = {
    id,
    title,
    description,
    category,
    tags,
    price,
    status,
    ownerId,
    createdAt: now,
    updatedAt: now,
  };
  gigs.set(id, gig);
  return gig;
}

function listGigsByOwner(ownerId) {
  return Array.from(gigs.values()).filter(g => g.ownerId === ownerId);
}

function getGig(id) {
  return gigs.get(id);
}

function updateGig(id, updates) {
  const gig = gigs.get(id);
  if (!gig) return null;
  Object.assign(gig, updates, { updatedAt: new Date() });
  gigs.set(id, gig);
  return gig;
}

function removeGig(id) {
  return gigs.delete(id);
}

module.exports = {
  createGig,
  listGigsByOwner,
  getGig,
  updateGig,
  removeGig,
};
