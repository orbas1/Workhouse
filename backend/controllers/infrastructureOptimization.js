const { predictLoad, predictIncident } = require('../services/infrastructureOptimization');
const logger = require('../utils/logger');

async function getLoadPredictionHandler(req, res) {
  const { service, timeframe } = req.query;
  try {
    const prediction = await predictLoad(service, timeframe);
    res.json(prediction);
  } catch (err) {
    logger.error('Load prediction failed', { error: err.message, service, timeframe });
    res.status(500).json({ error: 'Failed to generate load prediction' });
  }
}

async function getIncidentPredictionHandler(req, res) {
  const { service } = req.query;
  try {
    const prediction = await predictIncident(service);
    res.json(prediction);
  } catch (err) {
    logger.error('Incident prediction failed', { error: err.message, service });
    res.status(500).json({ error: 'Failed to generate incident prediction' });
  }
}

module.exports = {
  getLoadPredictionHandler,
  getIncidentPredictionHandler,
};
