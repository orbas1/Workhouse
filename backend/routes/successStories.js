const express = require('express');
const {
  submitSuccessStoryHandler,
  listSuccessStoriesHandler,
  getSuccessStoryHandler,
} = require('../controllers/successStory');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const successStoryExists = require('../middleware/successStory');
const { successStorySchema, storyIdParamSchema } = require('../validation/successStory');

const router = express.Router();

router.post('/stories', auth, validate(successStorySchema), submitSuccessStoryHandler);
router.get('/stories', auth, listSuccessStoriesHandler);
router.get('/stories/:storyId', auth, validate(storyIdParamSchema, 'params'), successStoryExists, getSuccessStoryHandler);

module.exports = router;
