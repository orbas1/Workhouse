const { randomUUID } = require('crypto');

// In-memory storage for interviews
const interviews = new Map();

function createInterview({ employerId, candidateEmail, scheduledFor }) {
  const id = randomUUID();
  const now = new Date();
  const prefix = process.env.JITSI_ROOM_PREFIX || 'workhouse-interview';
  const meetingId = `${prefix}-${id}`;
  const domain = process.env.JITSI_DOMAIN || 'https://meet.jit.si';
  const meetingLink = `${domain}/${meetingId}`;
  const interview = {
    id,
    employerId,
    candidateEmail,
    scheduledFor: new Date(scheduledFor),
    meetingId,
    meetingLink,
    status: 'scheduled',
    notes: [],
    createdAt: now,
    updatedAt: now,
  };
  interviews.set(id, interview);
  return interview;
}

function getInterviewById(id) {
  return interviews.get(id);
}

function listInterviewsForUser(email) {
  return Array.from(interviews.values()).filter((i) => i.candidateEmail === email);
}

function listInterviewsForEmployer(employerId) {
  return Array.from(interviews.values()).filter((i) => i.employerId === employerId);
}

function updateInterviewStatus(id, status) {
  const interview = interviews.get(id);
  if (!interview) return null;
  interview.status = status;
  interview.updatedAt = new Date();
  return interview;
}

function addNoteToInterview(id, { text, authorId }) {
  const interview = interviews.get(id);
  if (!interview) return null;
  interview.notes.push({ id: randomUUID(), text, authorId, createdAt: new Date() });
  interview.updatedAt = new Date();
  return interview;
}

module.exports = {
  createInterview,
  getInterviewById,
  listInterviewsForUser,
  listInterviewsForEmployer,
  updateInterviewStatus,
  addNoteToInterview,
};

