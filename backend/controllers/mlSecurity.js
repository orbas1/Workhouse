const mlSecurityService = require('../services/mlSecurity');
const logger = require('../utils/logger');

async function fraudDetectionHandler(req, res) {
  try {
    const alert = await mlSecurityService.detectFraud(req.query);
    res.json(alert);
  } catch (err) {
    logger.error('Fraud detection failed', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function privacyComplianceHandler(req, res) {
  try {
    const report = await mlSecurityService.checkPrivacyCompliance(req.query);
    res.json(report);
  } catch (err) {
    logger.error('Privacy compliance check failed', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  fraudDetectionHandler,
  privacyComplianceHandler,
};

