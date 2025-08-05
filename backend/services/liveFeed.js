const model = require('../models/liveFeed');
const fetchExternal = require('../utils/fetchExternal');
const sanitize = require('../utils/sanitize');
const logger = require('../utils/logger');

async function getPosts(category) {
  let posts = model.listPosts(category);
  if (process.env.EXTERNAL_LIVE_FEED_API) {
    try {
      const external = await fetchExternal(process.env.EXTERNAL_LIVE_FEED_API);
      posts = posts.concat(
        external.slice(0, 5).map(p => ({
          id: `ext-${p.id}`,
          author: p.userId ? `User ${p.userId}` : 'External',
          content: sanitize(p.body || p.title || ''),
          category: category || 'external',
          createdAt: new Date(p.createdAt || Date.now()),
        }))
      );
    } catch (err) {
      logger.error('Failed to fetch external live feed posts', { error: err.message });
    }
  }
  return posts;
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
