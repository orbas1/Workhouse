const { randomUUID } = require('crypto');

// In-memory mock data for demonstration purposes
const revenues = [
  { id: randomUUID(), amount: 10000, source: 'product sales', recordedAt: new Date('2024-01-15') },
  { id: randomUUID(), amount: 20000, source: 'services', recordedAt: new Date('2024-02-10') },
];

const expenses = [
  { id: randomUUID(), amount: 5000, category: 'marketing', recordedAt: new Date('2024-01-20') },
  { id: randomUUID(), amount: 3000, category: 'operations', recordedAt: new Date('2024-02-05') },
];

const cryptoTransactions = [
  { id: randomUUID(), amount: 0.5, currency: 'BTC', valueUSD: 15000, recordedAt: new Date('2024-02-01') },
  { id: randomUUID(), amount: 10, currency: 'ETH', valueUSD: 25000, recordedAt: new Date('2024-02-07') },
];

function filterByDate(data, startDate, endDate) {
  return data.filter(item => {
    const date = new Date(item.recordedAt);
    if (startDate && date < new Date(startDate)) return false;
    if (endDate && date > new Date(endDate)) return false;
    return true;
  });
}

function getRevenues(range = {}) {
  return filterByDate(revenues, range.startDate, range.endDate);
}

function getExpenses(range = {}) {
  return filterByDate(expenses, range.startDate, range.endDate);
}

function getCryptoTransactions(range = {}) {
  return filterByDate(cryptoTransactions, range.startDate, range.endDate);
}

function getOverview(range = {}) {
  const rev = getRevenues(range);
  const exp = getExpenses(range);
  const totalRevenue = rev.reduce((sum, r) => sum + r.amount, 0);
  const totalExpenses = exp.reduce((sum, e) => sum + e.amount, 0);
  const net = totalRevenue - totalExpenses;
  return { totalRevenue, totalExpenses, net };
}

module.exports = {
  getRevenues,
  getExpenses,
  getCryptoTransactions,
  getOverview,
};
