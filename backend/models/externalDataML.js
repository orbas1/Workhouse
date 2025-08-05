const { v4: uuidv4 } = require('uuid');

// In-memory storage for internal metrics and custom reports
const internalMetrics = [
  { metric: 'engagement', value: 75 },
  { metric: 'revenue', value: 5000 },
  { metric: 'completion_rate', value: 0.85 },
];

const reports = new Map(); // reportId => report

function getInternalMetrics() {
  return internalMetrics;
}

function createReport({ title, description, metrics, createdBy }) {
  const report = {
    id: uuidv4(),
    title,
    description: description || '',
    metrics,
    createdBy,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  reports.set(report.id, report);
  return report;
}

function getAllReports() {
  return Array.from(reports.values());
}

function getReport(id) {
  return reports.get(id) || null;
}

function updateReport(id, data) {
  const existing = reports.get(id);
  if (!existing) return null;
  const updated = { ...existing, ...data, updatedAt: new Date() };
  reports.set(id, updated);
  return updated;
}

function deleteReport(id) {
  return reports.delete(id);
}

module.exports = {
  getInternalMetrics,
  createReport,
  getAllReports,
  getReport,
  updateReport,
  deleteReport,
};
