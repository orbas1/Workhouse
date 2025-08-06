const express = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  postSchema,
  categoryQuerySchema,
  postIdParamSchema,
  commentSchema,
  reportSchema,
} = require('../validation/liveFeed');
const {
  listPosts,
  createPostHandler,
  listEventsHandler,
  likePostHandler,
  commentPostHandler,
  sharePostHandler,
  reportPostHandler,
} = require('../controllers/liveFeed');

const router = express.Router();

router.get('/posts', auth, validate(categoryQuerySchema, 'query'), listPosts);
router.post('/posts', auth, validate(postSchema, 'body'), createPostHandler);
router.get('/events', auth, listEventsHandler);
router.post('/posts/:postId/like', auth, validate(postIdParamSchema, 'params'), likePostHandler);
router.post(
  '/posts/:postId/comments',
  auth,
  validate(postIdParamSchema, 'params'),
  validate(commentSchema, 'body'),
  commentPostHandler
);
router.post('/posts/:postId/share', auth, validate(postIdParamSchema, 'params'), sharePostHandler);
router.post(
  '/posts/:postId/report',
  auth,
  validate(postIdParamSchema, 'params'),
  validate(reportSchema, 'body'),
  reportPostHandler
);

module.exports = router;
