const { randomUUID } = require('crypto');

const sessions = new Map();
const attendanceRecords = [];

function createSession({ title, description, scheduledAt }) {
  const id = randomUUID();
  const timestamp = new Date();
  const session = {
    id,
    title,
    description: description || null,
    scheduledAt: new Date(scheduledAt),
    createdAt: timestamp,
    updatedAt: timestamp,
  };
  sessions.set(id, session);
  return session;
}

function listSessions() {
  return Array.from(sessions.values());
}

function getSessionById(id) {
  return sessions.get(id);
}

function recordAttendance(sessionId, userId) {
  const session = sessions.get(sessionId);
  if (!session) return null;

  const already = attendanceRecords.find(
    (r) => r.sessionId === sessionId && r.userId === userId
  );
  if (already) return already;

  const record = {
    id: randomUUID(),
    sessionId,
    userId,
    attendedAt: new Date(),
  };
  attendanceRecords.push(record);
  return record;
}

module.exports = {
  createSession,
  listSessions,
  getSessionById,
  recordAttendance,
};

