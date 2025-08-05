const { randomUUID } = require('crypto');

// In-memory data representing live feed engagement and post analytics
const engagementMetrics = [
  { id: randomUUID(), metricDate: new Date('2024-01-01'), views: 1500, likes: 200, comments: 45, shares: 10 },
  { id: randomUUID(), metricDate: new Date('2024-02-01'), views: 2000, likes: 350, comments: 80, shares: 25 },
];

const postMetrics = [
  { id: randomUUID(), postId: '11111111-1111-1111-1111-111111111111', metricDate: new Date('2024-01-05'), views: 500, likes: 60, comments: 20, shares: 5 },
  { id: randomUUID(), postId: '22222222-2222-2222-2222-222222222222', metricDate: new Date('2024-02-10'), views: 800, likes: 120, comments: 40, shares: 15 },
];

function filterByDate(data, startDate, endDate) {
  return data.filter(item => {
    const date = new Date(item.metricDate);
    if (startDate && date < new Date(startDate)) return false;
    if (endDate && date > new Date(endDate)) return false;
    return true;
  });
}

function getEngagement(range = {}) {
  return filterByDate(engagementMetrics, range.startDate, range.endDate);
}

function getPostAnalytics(postId, range = {}) {
  return filterByDate(
    postMetrics.filter(m => m.postId === postId),
    range.startDate,
    range.endDate
  );
}

module.exports = {
  getEngagement,
  getPostAnalytics,
};
