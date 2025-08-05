const { predictUserRetention, forecastMarketTrends } = require('../services/predictiveAnalyticsForecastingML');
const logger = require('../utils/logger');

async function predictUserRetentionHandler(req, res) {
  try {
    const { days } = req.query;
    const data = await predictUserRetention(Number(days));
    res.json(data);
  } catch (err) {
    logger.error('Failed to predict user retention', { error: err.message });
    res.status(500).json({ error: 'Unable to predict user retention' });
  }
}

async function forecastMarketTrendsHandler(req, res) {
  try {
    const { industry, horizon } = req.query;
    const data = await forecastMarketTrends(industry, Number(horizon));
    res.json(data);
  } catch (err) {
    logger.error('Failed to forecast market trends', { error: err.message });
    res.status(500).json({ error: 'Unable to forecast market trends' });
  }
}

module.exports = {
  predictUserRetentionHandler,
  forecastMarketTrendsHandler,
};
