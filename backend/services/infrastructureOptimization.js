const model = require('../models/infrastructureOptimization');
const logger = require('../utils/logger');

async function predictLoad(service, timeframe = '1h') {
  const base = Math.random() * 50 + 30; // base load between 30% and 80%
  const adjustment = timeframe === '24h' ? 10 : timeframe === '7d' ? 20 : 5;
  const predictedLoad = Math.min(100, base + adjustment);
  const record = model.addLoadPrediction({ service, timeframe, predictedLoad });
  logger.info('Generated infrastructure load prediction', { service, timeframe, predictedLoad });
  return record;
}

async function predictIncident(service) {
  const riskScore = Math.random(); // 0 (low) - 1 (high)
  const record = model.addIncidentPrediction({ service, riskScore });
  logger.info('Generated incident prediction', { service, riskScore });
  return record;
}

module.exports = {
  predictLoad,
  predictIncident,
};
