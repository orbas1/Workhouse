const model = require('../models/externalDataML');
const logger = require('../utils/logger');

async function analyzeExternalData({ sourceType, sourceName, data }) {
  const internalMetrics = model.getInternalMetrics();
  const analysis = data.map(item => {
    const internal = internalMetrics.find(m => m.metric === item.metric);
    return {
      metric: item.metric,
      externalValue: item.value,
      internalValue: internal ? internal.value : null,
      combinedValue: internal ? (item.value + internal.value) / 2 : item.value,
    };
  });
  logger.info('External data analyzed', { sourceType, sourceName });
  return { sourceType, sourceName, metrics: analysis };
}

async function listReports() {
  return model.getAllReports();
}

async function getReportById(id) {
  const report = model.getReport(id);
  if (!report) {
    throw new Error('Report not found');
  }
  return report;
}

async function createReport({ title, description, metrics, userId }) {
  const report = model.createReport({ title, description, metrics, createdBy: userId });
  logger.info('Custom analytics report created', { reportId: report.id, userId });
  return report;
}

async function updateReport(id, data, userId) {
  const report = model.updateReport(id, data);
  if (!report) {
    throw new Error('Report not found');
  }
  logger.info('Custom analytics report updated', { reportId: id, userId });
  return report;
}

async function deleteReport(id, userId) {
  const deleted = model.deleteReport(id);
  if (!deleted) {
    throw new Error('Report not found');
  }
  logger.info('Custom analytics report deleted', { reportId: id, userId });
  return true;
}

module.exports = {
  analyzeExternalData,
  listReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
};
