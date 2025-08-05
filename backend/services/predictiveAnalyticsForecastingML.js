const logger = require('../utils/logger');
const model = require('../models/predictiveAnalyticsForecastingML');

async function predictUserRetention(days = 30) {
  const activities = model.getUserActivities();
  const threshold = Date.now() - days * 24 * 60 * 60 * 1000;
  const activeUsers = activities.filter(a => a.lastActive.getTime() >= threshold);
  const retentionRate = activities.length ? activeUsers.length / activities.length : 0;
  logger.info('Predicted user retention', { days, retentionRate });
  return { days, retentionRate };
}

async function forecastMarketTrends(industry, horizon = 30) {
  const history = model.getMarketHistory(industry).sort((a, b) => a.date - b.date);
  if (history.length < 2) {
    logger.error('Insufficient market history for forecasting', { industry });
    return { industry, horizon, forecast: [] };
  }
  const growthRates = [];
  for (let i = 1; i < history.length; i++) {
    const prev = history[i - 1].index;
    const curr = history[i].index;
    growthRates.push((curr - prev) / prev);
  }
  const avgGrowth = growthRates.reduce((sum, g) => sum + g, 0) / growthRates.length;
  let lastIndex = history[history.length - 1].index;
  const forecast = [];
  for (let i = 1; i <= horizon; i++) {
    lastIndex *= 1 + avgGrowth;
    forecast.push({ day: i, expectedIndex: parseFloat(lastIndex.toFixed(2)) });
  }
  logger.info('Generated market trend forecast', { industry, horizon });
  return { industry: industry || 'all', horizon, forecast };
}

module.exports = {
  predictUserRetention,
  forecastMarketTrends,
};
