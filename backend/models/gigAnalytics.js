const { randomUUID } = require('crypto');

// In-memory stores for gig analytics
const gigs = new Map();
const marketTrends = [];

function addGig({ title, completed = 0, total = 0, satisfaction = 0 }) {
  const id = randomUUID();
  const gig = { id, title, completed, total, satisfaction };
  gigs.set(id, gig);
  return gig;
}

function fetchMarketTrends() {
  return marketTrends;
}

function fetchJobAnalytics(jobId) {
  return gigs.get(jobId) || null;
}

function fetchCompletionRates() {
  const stats = Array.from(gigs.values()).map(gig => ({
    id: gig.id,
    title: gig.title,
    completionRate: gig.total === 0 ? 0 : gig.completed / gig.total,
  }));
  const overallRate =
    stats.length === 0
      ? 0
      : stats.reduce((sum, g) => sum + g.completionRate, 0) / stats.length;
  return { overallRate, stats };
}

function fetchSatisfactionAnalytics() {
  const ratings = Array.from(gigs.values()).map(gig => gig.satisfaction);
  const averageSatisfaction =
    ratings.length === 0
      ? 0
      : ratings.reduce((sum, r) => sum + r, 0) / ratings.length;
  return { averageSatisfaction, ratings };
}

// Seed with sample data
(function seed() {
  const gigA = addGig({ title: 'Logo Design', completed: 80, total: 100, satisfaction: 4.5 });
  const gigB = addGig({ title: 'Web Development', completed: 40, total: 50, satisfaction: 4.2 });
  marketTrends.push(
    { month: '2024-01', posted: 200, completed: 150 },
    { month: '2024-02', posted: 250, completed: 200 }
  );
})();

module.exports = {
  addGig,
  fetchMarketTrends,
  fetchJobAnalytics,
  fetchCompletionRates,
  fetchSatisfactionAnalytics,
};
