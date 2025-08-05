const express = require('express');
const {
  getEngagementScoresHandler,
  questionAnsweringHandler,
} = require('../controllers/communityEngagementML');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const community = require('../middleware/community');
const validate = require('../middleware/validate');
const {
  engagementScoresQuerySchema,
  questionAnsweringSchema,
} = require('../validation/communityEngagementML');

const router = express.Router();

router.get(
  '/engagement-scores',
  auth,
  authorize('admin', 'community-manager'),
  community,
  validate(engagementScoresQuerySchema, 'query'),
  getEngagementScoresHandler
);

router.post(
  '/question-answering',
  auth,
  authorize('admin', 'community-manager'),
  community,
  validate(questionAnsweringSchema),
  questionAnsweringHandler
);

module.exports = router;
