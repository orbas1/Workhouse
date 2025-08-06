const communityModel = require('../models/community');
const logger = require('../utils/logger');

async function createDiscussion(userId, data) {
  const discussion = communityModel.createDiscussion(userId, data);
  logger.info('Discussion created', {
    discussionId: discussion.id,
    userId,
    communityId: data.communityId,
  });
  return discussion;
}

async function listDiscussions(category, communityId) {
  const result = communityModel.getDiscussions(category, communityId);
  logger.info('Discussions fetched', { count: result.length, category, communityId });
  return result;
}

async function createComment(userId, data) {
  const { discussionId, parentId } = data;
  const discussion = communityModel.findDiscussionById(discussionId);
  if (!discussion) {
    throw new Error('Discussion not found');
  }
  if (parentId) {
    const parent = communityModel.findCommentById(parentId);
    if (!parent || parent.discussionId !== discussionId) {
      throw new Error('Parent comment not found');
    }
  }
  const comment = communityModel.createComment(userId, data);
  logger.info('Comment created', { commentId: comment.id, discussionId, userId });
  return comment;
}

async function getCommentsByDiscussion(discussionId) {
  return communityModel.getCommentsByDiscussion(discussionId);
}

async function upvoteComment(commentId, userId) {
  const comment = communityModel.findCommentById(commentId);
  if (!comment) {
    throw new Error('Comment not found');
  }
  if (comment.upvotedBy.includes(userId)) {
    throw new Error('Already upvoted');
  }
  const updated = communityModel.upvoteComment(commentId, userId);
  logger.info('Comment upvoted', { commentId, userId });
  return updated;
}

module.exports = {
  createDiscussion,
  listDiscussions,
  createComment,
  getCommentsByDiscussion,
  upvoteComment,
};
