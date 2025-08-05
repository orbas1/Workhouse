const { randomUUID } = require('crypto');

const sessions = new Map();
const attendanceRecords = [];

// In-memory storage for Stage 97 training resources and completions
const trainingResources = [];
const resourceReviews = [];
const completionRecords = [];

// seed with a few example resources for realism
trainingResources.push(
  {
    id: randomUUID(),
    title: 'Volunteer Orientation',
    url: 'https://example.org/training/orientation',
    description: 'Overview of volunteer responsibilities and code of conduct.',
    tags: ['orientation', 'general'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: randomUUID(),
    title: 'Safety Procedures',
    url: 'https://example.org/training/safety',
    description: 'Essential safety guidelines for on-site activities.',
    tags: ['safety'],
    createdAt: new Date(),
    updatedAt: new Date(),
  }
);

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

function listResources(tags = []) {
  let result = trainingResources;
  if (tags.length) {
    result = result.filter((r) => tags.every((t) => r.tags.includes(t)));
  }
  return result.map((r) => {
    const reviews = resourceReviews.filter((rev) => rev.resourceId === r.id);
    const averageRating = reviews.length
      ? reviews.reduce((sum, rev) => sum + rev.rating, 0) / reviews.length
      : 0;
    return { ...r, averageRating, reviewCount: reviews.length };
  });
}

function addReview(resourceId, userId, { rating, comment }) {
  const resource = trainingResources.find((r) => r.id === resourceId);
  if (!resource) return null;
  const review = {
    id: randomUUID(),
    resourceId,
    userId,
    rating,
    comment: comment || '',
    createdAt: new Date(),
  };
  resourceReviews.push(review);
  return review;
}

function recordCompletion({ userId, resourceId, certificationName, provider, externalId }) {
  const resource = trainingResources.find((r) => r.id === resourceId);
  if (!resource) return null;
  const record = {
    id: randomUUID(),
    userId,
    resourceId,
    certificationName,
    provider: provider || null,
    externalId: externalId || null,
    completedAt: new Date(),
  };
  completionRecords.push(record);
  return record;
}

module.exports = {
  createSession,
  listSessions,
  getSessionById,
  recordAttendance,
  listResources,
  addReview,
  recordCompletion,
};
