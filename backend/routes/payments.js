const express = require('express');
const {
  distributePaymentsHandler,
  getPaymentsHandler,
  adjustPaymentHandler,
} = require('../controllers/payment');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  distributeSchema,
  adjustSchema,
} = require('../validation/payment');

const router = express.Router({ mergeParams: true });

router.post('/distribute', auth, validate(distributeSchema), distributePaymentsHandler);
router.get('/', auth, getPaymentsHandler);
router.post('/adjust', auth, validate(adjustSchema), adjustPaymentHandler);

module.exports = router;
