const model = require('../models/liveFeed');
const sanitize = require('../utils/sanitize');
const logger = require('../utils/logger');

async function getPosts(category) {
  return model.listPosts(category);
}

async function createPost(user, data) {
  const content = sanitize(data.content);
  const category = data.category || 'general';
  const post = model.addPost({ author: user.username || 'Anonymous', content, category });
  logger.info('Created live feed post', { userId: user.id, postId: post.id });
  return post;
}

async function getEvents() {
  return model.listEvents();
}

async function likePost(postId) {
  const post = model.addLike(postId);
  if (!post) {
    logger.warn('Attempted to like missing post', { postId });
    return null;
  }
  logger.info('Post liked', { postId });
  return post;
}

module.exports = { getPosts, createPost, getEvents, likePost };
