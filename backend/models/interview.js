const { randomUUID } = require('crypto');

// In-memory storage for interviews
const interviews = new Map();

function scheduleInterview({ applicationId, employerId, applicantId, interviewDate }) {
  const id = randomUUID();
  const now = new Date();
  const interview = {
    id,
    applicationId,
    employerId,
    applicantId,
    interviewDate: new Date(interviewDate),
    status: 'scheduled',
    createdAt: now,
    updatedAt: now,
  };
  interviews.set(id, interview);
  return interview;
}

function getInterviewById(id) {
  return interviews.get(id);
}

function getInterviewsByApplicant(applicantId) {
  return Array.from(interviews.values()).filter(i => i.applicantId === applicantId);
}

function getInterviewsByEmployer(employerId) {
  return Array.from(interviews.values()).filter(i => i.employerId === employerId);
}

function updateInterviewStatus(id, status) {
  const interview = interviews.get(id);
  if (!interview) return null;
  interview.status = status;
  interview.updatedAt = new Date();
  interviews.set(id, interview);
  return interview;
}

module.exports = {
  scheduleInterview,
  getInterviewById,
  getInterviewsByApplicant,
  getInterviewsByEmployer,
  updateInterviewStatus,
};
