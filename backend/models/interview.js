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
const interviews = [];
let idCounter = 1;

function createInterview({ interviewerId, candidateId, scheduledFor }) {
  const interview = {
    id: idCounter++,
    interviewerId: Number(interviewerId),
    candidateId: Number(candidateId),
    scheduledFor: new Date(scheduledFor),
    notes: [],
    status: 'scheduled',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  interviews.push(interview);
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
=======
  return interviews.find(i => i.id === Number(id));
}

function addNoteToInterview(id, text) {
  const interview = getInterviewById(id);
  if (!interview) return null;
  interview.notes.push({ text, createdAt: new Date() });
  interview.updatedAt = new Date();
  return interview;
}

module.exports = {
  scheduleInterview,
  getInterviewById,
  getInterviewsByApplicant,
  getInterviewsByEmployer,
  updateInterviewStatus,
  interviews,
  createInterview,
  getInterviewById,
  addNoteToInterview,
};
