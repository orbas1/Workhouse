const {
  getSubscription,
  updateSubscription,
  listPaymentMethods,
  addPaymentMethod,
  removePaymentMethod,
  getTransactions,
  generateInvoice,
} = require('../services/billing');
const logger = require('../utils/logger');

async function getSubscriptionHandler(req, res) {
  try {
    const data = await getSubscription(req.user.id);
    res.json(data);
  } catch (err) {
    logger.error('Failed to fetch subscription', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function updateSubscriptionHandler(req, res) {
  try {
    const data = await updateSubscription(req.user.id, req.body);
    res.json(data);
  } catch (err) {
    logger.error('Failed to update subscription', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function listPaymentMethodsHandler(req, res) {
  try {
    const methods = await listPaymentMethods(req.user.id);
    res.json(methods);
  } catch (err) {
    logger.error('Failed to list payment methods', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function addPaymentMethodHandler(req, res) {
  try {
    const method = await addPaymentMethod(req.user.id, req.body);
    res.status(201).json(method);
  } catch (err) {
    logger.error('Failed to add payment method', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function removePaymentMethodHandler(req, res) {
  try {
    const success = await removePaymentMethod(req.user.id, req.params.methodId);
    if (!success) return res.status(404).json({ error: 'Method not found' });
    res.json({ success: true });
  } catch (err) {
    logger.error('Failed to remove payment method', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getTransactionsHandler(req, res) {
  try {
    const tx = await getTransactions(req.user.id);
    res.json(tx);
  } catch (err) {
    logger.error('Failed to fetch transactions', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getInvoiceHandler(req, res) {
  try {
    const pdf = await generateInvoice(req.user.id, req.params.transactionId);
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename=invoice_${req.params.transactionId}.pdf`,
    });
    res.send(pdf);
  } catch (err) {
    logger.error('Failed to generate invoice', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getSubscriptionHandler,
  updateSubscriptionHandler,
  listPaymentMethodsHandler,
  addPaymentMethodHandler,
  removePaymentMethodHandler,
  getTransactionsHandler,
  getInvoiceHandler,
};
