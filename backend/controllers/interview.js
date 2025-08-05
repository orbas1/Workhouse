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
}

module.exports = {
  scheduleInterviewHandler,
  getUserInterviewsHandler,
  getEmployerInterviewsHandler,
  updateInterviewStatusHandler,
};
