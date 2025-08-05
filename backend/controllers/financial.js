const { getFinancialOverview, generateFinancialForecast } = require('../services/financial');
const logger = require('../utils/logger');

async function getFinancialOverviewHandler(req, res) {
  const { agencyId } = req.params;
  try {
    const overview = await getFinancialOverview(agencyId);
    res.json(overview);
  } catch (err) {
    logger.error('Failed to retrieve financial overview', { error: err.message, agencyId });
    res.status(400).json({ error: err.message });
  }
}

async function generateFinancialForecastHandler(req, res) {
  const { agencyId } = req.params;
  try {
    const forecast = await generateFinancialForecast(agencyId, req.body);
    res.status(201).json(forecast);
  } catch (err) {
    logger.error('Failed to generate financial forecast', { error: err.message, agencyId });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getFinancialOverviewHandler,
  generateFinancialForecastHandler,
};
