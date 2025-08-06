const express = require('express');
const {
  getSubscriptionHandler,
  updateSubscriptionHandler,
  listPaymentMethodsHandler,
  addPaymentMethodHandler,
  removePaymentMethodHandler,
  getTransactionsHandler,
} = require('../controllers/billing');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/subscription', auth, getSubscriptionHandler);
router.put('/subscription', auth, updateSubscriptionHandler);
router.get('/payment-methods', auth, listPaymentMethodsHandler);
router.post('/payment-methods', auth, addPaymentMethodHandler);
router.delete('/payment-methods/:methodId', auth, removePaymentMethodHandler);
router.get('/transactions', auth, getTransactionsHandler);

module.exports = router;
