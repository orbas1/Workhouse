const express = require('express');
const {
  listArticlesHandler,
  getArticleHandler,
  addCommentHandler,
  likeArticleHandler,
} = require('../controllers/articles');

const router = express.Router();

router.get('/', listArticlesHandler);
router.get('/:articleId', getArticleHandler);
router.post('/:articleId/comments', addCommentHandler);
router.post('/:articleId/like', likeArticleHandler);

module.exports = router;
