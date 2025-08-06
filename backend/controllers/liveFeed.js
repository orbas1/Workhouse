const {
  getPosts,
  createPost,
  getEvents,
  likePost,
  commentPost,
  sharePost,
  reportPost,
} = require('../services/liveFeed');
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

async function likePostHandler(req, res) {
  const { postId } = req.params;
  const post = await likePost(postId);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
}

async function commentPostHandler(req, res) {
  const { postId } = req.params;
  const post = await commentPost(postId, req.user, req.body);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
}

async function sharePostHandler(req, res) {
  const { postId } = req.params;
  const post = await sharePost(postId);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
}

async function reportPostHandler(req, res) {
  const { postId } = req.params;
  const post = await reportPost(postId);
  if (!post) {
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
}

module.exports = {
  listPosts,
  createPostHandler,
  listEventsHandler,
  likePostHandler,
  commentPostHandler,
  sharePostHandler,
  reportPostHandler,
};
