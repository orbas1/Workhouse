const {
  getOverview,
  createInitiative,
  generateEfficacyReport,
} = require('../services/mentorshipManagement');
const logger = require('../utils/logger');

async function getOverviewHandler(req, res) {
  try {
    const overview = await getOverview();
    res.json(overview);
  } catch (err) {
    logger.error('Failed to retrieve mentorship program overview', { error: err.message });
    res.status(500).json({ error: 'Failed to retrieve overview' });
  }
}

async function createInitiativeHandler(req, res) {
  try {
    const initiative = await createInitiative(req.body);
    res.status(201).json(initiative);
  } catch (err) {
    logger.error('Failed to create mentorship initiative', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getEfficacyReportHandler(req, res) {
  try {
    const report = await generateEfficacyReport();
    res.json(report);
  } catch (err) {
    logger.error('Failed to generate mentorship efficacy report', { error: err.message });
    res.status(500).json({ error: 'Failed to generate report' });
  }
}

module.exports = {
  getOverviewHandler,
  createInitiativeHandler,
  getEfficacyReportHandler,
};
