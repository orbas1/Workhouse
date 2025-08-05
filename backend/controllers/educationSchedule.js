const scheduleModel = require('../models/educationSchedule');

async function listEvents(req, res) {
  const events = scheduleModel.listEvents();
  res.json(events);
}

async function createEvent(req, res) {
  const event = scheduleModel.createEvent({ ...req.body, createdBy: req.user && req.user.id });
  res.status(201).json(event);
}

module.exports = {
  listEvents,
  createEvent,
};
