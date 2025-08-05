const {
  listPathways,
  createGroupSession,
  createLiveQA,
  getCommunityForum,
  recommendResource,
  getAnalyticsDashboard,
  setupConfidentialityAgreement,
  getPathwayDetail,
  joinGroupSession,
  getUpcomingLiveQa,
  getCommunityDiscussions,
  assignLearningResource,
  getMenteeProgress,
  confirmConfidentiality,
  getBadges,
} = require('../services/additionalFeatures');
const logger = require('../utils/logger');

async function listPathwaysHandler(req, res) {
  try {
    const pathways = await listPathways();
    res.json(pathways);
  } catch (err) {
    logger.error('Failed to list mentorship pathways', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function createGroupSessionHandler(req, res) {
  try {
    const mentorId = req.user.id;
    const session = await createGroupSession({ ...req.body, mentorId });
    res.status(201).json(session);
  } catch (err) {
    logger.error('Failed to create group session', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function createLiveQAHandler(req, res) {
  try {
    const mentorId = req.user.id;
    const qa = await createLiveQA({ ...req.body, mentorId });
    res.status(201).json(qa);
  } catch (err) {
    logger.error('Failed to create live QA', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getCommunityForumHandler(req, res) {
  try {
    const posts = await getCommunityForum();
    res.json(posts);
  } catch (err) {
    logger.error('Failed to fetch community forum', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function recommendResourceHandler(req, res) {
  try {
    const mentorId = req.user.id;
    const { menteeId } = req.params;
    const rec = await recommendResource(menteeId, req.body.resource, mentorId);
    res.status(201).json(rec);
  } catch (err) {
    logger.error('Failed to recommend resource', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getAnalyticsDashboardHandler(req, res) {
  try {
    const { userId } = req.params;
    const dashboard = await getAnalyticsDashboard(userId);
    res.json(dashboard);
  } catch (err) {
    logger.error('Failed to retrieve analytics dashboard', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function setupConfidentialityAgreementHandler(req, res) {
  try {
    const { sessionId } = req.params;
    const agreement = await setupConfidentialityAgreement(sessionId, req.body.text);
    res.status(201).json(agreement);
  } catch (err) {
    logger.error('Failed to setup confidentiality agreement', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getPathwayDetailHandler(req, res) {
  try {
    const { pathwayId } = req.params;
    const pathway = await getPathwayDetail(pathwayId);
    res.json(pathway);
  } catch (err) {
    logger.error('Failed to get pathway detail', { error: err.message });
    res.status(404).json({ error: err.message });
  }
}

async function joinGroupSessionHandler(req, res) {
  try {
    const { sessionId } = req.params;
    const userId = req.user.id;
    const session = await joinGroupSession(sessionId, userId);
    res.json(session);
  } catch (err) {
    logger.error('Failed to join group session', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getUpcomingLiveQaHandler(req, res) {
  try {
    const sessions = await getUpcomingLiveQa();
    res.json(sessions);
  } catch (err) {
    logger.error('Failed to get upcoming live Q&A', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function getCommunityDiscussionsHandler(req, res) {
  try {
    const posts = await getCommunityDiscussions();
    res.json(posts);
  } catch (err) {
    logger.error('Failed to get community discussions', { error: err.message });
    res.status(500).json({ error: err.message });
  }
}

async function assignLearningResourceHandler(req, res) {
  try {
    const mentorId = req.user.id;
    const { menteeId } = req.params;
    const assignment = await assignLearningResource(menteeId, req.body.resource, mentorId);
    res.status(201).json(assignment);
  } catch (err) {
    logger.error('Failed to assign learning resource', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getMenteeProgressHandler(req, res) {
  try {
    const { menteeId } = req.params;
    const progress = await getMenteeProgress(menteeId);
    res.json(progress);
  } catch (err) {
    logger.error('Failed to get mentee progress', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function confirmConfidentialityHandler(req, res) {
  try {
    const { userId } = req.params;
    const { sessionId } = req.body;
    const agreement = await confirmConfidentiality(userId, sessionId);
    res.json(agreement);
  } catch (err) {
    logger.error('Failed to confirm confidentiality', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getBadgesHandler(req, res) {
  try {
    const { userId } = req.params;
    const badges = await getBadges(userId);
    res.json(badges);
  } catch (err) {
    logger.error('Failed to get badges', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  listPathwaysHandler,
  createGroupSessionHandler,
  createLiveQAHandler,
  getCommunityForumHandler,
  recommendResourceHandler,
  getAnalyticsDashboardHandler,
  setupConfidentialityAgreementHandler,
  getPathwayDetailHandler,
  joinGroupSessionHandler,
  getUpcomingLiveQaHandler,
  getCommunityDiscussionsHandler,
  assignLearningResourceHandler,
  getMenteeProgressHandler,
  confirmConfidentialityHandler,
  getBadgesHandler,
};

