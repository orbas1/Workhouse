const { getPosts, createPost, getEvents } = require('../services/liveFeed');
const logger = require('../utils/logger');

async function listPosts(req, res) {
  const { category } = req.query;
  const posts = await getPosts(category);
  res.json(posts);
}

async function createPostHandler(req, res) {
  try {
    const post = await createPost(req.user, req.body);
    res.status(201).json(post);
  } catch (err) {
    logger.error('Failed to create live feed post', { error: err.message });
    res.status(400).json({ error: 'Unable to create post' });
  }
}

async function listEventsHandler(req, res) {
  const events = await getEvents();
  res.json(events);
}

module.exports = { listPosts, createPostHandler, listEventsHandler };
