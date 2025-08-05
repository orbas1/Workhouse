const { randomUUID } = require('crypto');

// In-memory data store for financial transactions keyed by agency ID.
// Each transaction: { id, type: 'income' | 'expense', amount, description, date }
const financialData = new Map();

function addTransaction(agencyId, { type, amount, description, date = new Date() }) {
  if (!['income', 'expense'].includes(type)) {
    throw new Error('Invalid transaction type');
  }
  const transaction = {
    id: randomUUID(),
    type,
    amount,
    description: description || null,
    date: new Date(date),
  };
  if (!financialData.has(agencyId)) {
    financialData.set(agencyId, []);
  }
  financialData.get(agencyId).push(transaction);
  return transaction;
}

function getTransactions(agencyId) {
  return financialData.get(agencyId) || [];
}

function calculateOverview(agencyId) {
  const transactions = getTransactions(agencyId);
  const earnings = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
  return { earnings, expenses, net: earnings - expenses };
}

function getMonthlyAggregates(agencyId) {
  const transactions = getTransactions(agencyId);
  const monthly = new Map();

  for (const t of transactions) {
    const month = new Date(t.date).toISOString().slice(0, 7); // YYYY-MM
    if (!monthly.has(month)) {
      monthly.set(month, { revenue: 0, expense: 0 });
    }
    const data = monthly.get(month);
    if (t.type === 'income') {
      data.revenue += t.amount;
    } else {
      data.expense += t.amount;
    }
  }

  return Array.from(monthly.entries()).map(([month, data]) => ({
    month,
    revenue: data.revenue,
    expense: data.expense,
    net: data.revenue - data.expense,
  }));
}

module.exports = {
  addTransaction,
  getTransactions,
  calculateOverview,
  getMonthlyAggregates,
};
