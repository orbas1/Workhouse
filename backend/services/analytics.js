const analyticsModel = require('../models/analytics');
const logger = require('../utils/logger');

async function getAgencyEarnings(agencyId, { startDate, endDate } = {}) {
  const records = analyticsModel.getEarningsByAgency(agencyId);
  if (records.length === 0) {
    throw new Error('No earnings data found for agency');
  }
  let filtered = records;
  if (startDate) {
    filtered = filtered.filter(r => r.date >= startDate);
  }
  if (endDate) {
    filtered = filtered.filter(r => r.date <= endDate);
  }
  const total = filtered.reduce((sum, r) => sum + r.amount, 0);
  logger.info('Earnings analytics retrieved', { agencyId, records: filtered.length });
  return { agencyId, totalEarnings: total, records: filtered };
}

async function getAgencyPerformance(agencyId, { startDate, endDate } = {}) {
  const records = analyticsModel.getPerformanceByAgency(agencyId);
  if (records.length === 0) {
    throw new Error('No performance data found for agency');
  }
  let filtered = records;
  if (startDate) {
    filtered = filtered.filter(r => r.periodStart >= startDate);
  }
  if (endDate) {
    filtered = filtered.filter(r => r.periodEnd <= endDate);
  }

  const employeeMap = new Map();
  let totalTasks = 0;
  let totalRating = 0;
  for (const r of filtered) {
    totalTasks += r.tasksCompleted;
    totalRating += r.rating;
    if (!employeeMap.has(r.employeeId)) {
      employeeMap.set(r.employeeId, { tasksCompleted: 0, ratingSum: 0, entries: 0 });
    }
    const stats = employeeMap.get(r.employeeId);
    stats.tasksCompleted += r.tasksCompleted;
    stats.ratingSum += r.rating;
    stats.entries += 1;
  }

  const employeeStats = Array.from(employeeMap.entries()).map(([employeeId, stats]) => ({
    employeeId,
    tasksCompleted: stats.tasksCompleted,
    averageRating: stats.entries ? stats.ratingSum / stats.entries : 0,
  }));

  const averageRating = filtered.length ? totalRating / filtered.length : 0;
  logger.info('Performance analytics retrieved', { agencyId, employees: employeeStats.length });
  return { agencyId, summary: { totalTasks, averageRating }, employeeStats };
}

module.exports = {
  getAgencyEarnings,
  getAgencyPerformance,
};
