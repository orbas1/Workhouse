const { joinGroup, postToGroup, scheduleLiveStudy, applyForMentorship } = require('../services/socialLearning');
const logger = require('../utils/logger');

async function joinGroupHandler(req, res) {
  const { groupId } = req.params;
  const userId = req.user?.username;
  try {
    const membership = await joinGroup(userId, groupId);
    res.status(201).json(membership);
  } catch (err) {
    logger.error('Failed to join group', { error: err.message, groupId, userId });
    const status = err.status || 500;
    res.status(status).json({ error: err.message });
  }
}

async function postInGroupHandler(req, res) {
  const { groupId } = req.params;
  const userId = req.user?.username;
  const { content } = req.body;
  try {
    const post = await postToGroup(groupId, userId, content);
    res.status(201).json(post);
  } catch (err) {
    logger.error('Failed to post in group', { error: err.message, groupId, userId });
    res.status(400).json({ error: err.message });
  }
}

async function scheduleLiveStudyHandler(req, res) {
  const { groupId } = req.params;
  const userId = req.user?.username;
  try {
    const session = await scheduleLiveStudy(groupId, userId, req.body);
    res.status(201).json(session);
  } catch (err) {
    logger.error('Failed to schedule live study', { error: err.message, groupId, userId });
    res.status(400).json({ error: err.message });
  }
}

async function applyForMentorshipHandler(req, res) {
  const { userId } = req.params;
  const authUser = req.user?.username;
  try {
    if (authUser !== userId) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const application = await applyForMentorship(userId, req.body.message);
    res.status(201).json(application);
  } catch (err) {
    logger.error('Failed to apply for mentorship', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  joinGroupHandler,
  postInGroupHandler,
  scheduleLiveStudyHandler,
  applyForMentorshipHandler,
};
