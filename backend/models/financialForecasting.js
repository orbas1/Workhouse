const { randomUUID } = require('crypto');

// Mock forecast data for demonstration. In a real application, this would be
// retrieved from a database or forecasting engine.
const salesForecasts = [
  { id: randomUUID(), date: new Date('2024-03-01'), amount: 12000 },
  { id: randomUUID(), date: new Date('2024-04-01'), amount: 15000 },
];

const expenseForecasts = [
  { id: randomUUID(), date: new Date('2024-03-01'), amount: 8000 },
  { id: randomUUID(), date: new Date('2024-04-01'), amount: 9000 },
];

const trendForecasts = [
  { id: randomUUID(), date: new Date('2024-03-01'), trend: 'steady' },
  { id: randomUUID(), date: new Date('2024-04-01'), trend: 'growth' },
];

function filterByDate(data, startDate, endDate) {
  return data.filter((item) => {
    const d = new Date(item.date);
    if (startDate && d < new Date(startDate)) return false;
    if (endDate && d > new Date(endDate)) return false;
    return true;
  });
}

function getSalesForecast(range = {}) {
  return filterByDate(salesForecasts, range.startDate, range.endDate);
}

function getExpenseForecast(range = {}) {
  return filterByDate(expenseForecasts, range.startDate, range.endDate);
}

function getProfitForecast(range = {}) {
  const sales = getSalesForecast(range);
  const expenses = getExpenseForecast(range);
  return sales.map((s, idx) => ({
    date: s.date,
    amount: s.amount - (expenses[idx]?.amount || 0),
  }));
}

function getTrends(range = {}) {
  return filterByDate(trendForecasts, range.startDate, range.endDate);
}

function createCustomForecast({ startDate, endDate, revenue, expenses, growthRate = 0 }) {
  const results = [];
  const start = new Date(startDate);
  const end = new Date(endDate);
  let currentRevenue = revenue;
  let currentExpenses = expenses;

  for (let d = new Date(start); d <= end; d.setMonth(d.getMonth() + 1)) {
    results.push({
      date: new Date(d),
      revenue: currentRevenue,
      expenses: currentExpenses,
      profit: currentRevenue - currentExpenses,
    });
    currentRevenue *= 1 + growthRate;
    currentExpenses *= 1 + growthRate * 0.5; // Assume expenses grow half as fast
  }

  return results;
}

module.exports = {
  getSalesForecast,
  getExpenseForecast,
  getProfitForecast,
  getTrends,
  createCustomForecast,
};
