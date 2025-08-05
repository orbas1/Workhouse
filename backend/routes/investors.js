const express = require('express');
const {
  createGroupHandler,
  getGroupHandler,
  listGroupsHandler,
  addMemberHandler,
  removeMemberHandler,
} = require('../controllers/investorGroup');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { groupExists, requireGroupOwner } = require('../middleware/investorGroup');
const {
  createGroupSchema,
  groupIdParamSchema,
  addMemberSchema,
  groupMemberParamsSchema,
} = require('../validation/investorGroup');

const router = express.Router();

router.use(auth);

router.post('/groups/create', validate(createGroupSchema), createGroupHandler);
router.get('/groups', listGroupsHandler);
router.get(
  '/groups/:groupId',
  validate(groupIdParamSchema, 'params'),
  groupExists,
  getGroupHandler
);
router.post(
  '/groups/:groupId/members',
  validate(groupIdParamSchema, 'params'),
  groupExists,
  requireGroupOwner,
  validate(addMemberSchema),
  addMemberHandler
);
router.delete(
  '/groups/:groupId/members/:memberId',
  validate(groupMemberParamsSchema, 'params'),
  groupExists,
  requireGroupOwner,
  removeMemberHandler
);

module.exports = router;
