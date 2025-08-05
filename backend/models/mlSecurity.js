const { randomUUID } = require('crypto');

const fraudAlerts = [];
const complianceReports = [];

function seedData() {
  if (fraudAlerts.length === 0) {
    fraudAlerts.push({
      id: randomUUID(),
      userId: 'user-1',
      transactionId: 'txn-1',
      riskLevel: 'low',
      description: 'Baseline check completed',
      createdAt: new Date(),
    });
  }
  if (complianceReports.length === 0) {
    complianceReports.push({
      id: randomUUID(),
      region: 'global',
      compliant: true,
      details: {},
      checkedAt: new Date(),
    });
  }
}

seedData();

function addFraudAlert(alert) {
  const entry = { id: randomUUID(), createdAt: new Date(), ...alert };
  fraudAlerts.push(entry);
  return entry;
}

function getFraudAlerts(filter = {}) {
  return fraudAlerts.filter(a => {
    return (!filter.userId || a.userId === filter.userId) &&
      (!filter.transactionId || a.transactionId === filter.transactionId);
  });
}

function addComplianceReport(report) {
  const entry = { id: randomUUID(), checkedAt: new Date(), ...report };
  complianceReports.push(entry);
  return entry;
}

function getComplianceReports(filter = {}) {
  return complianceReports.filter(r => !filter.region || r.region === filter.region);
}

module.exports = {
  addFraudAlert,
  getFraudAlerts,
  addComplianceReport,
  getComplianceReports,
};

