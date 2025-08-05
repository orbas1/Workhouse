const { randomUUID } = require('crypto');

const recommendations = [];
const insights = [];
const customQueries = [];
const contentPerformance = [];
const userPatterns = [];
const financialForecasts = [];
const sentiments = [];

function seedData() {
  if (recommendations.length === 0) {
    recommendations.push(
      { id: randomUUID(), userId: 'user-1', items: ['Complete profile', 'Explore AI course'], createdAt: new Date() },
      { id: randomUUID(), userId: 'user-2', items: ['Join gig project', 'Watch webinar'], createdAt: new Date() },
    );
  }
  if (insights.length === 0) {
    insights.push(
      { id: randomUUID(), domain: 'employment', insight: { trend: 'remote shift', confidence: 0.82 }, createdAt: new Date() },
      { id: randomUUID(), domain: 'education', insight: { trend: 'microlearning growth', confidence: 0.75 }, createdAt: new Date() },
    );
  }
  if (contentPerformance.length === 0) {
    contentPerformance.push(
      { id: randomUUID(), contentId: 'article-1', metrics: { views: 1200, completionRate: 0.85 }, createdAt: new Date() },
      { id: randomUUID(), contentId: 'course-2', metrics: { enrollments: 300, completionRate: 0.65 }, createdAt: new Date() },
    );
  }
  if (userPatterns.length === 0) {
    userPatterns.push(
      { id: randomUUID(), userId: 'user-1', patterns: { preferredContent: ['articles', 'courses'], churnRisk: 0.1 }, createdAt: new Date() },
    );
  }
  if (financialForecasts.length === 0) {
    financialForecasts.push(
      { id: randomUUID(), forecast: { nextQuarterRevenue: 50000, growth: 0.08 }, createdAt: new Date() },
    );
  }
  if (sentiments.length === 0) {
    sentiments.push(
      { id: randomUUID(), domain: 'education', sentiment: { score: 0.7, magnitude: 0.9 }, createdAt: new Date() },
    );
  }
}

seedData();

function findRecommendationsByUser(userId) {
  return recommendations.filter(r => r.userId === userId);
}

function findInsightsByDomain(domain) {
  return insights.filter(i => i.domain === domain);
}

function addCustomQuery(query, parameters) {
  const result = { summary: `Results for ${query}` };
  const entry = { id: randomUUID(), query, parameters, result, createdAt: new Date() };
  customQueries.push(entry);
  return entry;
}

function getContentPerformance() {
  return contentPerformance;
}

function findUserBehaviorByUser(userId) {
  return userPatterns.filter(p => p.userId === userId);
}

function getFinancialForecast() {
  return financialForecasts[0];
}

function findSentimentByDomain(domain) {
  return sentiments.filter(s => s.domain === domain);
}

module.exports = {
  findRecommendationsByUser,
  findInsightsByDomain,
  addCustomQuery,
  getContentPerformance,
  findUserBehaviorByUser,
  getFinancialForecast,
  findSentimentByDomain,
};

