const model = require('../models/article');
const sanitize = require('../utils/sanitize');
const logger = require('../utils/logger');

async function listArticles() {
  return model.listArticles();
}

async function getArticle(id) {
  return model.getArticle(id);
}

async function addComment(id, user, content) {
  const clean = sanitize(content);
  const comment = model.addComment(id, {
    author: user?.username || 'Anonymous',
    content: clean,
  });
  if (!comment) return null;
  logger.info('Article comment added', { articleId: id, userId: user?.id || null });
  return comment;
}

async function likeArticle(id) {
  const article = model.addLike(id);
  if (!article) return null;
  logger.info('Article liked', { articleId: id });
  return article;
}

module.exports = { listArticles, getArticle, addComment, likeArticle };
