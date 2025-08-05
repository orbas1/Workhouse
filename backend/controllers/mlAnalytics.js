const {
  getRecommendations,
  getInsights,
  runCustomQuery,
  getContentPerformanceAnalysis,
  getUserBehaviorPatterns,
  getFinancialForecasting,
  getSentimentAnalysis,
} = require('../services/mlAnalytics');
const logger = require('../utils/logger');

async function recommendationsHandler(req, res) {
  const { userId } = req.params;
  try {
    const recommendations = await getRecommendations(userId);
    res.json({ userId, recommendations });
  } catch (err) {
    logger.error('Failed to fetch ML recommendations', { error: err.message, userId });
    res.status(500).json({ error: 'Failed to fetch recommendations' });
  }
}

async function insightsHandler(req, res) {
  const { domain } = req.params;
  try {
    const insights = await getInsights(domain);
    res.json({ domain, insights });
  } catch (err) {
    logger.error('Failed to fetch ML insights', { error: err.message, domain });
    res.status(500).json({ error: 'Failed to fetch insights' });
  }
}

async function customQueryHandler(req, res) {
  const { query, parameters } = req.body;
  try {
    const result = await runCustomQuery(query, parameters);
    res.status(201).json(result);
  } catch (err) {
    logger.error('Failed to execute custom ML query', { error: err.message, query });
    res.status(400).json({ error: 'Failed to execute query' });
  }
}

async function contentPerformanceHandler(req, res) {
  try {
    const analysis = await getContentPerformanceAnalysis();
    res.json({ analysis });
  } catch (err) {
    logger.error('Failed to fetch content performance analysis', { error: err.message });
    res.status(500).json({ error: 'Failed to fetch content performance' });
  }
}

async function userBehaviorHandler(req, res) {
  const { userId } = req.params;
  try {
    const patterns = await getUserBehaviorPatterns(userId);
    res.json({ userId, patterns });
  } catch (err) {
    logger.error('Failed to fetch user behavior patterns', { error: err.message, userId });
    res.status(500).json({ error: 'Failed to fetch user behavior patterns' });
  }
}

async function financialForecastingHandler(req, res) {
  try {
    const forecast = await getFinancialForecasting();
    res.json({ forecast });
  } catch (err) {
    logger.error('Failed to fetch financial forecast', { error: err.message });
    res.status(500).json({ error: 'Failed to fetch financial forecast' });
  }
}

async function sentimentAnalysisHandler(req, res) {
  const { domain } = req.params;
  try {
    const sentiment = await getSentimentAnalysis(domain);
    res.json({ domain, sentiment });
  } catch (err) {
    logger.error('Failed to fetch sentiment analysis', { error: err.message, domain });
    res.status(500).json({ error: 'Failed to fetch sentiment analysis' });
  }
}

module.exports = {
  recommendationsHandler,
  insightsHandler,
  customQueryHandler,
  contentPerformanceHandler,
  userBehaviorHandler,
  financialForecastingHandler,
  sentimentAnalysisHandler,
};

