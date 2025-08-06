const {
  listArticles,
  getArticle,
  addComment,
  likeArticle,
} = require('../services/articles');

async function listArticlesHandler(req, res) {
  const articles = await listArticles();
  res.json(articles);
}

async function getArticleHandler(req, res) {
  const article = await getArticle(req.params.articleId);
  if (!article) return res.status(404).json({ error: 'Article not found' });
  res.json(article);
}

async function addCommentHandler(req, res) {
  const comment = await addComment(req.params.articleId, req.user, req.body.content);
  if (!comment) return res.status(404).json({ error: 'Article not found' });
  res.status(201).json(comment);
}

async function likeArticleHandler(req, res) {
  const article = await likeArticle(req.params.articleId);
  if (!article) return res.status(404).json({ error: 'Article not found' });
  res.json({ likes: article.likes });
}

module.exports = {
  listArticlesHandler,
  getArticleHandler,
  addCommentHandler,
  likeArticleHandler,
};
