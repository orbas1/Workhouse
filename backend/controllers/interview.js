const { scheduleInterview, getInterview, addNote } = require('../services/interview');
const logger = require('../utils/logger');

async function scheduleInterviewHandler(req, res) {
  try {
    const interview = scheduleInterview(req.body);
    res.status(201).json(interview);
  } catch (err) {
    logger.error('Failed to schedule interview', err);
    res.status(400).json({ error: err.message });
  }
}

async function getInterviewHandler(req, res) {
  const interview = getInterview(req.params.id);
  if (!interview) {
    return res.status(404).json({ error: 'Interview not found' });
  }
  res.json(interview);
}

async function addNoteHandler(req, res) {
  try {
    const interview = addNote(req.params.id, req.body.text);
    if (!interview) {
      return res.status(404).json({ error: 'Interview not found' });
    }
    res.json(interview);
  } catch (err) {
    logger.error('Failed to add note', err);
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  scheduleInterviewHandler,
  getInterviewHandler,
  addNoteHandler,
};
