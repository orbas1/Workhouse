const {
  getThreatDetections,
  getEfficiencyAnalysis,
  getApiUsageOptimization,
} = require('../services/operationalEfficiencySecurityMl');
const logger = require('../utils/logger');

async function threatDetectionHandler(req, res) {
  try {
    const data = await getThreatDetections(req.dateRange);
    res.json(data);
  } catch (err) {
    logger.error('Failed to perform threat detection', { error: err.message });
    res.status(500).json({ error: 'Failed to perform threat detection' });
  }
}

async function efficiencyAnalysisHandler(req, res) {
  try {
    const data = await getEfficiencyAnalysis(req.dateRange);
    res.json(data);
  } catch (err) {
    logger.error('Failed to analyze operational efficiency', { error: err.message });
    res.status(500).json({ error: 'Failed to analyze operational efficiency' });
  }
}

async function apiUsageOptimizationHandler(req, res) {
  try {
    const data = await getApiUsageOptimization(req.dateRange);
    res.json(data);
  } catch (err) {
    logger.error('Failed to analyze API usage', { error: err.message });
    res.status(500).json({ error: 'Failed to analyze API usage' });
  }
}

module.exports = {
  threatDetectionHandler,
  efficiencyAnalysisHandler,
  apiUsageOptimizationHandler,
};
