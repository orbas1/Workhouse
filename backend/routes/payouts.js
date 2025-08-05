const express = require('express');
const authenticate = require('../middleware/auth');
const {
  validateInitiatePayout,
  validateStatusUpdate,
} = require('../middleware/payoutValidation');
const {
  initiatePayoutHandler,
  payoutHistoryHandler,
  updatePayoutStatusHandler,
} = require('../controllers/payoutController');

const router = express.Router();

router.post('/initiate/:affiliateId', authenticate, validateInitiatePayout, initiatePayoutHandler);
router.get('/:affiliateId/history', authenticate, payoutHistoryHandler);
router.put('/:payoutId/status-update', authenticate, validateStatusUpdate, updatePayoutStatusHandler);

module.exports = router;
