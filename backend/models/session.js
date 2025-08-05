const sessions = [];
let idCounter = 1;

function createSession({ mentorId, menteeId, scheduledFor }) {
  const session = {
    id: idCounter++,
    mentorId: Number(mentorId),
    menteeId: Number(menteeId),
    scheduledFor: new Date(scheduledFor),
    agenda: null,
    notes: [],
    materials: [],
    status: 'scheduled',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  sessions.push(session);
  return session;
}

function getSessionById(id) {
  return sessions.find((s) => s.id === Number(id));
}

function updateSession(id, updates) {
  const session = getSessionById(id);
  if (!session) return null;
  Object.assign(session, updates, { updatedAt: new Date() });
  return session;
}

function getSessionsByUser(userId) {
  return sessions.filter(
    (s) => s.mentorId === Number(userId) || s.menteeId === Number(userId)
  );
}

module.exports = {
  sessions,
  createSession,
  getSessionById,
  updateSession,
  getSessionsByUser,
};
