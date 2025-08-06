const { randomUUID } = require('crypto');

const sessions = new Map();
const webinars = new Map();
const adviceRequests = new Map();
const projectFeedbackRequests = new Map();

function createSession({ userId, expertId, sessionDate }) {
  const id = randomUUID();
  const session = {
    id,
    userId,
    expertId,
    sessionDate: new Date(sessionDate),
    status: 'scheduled',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  sessions.set(id, session);
  return session;
}

function getWebinars() {
  return Array.from(webinars.values());
}

function seedWebinar({ title, scheduledAt, description, videoUrl, jitsiRoom }) {
  const id = randomUUID();
  const webinar = {
    id,
    title,
    scheduledAt: new Date(scheduledAt),
    description: description || '',
    videoUrl: videoUrl || '',
    jitsiRoom: jitsiRoom || '',
    createdAt: new Date(),
  };
  webinars.set(id, webinar);
  return webinar;
}

function createAdviceRequest({ userId, expertId, topic, details }) {
  const id = randomUUID();
  const request = {
    id,
    userId,
    expertId,
    topic,
    details: details || '',
    status: 'pending',
    createdAt: new Date(),
  };
  adviceRequests.set(id, request);
  return request;
}

function createProjectFeedbackRequest({ userId, projectId, expertId, notes }) {
  const id = randomUUID();
  const request = {
    id,
    userId,
    projectId,
    expertId,
    notes: notes || '',
    status: 'pending',
    createdAt: new Date(),
  };
  projectFeedbackRequests.set(id, request);
  return request;
}

module.exports = {
  createSession,
  getWebinars,
  seedWebinar,
  createAdviceRequest,
  createProjectFeedbackRequest,
};

// Seed a sample webinar for demonstration purposes
seedWebinar({
  title: 'Industry Trends Webinar',
  scheduledAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  description: 'Overview of upcoming industry trends and insights.',
  videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
  jitsiRoom: 'IndustryTrendsWebinar'
});
