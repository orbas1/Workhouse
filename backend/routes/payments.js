const express = require('express');
const {
  distributePaymentsHandler,
  getPaymentsHandler,
  adjustPaymentHandler,
  initiatePaymentHandler,
  getPaymentStatusHandler,
} = require('../controllers/payment');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  distributeSchema,
  adjustSchema,
  initiateSchema,
} = require('../validation/payment');

const router = express.Router({ mergeParams: true });

router.post('/distribute', auth, validate(distributeSchema), distributePaymentsHandler);
router.get('/', auth, getPaymentsHandler);
router.post('/adjust', auth, validate(adjustSchema), adjustPaymentHandler);
router.post('/initiate', auth, validate(initiateSchema), initiatePaymentHandler);
router.get('/status/:paymentId', auth, getPaymentStatusHandler);

module.exports = router;
