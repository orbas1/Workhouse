const { randomUUID } = require('crypto');

const insights = [];
const recommendations = [];

function seedData() {
  if (insights.length === 0) {
    insights.push(
      { id: randomUUID(), domain: 'employment', insight: { trend: 'remote work increase', score: 0.87 }, createdAt: new Date() },
      { id: randomUUID(), domain: 'freelance', insight: { trend: 'gig economy growth', score: 0.76 }, createdAt: new Date() },
      { id: randomUUID(), domain: 'education', insight: { trend: 'online learning adoption', score: 0.92 }, createdAt: new Date() }
    );
  }
  if (recommendations.length === 0) {
    recommendations.push(
      { id: randomUUID(), userId: 'user-1', recommendations: ['Take AI course', 'Update portfolio'], createdAt: new Date() },
      { id: randomUUID(), userId: 'user-2', recommendations: ['Apply for remote jobs', 'Join freelancer community'], createdAt: new Date() }
    );
  }
}

seedData();

function findInsightsByDomain(domain) {
  return insights.filter(i => i.domain === domain);
}

function findRecommendationsByUser(userId) {
  return recommendations.filter(r => r.userId === userId);
}

module.exports = {
  findInsightsByDomain,
  findRecommendationsByUser,
};
