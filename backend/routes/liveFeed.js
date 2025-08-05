const express = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { postSchema, categoryQuerySchema } = require('../validation/liveFeed');
const { listPosts, createPostHandler, listEventsHandler } = require('../controllers/liveFeed');

const router = express.Router();

router.get('/posts', auth, validate(categoryQuerySchema, 'query'), listPosts);
router.post('/posts', auth, validate(postSchema, 'body'), createPostHandler);
router.get('/events', auth, listEventsHandler);

module.exports = router;
