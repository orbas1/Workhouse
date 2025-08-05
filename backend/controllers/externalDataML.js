const service = require('../services/externalDataML');
const logger = require('../utils/logger');

async function analyzeExternalData(req, res) {
  try {
    const analysis = await service.analyzeExternalData(req.body);
    res.json(analysis);
  } catch (err) {
    logger.error('External data analysis failed', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function listReports(req, res) {
  try {
    const reports = await service.listReports();
    res.json(reports);
  } catch (err) {
    logger.error('Failed to list custom reports', { error: err.message });
    res.status(500).json({ error: 'Failed to retrieve reports' });
  }
}

async function getReportById(req, res) {
  try {
    res.json(req.report);
  } catch (err) {
    logger.error('Failed to get report', { reportId: req.params.reportId, error: err.message });
    res.status(500).json({ error: 'Failed to retrieve report' });
  }
}

async function createReport(req, res) {
  try {
    const report = await service.createReport({ ...req.body, userId: req.user.id });
    res.status(201).json(report);
  } catch (err) {
    logger.error('Failed to create report', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function updateReport(req, res) {
  try {
    const updated = await service.updateReport(req.params.reportId, req.body, req.user.id);
    res.json(updated);
  } catch (err) {
    logger.error('Failed to update report', { reportId: req.params.reportId, error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function deleteReport(req, res) {
  try {
    await service.deleteReport(req.params.reportId, req.user.id);
    res.status(204).send();
  } catch (err) {
    logger.error('Failed to delete report', { reportId: req.params.reportId, error: err.message });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  analyzeExternalData,
  listReports,
  getReportById,
  createReport,
  updateReport,
  deleteReport,
};
