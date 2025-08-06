const express = require('express');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  createDisputeHandler,
  respondToDisputeHandler,
  getDisputeHandler,
  listDisputesHandler,
  getDisputeDetails,
  postDisputeMessage,
} = require('../controllers/disputes');
const {
  createDisputeSchema,
  respondDisputeSchema,
  disputeIdParamSchema,
  messageSchema,
} = require('../validation/disputes');

const router = express.Router();

router.get('/', auth, listDisputesHandler);
router.post('/create', auth, validate(createDisputeSchema), createDisputeHandler);
router.post(
  '/:disputeId/respond',
  auth,
  validate(disputeIdParamSchema, 'params'),
  validate(respondDisputeSchema),
  respondToDisputeHandler
);
router.get('/:disputeId', auth, validate(disputeIdParamSchema, 'params'), getDisputeHandler);
router.get('/:disputeId/details', auth, validate(disputeIdParamSchema, 'params'), getDisputeDetails);
router.post(
  '/:disputeId/messages',
  auth,
  validate(disputeIdParamSchema, 'params'),
  validate(messageSchema),
  postDisputeMessage
);

module.exports = router;
