const {
  scheduleInterview,
  getInterviewsByApplicant,
  getInterviewsByEmployer,
  updateInterviewStatus,
  getInterviewById,
} = require('../models/interview');

// Schedule interview (employer)
async function scheduleInterviewHandler(req, res) {
  const { applicationId, applicantId, interviewDate } = req.body;
  const employerId = req.user.id;
  const interview = scheduleInterview({ applicationId, employerId, applicantId, interviewDate });
  res.status(201).json(interview);
}

// Get interviews for applicant
async function getUserInterviewsHandler(req, res) {
  const interviews = getInterviewsByApplicant(req.user.id);
  res.json(interviews);
}

// Get interviews for employer
async function getEmployerInterviewsHandler(req, res) {
  const interviews = getInterviewsByEmployer(req.user.id);
  res.json(interviews);
}

// Update interview status
async function updateInterviewStatusHandler(req, res) {
  const { interviewId } = req.params;
  const { status } = req.body;
  const updated = updateInterviewStatus(interviewId, status);
  if (!updated) return res.status(404).json({ error: 'Interview not found' });
  res.json(updated);
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
  getUserInterviewsHandler,
  getEmployerInterviewsHandler,
  updateInterviewStatusHandler,
  getInterviewHandler,
  addNoteHandler,
};
