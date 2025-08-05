const { randomUUID } = require('crypto');

const marketTrends = [
  { id: randomUUID(), metric: 'jobGrowth', value: 12, recordedAt: new Date('2024-01-01') },
  { id: randomUUID(), metric: 'averageRate', value: 45, recordedAt: new Date('2024-02-01') },
];

const jobAnalytics = [
  { id: randomUUID(), jobId: '11111111-1111-1111-1111-111111111111', applications: 40, hires: 10, completionRate: 0.85, recordedAt: new Date('2024-02-15') },
  { id: randomUUID(), jobId: '22222222-2222-2222-2222-222222222222', applications: 25, hires: 5, completionRate: 0.9, recordedAt: new Date('2024-02-20') },
];

const freelancerStats = [
  { id: randomUUID(), freelancerId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', jobsCompleted: 30, ratingAvg: 4.7, earningsTotal: 15000, recordedAt: new Date('2024-02-28') },
  { id: randomUUID(), freelancerId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', jobsCompleted: 20, ratingAvg: 4.3, earningsTotal: 9000, recordedAt: new Date('2024-03-05') },
];

const clientSatisfaction = [
  { id: randomUUID(), clientId: '99999999-9999-9999-9999-999999999999', satisfactionScore: 4.5, feedbackCount: 12, recordedAt: new Date('2024-03-01') },
  { id: randomUUID(), clientId: '88888888-8888-8888-8888-888888888888', satisfactionScore: 4.2, feedbackCount: 8, recordedAt: new Date('2024-03-03') },
];

function filterByDate(data, startDate, endDate) {
  return data.filter(item => {
    const date = new Date(item.recordedAt);
    if (startDate && date < new Date(startDate)) return false;
    if (endDate && date > new Date(endDate)) return false;
    return true;
  });
}

function getMarketTrends(range = {}) {
  return filterByDate(marketTrends, range.startDate, range.endDate);
}

function getJobAnalytics(jobId) {
  return jobAnalytics.find(j => j.jobId === jobId);
}

function getFreelancerPerformance(freelancerId) {
  return freelancerStats.find(f => f.freelancerId === freelancerId);
}

function getClientSatisfaction(range = {}) {
  return filterByDate(clientSatisfaction, range.startDate, range.endDate);
}

module.exports = {
  getMarketTrends,
  getJobAnalytics,
  getFreelancerPerformance,
  getClientSatisfaction,
};
