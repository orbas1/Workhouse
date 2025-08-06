const {
  createDiscussion,
  listDiscussions,
  createComment,
  getCommentsByDiscussion,
  upvoteComment,
} = require('../services/community');
const { checkAccess } = require('../services/communitySubscription');
const logger = require('../utils/logger');

async function createDiscussionHandler(req, res) {
  const userId = req.user?.id || req.user?.username;
  try {
    const discussion = await createDiscussion(userId, req.body);
    res.status(201).json(discussion);
  } catch (err) {
    logger.error('Failed to create discussion', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function listDiscussionsHandler(req, res) {
  const { category, communityId } = req.query;
  const userId = req.user?.id || req.user?.username;
  try {
    if (communityId) {
      const access = await checkAccess(userId, communityId);
      if (!access.access) {
        return res.status(403).json({ error: 'Access denied' });
      }
    }
    const discussions = await listDiscussions(category, communityId);
    res.json(discussions);
  } catch (err) {
    logger.error('Failed to list discussions', {
      error: err.message,
      category,
      communityId,
    });
    res.status(500).json({ error: err.message });
  }
}

async function createCommentHandler(req, res) {
  const userId = req.user?.id || req.user?.username;
  const { discussionId, parentId, content } = req.body;
  try {
    const comment = await createComment(userId, { discussionId, parentId, content });
    res.status(201).json(comment);
  } catch (err) {
    logger.error('Failed to create comment', {
      error: err.message,
      userId,
      discussionId,
      parentId,
    });
    res.status(400).json({ error: err.message });
  }
}

async function listCommentsHandler(req, res) {
  const { discussionId } = req.params;
  try {
    const comments = await getCommentsByDiscussion(discussionId);
    res.json(comments);
  } catch (err) {
    logger.error('Failed to list comments', { error: err.message, discussionId });
    res.status(404).json({ error: err.message });
  }
}

async function upvoteCommentHandler(req, res) {
  const userId = req.user?.id || req.user?.username;
  const { commentId } = req.params;
  try {
    const comment = await upvoteComment(commentId, userId);
    res.json(comment);
  } catch (err) {
    logger.error('Failed to upvote comment', { error: err.message, commentId, userId });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  createDiscussionHandler,
  listDiscussionsHandler,
  createCommentHandler,
  listCommentsHandler,
  upvoteCommentHandler,
};
