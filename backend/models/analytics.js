const { randomUUID } = require('crypto');

const earnings = new Map(); // agencyId => [{ id, date, amount }]
const performance = new Map(); // agencyId => [{ id, employeeId, tasksCompleted, rating, periodStart, periodEnd }]

function addEarning(agencyId, amount, date = new Date()) {
  const record = {
    id: randomUUID(),
    date: new Date(date),
    amount: Number(amount),
  };
  const list = earnings.get(agencyId) || [];
  list.push(record);
  earnings.set(agencyId, list);
  return record;
}

function getEarningsByAgency(agencyId) {
  return earnings.get(agencyId) || [];
}

function addPerformance(
  agencyId,
  employeeId,
  tasksCompleted,
  rating,
  periodStart = new Date(),
  periodEnd = new Date()
) {
  const record = {
    id: randomUUID(),
    employeeId,
    tasksCompleted: Number(tasksCompleted),
    rating: Number(rating),
    periodStart: new Date(periodStart),
    periodEnd: new Date(periodEnd),
  };
  const list = performance.get(agencyId) || [];
  list.push(record);
  performance.set(agencyId, list);
  return record;
}

function getPerformanceByAgency(agencyId) {
  return performance.get(agencyId) || [];
}

module.exports = {
  addEarning,
  getEarningsByAgency,
  addPerformance,
  getPerformanceByAgency,
};
