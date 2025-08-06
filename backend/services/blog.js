const model = require('../models/blog');
const sanitize = require('../utils/sanitize');
const fetchExternal = require('../utils/fetchExternal');
const logger = require('../utils/logger');

async function getPosts(category) {
  let posts = model.listPosts(category);
  const externalUrl = process.env.EXTERNAL_BLOG_API;
  if (externalUrl) {
    try {
      const external = await fetchExternal(externalUrl);
      posts = posts.concat(
        external.slice(0, 5).map(p => ({
          id: `ext-${p.id}`,
          title: sanitize(p.title || 'Untitled'),
          excerpt: sanitize(p.body ? p.body.substring(0, 120) : ''),
          content: sanitize(p.body || ''),
          category: category || 'External',
          image: '',
          createdAt: new Date()
        }))
      );
    } catch (err) {
      logger.error('Failed to fetch external blog posts', { error: err.message });
    }
  }
  return posts;
}

async function getCategories() {
  return model.listCategories();
}

async function getPost(id) {
  return model.getPost(id);
}

module.exports = { getPosts, getCategories, getPost };
