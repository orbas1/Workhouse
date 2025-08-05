const timesheetModel = require('../models/timesheet');

function logTimesheet(agencyId, data) {
  return timesheetModel.createTimesheet(agencyId, data);
}

function getTimesheets(agencyId) {
  return timesheetModel.getTimesheetsByAgency(agencyId);
}

module.exports = {
  logTimesheet,
  getTimesheets,
};
