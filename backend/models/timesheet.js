const { randomUUID } = require('crypto');

const timesheets = new Map();

function createTimesheet(agencyId, { freelancerId, jobId, hours, date, notes }) {
  const id = randomUUID();
  const timestamp = new Date();
  const entry = {
    id,
    agencyId,
    freelancerId,
    jobId,
    hours,
    date: date ? new Date(date) : timestamp,
    notes: notes || '',
    status: 'submitted',
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  timesheets.set(id, entry);
  return entry;
}

function getTimesheetsByAgency(agencyId) {
  return Array.from(timesheets.values()).filter(t => t.agencyId === agencyId);
}

module.exports = {
  createTimesheet,
  getTimesheetsByAgency,
};
