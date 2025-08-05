const express = require('express');
const {
  createDiscussionHandler,
  listDiscussionsHandler,
  createCommentHandler,
  listCommentsHandler,
  upvoteCommentHandler,
} = require('../controllers/community');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { ensureDiscussion, ensureComment } = require('../middleware/discussion');
const {
  createDiscussionSchema,
  listDiscussionQuerySchema,
  createCommentSchema,
  discussionIdParamSchema,
  commentIdParamSchema,
} = require('../validation/community');

const router = express.Router();

router.post('/discussions', auth, validate(createDiscussionSchema), createDiscussionHandler);

router.get('/discussions', validate(listDiscussionQuerySchema, 'query'), listDiscussionsHandler);

router.get(
  '/discussions/:discussionId/comments',
  validate(discussionIdParamSchema, 'params'),
  ensureDiscussion,
  listCommentsHandler
);

router.post(
  '/comments',
  auth,
  validate(createCommentSchema),
  ensureDiscussion,
  createCommentHandler
);

router.post(
  '/comments/:commentId/upvote',
  auth,
  validate(commentIdParamSchema, 'params'),
  ensureComment,
  upvoteCommentHandler
);

module.exports = router;
