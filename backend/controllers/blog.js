const { getPosts, getCategories, getPost } = require('../services/blog');
const logger = require('../utils/logger');

async function listPosts(req, res) {
  const { category } = req.query;
  const posts = await getPosts(category);
  res.json(posts);
}

async function listCategories(req, res) {
  const cats = await getCategories();
  res.json(cats);
}

async function getPostHandler(req, res) {
  const { id } = req.params;
  const post = await getPost(id);
  if (!post) {
    logger.warn('Blog post not found', { id });
    return res.status(404).json({ error: 'Post not found' });
  }
  res.json(post);
}

module.exports = { listPosts, listCategories, getPostHandler };
