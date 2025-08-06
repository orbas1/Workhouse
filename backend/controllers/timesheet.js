const { logTimesheet, getTimesheets } = require('../services/timesheet');
const logger = require('../utils/logger');

async function logTimesheetHandler(req, res) {
  const { agencyId } = req.params;
  try {
    const entry = await logTimesheet(agencyId, req.body);
    res.status(201).json(entry);
  } catch (err) {
    logger.error('Failed to log timesheet', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getTimesheetsHandler(req, res) {
  const { agencyId } = req.params;
  try {
    const entries = await getTimesheets(agencyId);
    res.json(entries);
  } catch (err) {
    logger.error('Failed to fetch timesheets', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  logTimesheetHandler,
  getTimesheetsHandler,
};
