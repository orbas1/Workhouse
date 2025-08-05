const logger = require('../utils/logger');
const financialModel = require('../models/financial');

async function getFinancialOverview(agencyId) {
  const overview = financialModel.calculateOverview(agencyId);
  logger.info('Retrieved financial overview', { agencyId });
  return overview;
}

async function generateFinancialForecast(agencyId, { months, projectedContracts = [], projectedExpenses = [] }) {
  const aggregates = financialModel.getMonthlyAggregates(agencyId);
  const avgRevenue = aggregates.length
    ? aggregates.reduce((sum, m) => sum + m.revenue, 0) / aggregates.length
    : 0;
  const avgExpense = aggregates.length
    ? aggregates.reduce((sum, m) => sum + m.expense, 0) / aggregates.length
    : 0;

  const totalContractValue = projectedContracts.reduce((sum, c) => sum + c.value, 0);
  const totalAdditionalExpense = projectedExpenses.reduce((sum, e) => sum + e.amount, 0);

  const monthlyContractRevenue = months > 0 ? totalContractValue / months : 0;
  const monthlyAdditionalExpense = months > 0 ? totalAdditionalExpense / months : 0;

  const forecast = [];
  for (let i = 1; i <= months; i++) {
    const projectedRevenue = avgRevenue + monthlyContractRevenue;
    const projectedExpense = avgExpense + monthlyAdditionalExpense;
    const projectedNet = projectedRevenue - projectedExpense;
    forecast.push({
      month: i,
      projectedRevenue,
      projectedExpense,
      projectedNet,
    });
  }

  logger.info('Generated financial forecast', { agencyId, months });
  return {
    forecast,
    assumptions: {
      avgRevenue,
      avgExpense,
      monthlyContractRevenue,
      monthlyAdditionalExpense,
    },
  };
}

module.exports = { getFinancialOverview, generateFinancialForecast };
