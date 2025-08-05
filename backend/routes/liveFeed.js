const express = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { postSchema, categoryQuerySchema, postIdParamSchema } = require('../validation/liveFeed');
const { listPosts, createPostHandler, listEventsHandler, likePostHandler } = require('../controllers/liveFeed');

const router = express.Router();

router.get('/posts', auth, validate(categoryQuerySchema, 'query'), listPosts);
router.post('/posts', auth, validate(postSchema, 'body'), createPostHandler);
router.get('/events', auth, listEventsHandler);
router.post('/posts/:postId/like', auth, validate(postIdParamSchema, 'params'), likePostHandler);

module.exports = router;
