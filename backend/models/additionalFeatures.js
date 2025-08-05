const { randomUUID } = require('crypto');

// In-memory stores for mentorship additional features
const pathways = new Map();
const groupSessions = new Map();
const liveQASessions = new Map();
const forumPosts = [];
const resourceRecommendations = [];
const resourceAssignments = [];
const confidentialityAgreements = new Map(); // sessionId -> { sessionId, text, confirmations: [] }
const badgesByUser = new Map(); // userId -> [badges]
const progressByMentee = new Map(); // menteeId -> progress object

// Pathways
function listPathways() {
  return Array.from(pathways.values());
}

function getPathway(id) {
  return pathways.get(id);
}

function addPathway({ title, description, steps }) {
  const pathway = {
    id: randomUUID(),
    title,
    description: description || null,
    steps: steps || [],
    createdAt: new Date(),
  };
  pathways.set(pathway.id, pathway);
  return pathway;
}

// Group Sessions
function addGroupSession({ title, description, scheduledAt, mentorId }) {
  const session = {
    id: randomUUID(),
    title,
    description: description || null,
    scheduledAt: new Date(scheduledAt).toISOString(),
    mentorId,
    participants: [],
  };
  groupSessions.set(session.id, session);
  return session;
}

function joinGroupSession(sessionId, userId) {
  const session = groupSessions.get(sessionId);
  if (!session) return null;
  if (!session.participants.includes(userId)) {
    session.participants.push(userId);
  }
  return session;
}

// Live Q&A Sessions
function addLiveQA({ topic, scheduledAt, mentorId }) {
  const qa = {
    id: randomUUID(),
    topic,
    scheduledAt: new Date(scheduledAt).toISOString(),
    mentorId,
  };
  liveQASessions.set(qa.id, qa);
  return qa;
}

function getUpcomingLiveQAs() {
  const now = new Date();
  return Array.from(liveQASessions.values()).filter(
    qa => new Date(qa.scheduledAt) >= now
  );
}

// Community Forum
function addForumPost({ title, content, userId }) {
  const post = {
    id: randomUUID(),
    title,
    content,
    userId,
    createdAt: new Date(),
  };
  forumPosts.push(post);
  return post;
}

function getForumPosts() {
  return forumPosts;
}

// Learning Resources
function recommendResource({ menteeId, resource, mentorId }) {
  const rec = {
    id: randomUUID(),
    menteeId,
    resource,
    mentorId,
    createdAt: new Date(),
  };
  resourceRecommendations.push(rec);
  return rec;
}

function assignResource({ menteeId, resource, mentorId }) {
  const assignment = {
    id: randomUUID(),
    menteeId,
    resource,
    mentorId,
    assignedAt: new Date(),
  };
  resourceAssignments.push(assignment);
  return assignment;
}

// Confidentiality Agreements
function setupConfidentialityAgreement(sessionId, text) {
  const agreement = { sessionId, text, confirmations: [] };
  confidentialityAgreements.set(sessionId, agreement);
  return agreement;
}

function confirmConfidentiality(userId, sessionId) {
  const agreement = confidentialityAgreements.get(sessionId);
  if (!agreement) return null;
  if (!agreement.confirmations.some(c => c.userId === userId)) {
    agreement.confirmations.push({ userId, confirmedAt: new Date() });
  }
  return agreement;
}

// Analytics & Progress
function getAnalyticsDashboard(userId) {
  const badges = badgesByUser.get(userId) || [];
  const recommended = resourceRecommendations.filter(r => r.menteeId === userId);
  const assigned = resourceAssignments.filter(r => r.menteeId === userId);
  const sessions = Array.from(groupSessions.values()).filter(
    s => s.mentorId === userId || s.participants.includes(userId)
  );
  return {
    userId,
    badges: badges.length,
    recommendedResources: recommended.length,
    assignedResources: assigned.length,
    sessions: sessions.length,
  };
}

function getMenteeProgress(menteeId) {
  return progressByMentee.get(menteeId) || { menteeId, progress: 0 };
}

function setMenteeProgress(menteeId, progress) {
  progressByMentee.set(menteeId, { menteeId, progress });
}

// Badges
function getBadges(userId) {
  return badgesByUser.get(userId) || [];
}

function addBadge(userId, { name, description }) {
  if (!badgesByUser.has(userId)) {
    badgesByUser.set(userId, []);
  }
  const badge = {
    id: randomUUID(),
    name,
    description: description || null,
    earnedAt: new Date(),
  };
  badgesByUser.get(userId).push(badge);
  return badge;
}

module.exports = {
  listPathways,
  getPathway,
  addPathway,
  addGroupSession,
  joinGroupSession,
  addLiveQA,
  getUpcomingLiveQAs,
  addForumPost,
  getForumPosts,
  recommendResource,
  assignResource,
  setupConfidentialityAgreement,
  confirmConfidentiality,
  getAnalyticsDashboard,
  getMenteeProgress,
  setMenteeProgress,
  getBadges,
  addBadge,
};

