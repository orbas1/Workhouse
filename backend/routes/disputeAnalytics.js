const express = require('express');
const {
  getAllDisputesAnalytics,
  getDisputesByCategoryHandler,
  getDisputeAnalyticsByIdHandler,
} = require('../controllers/disputeAnalytics');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const {
  categoryQuerySchema,
  disputeIdParamSchema,
} = require('../validation/disputeAnalytics');

const router = express.Router();

router.get('/all', auth, authorize('admin', 'dispute-manager'), getAllDisputesAnalytics);
router.get(
  '/byCategory',
  auth,
  authorize('admin', 'dispute-manager'),
  validate(categoryQuerySchema, 'query'),
  getDisputesByCategoryHandler
);
router.get(
  '/:disputeId',
  auth,
  authorize('admin', 'dispute-manager'),
  validate(disputeIdParamSchema, 'params'),
  getDisputeAnalyticsByIdHandler
);

module.exports = router;
