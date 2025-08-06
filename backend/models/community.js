const { randomUUID } = require('crypto');

const discussions = new Map();
const comments = new Map();

function createDiscussion(userId, { communityId, title, content, category }) {
  const id = randomUUID();
  const now = new Date();
  const discussion = {
    id,
    communityId,
    title,
    content,
    category,
    createdBy: userId,
    createdAt: now,
  };
  discussions.set(id, discussion);
  return discussion;
}

function getDiscussions(category, communityId) {
  let result = Array.from(discussions.values());
  if (communityId) {
    result = result.filter((d) => d.communityId === communityId);
  }
  if (category) {
    result = result.filter((d) => d.category === category);
  }
  return result;
}

function findDiscussionById(id) {
  return discussions.get(id);
}

function createComment(userId, { discussionId, parentId = null, content }) {
  const id = randomUUID();
  const now = new Date();
  const comment = {
    id,
    discussionId,
    parentId,
    content,
    createdBy: userId,
    upvotes: 0,
    upvotedBy: [],
    createdAt: now,
  };
  comments.set(id, comment);
  return comment;
}

function getCommentsByDiscussion(discussionId) {
  return Array.from(comments.values()).filter(
    (c) => c.discussionId === discussionId
  );
}

function findCommentById(id) {
  return comments.get(id);
}

function upvoteComment(commentId, userId) {
  const comment = comments.get(commentId);
  if (!comment) return null;
  comment.upvotes += 1;
  comment.upvotedBy.push(userId);
  return comment;
}

module.exports = {
  createDiscussion,
  getDiscussions,
  findDiscussionById,
  createComment,
  getCommentsByDiscussion,
  findCommentById,
  upvoteComment,
};
