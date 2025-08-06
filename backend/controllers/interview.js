const {
  scheduleInterview,
  listUserInterviews,
  listEmployerInterviews,
  setInterviewStatus,
  getInterview,
  addNote,
} = require('../services/interview');
const logger = require('../utils/logger');

async function scheduleInterviewHandler(req, res) {
  try {
    const { candidateEmail, scheduledFor } = req.body;
    const employerId = req.user.id;
    const interview = scheduleInterview({ employerId, candidateEmail, scheduledFor });
    res.status(201).json(interview);
  } catch (err) {
    logger.error('Failed to schedule interview', err);
    res.status(400).json({ error: err.message });
  }
}

async function getUserInterviewsHandler(req, res) {
  const interviews = listUserInterviews(req.user.email);
  res.json(interviews);
}

async function getEmployerInterviewsHandler(req, res) {
  const interviews = listEmployerInterviews(req.user.id);
  res.json(interviews);
}

async function updateInterviewStatusHandler(req, res) {
  const { interviewId } = req.params;
  const { status } = req.body;
  const updated = setInterviewStatus(interviewId, status);
  if (!updated) return res.status(404).json({ error: 'Interview not found' });
  res.json(updated);
}

async function getInterviewHandler(req, res) {
  const interview = getInterview(req.params.interviewId);
  if (!interview) return res.status(404).json({ error: 'Interview not found' });
  res.json(interview);
}

async function addNoteHandler(req, res) {
  try {
      const interview = addNote(req.params.interviewId, req.body.text, req.user.id);
    if (!interview) return res.status(404).json({ error: 'Interview not found' });
    res.json(interview);
  } catch (err) {
    logger.error('Failed to add note', err);
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  scheduleInterviewHandler,
  getUserInterviewsHandler,
  getEmployerInterviewsHandler,
  updateInterviewStatusHandler,
  getInterviewHandler,
  addNoteHandler,
};

