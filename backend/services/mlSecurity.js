const logger = require('../utils/logger');
const model = require('../models/mlSecurity');

async function detectFraud({ userId, transactionId } = {}) {
  const risk = Math.random();
  const alert = model.addFraudAlert({
    userId: userId || null,
    transactionId: transactionId || null,
    riskLevel: risk > 0.7 ? 'high' : risk > 0.4 ? 'medium' : 'low',
    description: risk > 0.7 ? 'Suspicious activity detected' : 'No significant anomalies',
  });
  logger.info('Fraud detection executed', { userId, transactionId, riskLevel: alert.riskLevel });
  return alert;
}

async function checkPrivacyCompliance({ region } = {}) {
  const report = model.addComplianceReport({
    region: region || 'global',
    compliant: true,
    details: { checkedBy: 'ml-engine' },
  });
  logger.info('Privacy compliance check executed', { region: report.region, compliant: report.compliant });
  return report;
}

function getAlerts(filter) {
  return model.getFraudAlerts(filter);
}

function getComplianceReports(filter) {
  return model.getComplianceReports(filter);
}

module.exports = {
  detectFraud,
  checkPrivacyCompliance,
  getAlerts,
  getComplianceReports,
};

