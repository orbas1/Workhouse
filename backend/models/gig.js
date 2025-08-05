const { randomUUID } = require('crypto');

// In-memory storage for gigs
const gigs = new Map();

function createGig({ title, description, category, tags = [], price, status = 'active', ownerId, rating = 0, thumbnail = '' }) {
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
    rating,
    thumbnail,
    createdAt: now,
    updatedAt: now,
  };
  gigs.set(id, gig);
  return gig;
}

function listGigsByOwner(ownerId) {
  return Array.from(gigs.values()).filter(g => g.ownerId === ownerId);
}

function searchGigs({ q, category, minPrice, maxPrice, minRating }) {
  q = q ? q.toLowerCase() : '';
  return Array.from(gigs.values()).filter(g => {
    if (q && !g.title.toLowerCase().includes(q)) return false;
    if (category && g.category !== category) return false;
    if (minPrice !== undefined && g.price < Number(minPrice)) return false;
    if (maxPrice !== undefined && g.price > Number(maxPrice)) return false;
    if (minRating !== undefined && (g.rating || 0) < Number(minRating)) return false;
    return true;
  });
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
  searchGigs,
  getGig,
  updateGig,
  removeGig,
};
