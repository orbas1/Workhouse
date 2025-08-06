const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  createDisputeHandler,
  respondToDisputeHandler,
  getDisputeHandler,
} = require('../controllers/disputes');
const {
  createDisputeSchema,
  respondDisputeSchema,
  disputeIdParamSchema,
} = require('../validation/disputes');

router.post('/create', auth, validate(createDisputeSchema), createDisputeHandler);
router.post('/:disputeId/respond', auth, validate(respondDisputeSchema), respondToDisputeHandler);
router.get('/:disputeId', auth, validate(disputeIdParamSchema, 'params'), getDisputeHandler);
const disputeModel = require('../models/dispute');

// List disputes; optionally filter by user
router.get('/', (req, res) => {
  const { userId } = req.query;
  let disputes = disputeModel.findAll();
  if (userId) {
    disputes = disputes.filter(d => d.userId === userId);
  }
  res.json(disputes);
});

module.exports = router;
