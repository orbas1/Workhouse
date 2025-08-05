const { randomUUID } = require('crypto');

// In-memory storage for trending topics and curated feeds
const trendingTopics = [];
const curatedFeeds = [];

// Seed with some default topics for demonstration
trendingTopics.push(
  { id: randomUUID(), topic: 'AI in Education', score: 95, createdAt: new Date() },
  { id: randomUUID(), topic: 'Remote Work Best Practices', score: 88, createdAt: new Date() },
  { id: randomUUID(), topic: 'Cybersecurity Trends', score: 80, createdAt: new Date() }
);

function getTrendingTopics(limit = 10) {
  return trendingTopics
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

function saveCuratedFeed({ userId, interests = [], interactions = [], feedback = [], curatedContent }) {
  const record = {
    id: randomUUID(),
    userId,
    interests,
    interactions,
    feedback,
    curatedContent,
    createdAt: new Date(),
  };
  curatedFeeds.push(record);
  return record;
}

module.exports = {
  getTrendingTopics,
  saveCuratedFeed,
};
