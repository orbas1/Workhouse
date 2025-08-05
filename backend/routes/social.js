const express = require('express');
const {
  joinGroupHandler,
  postInGroupHandler,
  scheduleLiveStudyHandler,
  applyForMentorshipHandler,
} = require('../controllers/socialLearning');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { ensureGroupMember, ensureSelf } = require('../middleware/social');
const {
  groupIdParamSchema,
  postSchema,
  liveStudySchema,
  userIdParamSchema,
  mentorshipApplicationSchema,
} = require('../validation/socialLearning');

const router = express.Router();

router.post('/join/:groupId', auth, validate(groupIdParamSchema, 'params'), joinGroupHandler);
router.post('/post/:groupId', auth, validate(groupIdParamSchema, 'params'), ensureGroupMember, validate(postSchema), postInGroupHandler);
router.post('/live-study/:groupId', auth, validate(groupIdParamSchema, 'params'), ensureGroupMember, validate(liveStudySchema), scheduleLiveStudyHandler);
router.post('/mentorship/apply/:userId', auth, validate(userIdParamSchema, 'params'), ensureSelf, validate(mentorshipApplicationSchema), applyForMentorshipHandler);

module.exports = router;
