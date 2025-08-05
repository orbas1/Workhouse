const communityModel = require('../models/community');
const logger = require('../utils/logger');

function ensureDiscussion(req, res, next) {
  const discussionId = req.params.discussionId || req.body.discussionId;
  const discussion = communityModel.findDiscussionById(discussionId);
  if (!discussion) {
    logger.error('Discussion not found', { discussionId });
    return res.status(404).json({ error: 'Discussion not found' });
  }
  req.discussion = discussion;
  next();
}

function ensureComment(req, res, next) {
  const { commentId } = req.params;
  const comment = communityModel.findCommentById(commentId);
  if (!comment) {
    logger.error('Comment not found', { commentId });
    return res.status(404).json({ error: 'Comment not found' });
  }
  req.comment = comment;
  next();
}

module.exports = { ensureDiscussion, ensureComment };
