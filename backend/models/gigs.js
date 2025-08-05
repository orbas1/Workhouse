const { randomUUID } = require('crypto');

// In-memory gig store for demo purposes
const gigs = [
  { id: randomUUID(), title: 'Logo Design', sellerId: 'user1', buyerId: 'user2', status: 'active', orders: 5 },
  { id: randomUUID(), title: 'Web Development', sellerId: 'user1', buyerId: 'user3', status: 'completed', orders: 2 },
  { id: randomUUID(), title: 'SEO Audit', sellerId: 'user4', buyerId: 'user1', status: 'in-progress', orders: 1 }
];

function getMyGigs(userId) {
  return gigs.filter(g => g.sellerId === userId);
}

function getAppliedGigs(userId) {
  return gigs.filter(g => g.buyerId === userId);
}

module.exports = { getMyGigs, getAppliedGigs };
