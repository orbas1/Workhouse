const express = require('express');
const {
  recordTransactionHandler,
  getTransactionHistoryHandler,
  requestRefundHandler,
} = require('../controllers/financialTransactions');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const { recordSchema, refundSchema } = require('../validation/financialTransactions');

const router = express.Router();

router.post('/transactions/record/:userId', auth, validate(recordSchema), recordTransactionHandler);
router.get('/transactions/history/:userId', auth, getTransactionHistoryHandler);
router.post('/refunds/request/:eventId', auth, validate(refundSchema), requestRefundHandler);

module.exports = router;
