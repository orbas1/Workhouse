const express = require('express');
const { getDisputeDetails, postDisputeMessage } = require('../controllers/disputes');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { disputeIdParamSchema, messageSchema } = require('../validation/disputes');

const router = express.Router();

router.get('/:disputeId', auth, validate(disputeIdParamSchema, 'params'), getDisputeDetails);
router.post(
  '/:disputeId/messages',
  auth,
  validate(disputeIdParamSchema, 'params'),
  validate(messageSchema),
  postDisputeMessage
);

module.exports = router;
