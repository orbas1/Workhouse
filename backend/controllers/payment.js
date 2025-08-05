const {
  distributePayments,
  getAgencyPayments,
  adjustPayment,
} = require('../services/payment');
const logger = require('../utils/logger');

async function distributePaymentsHandler(req, res) {
  const { agencyId } = req.params;
  try {
    const result = await distributePayments(agencyId, req.body.payments);
    res.status(201).json(result);
  } catch (err) {
    logger.error('Failed to distribute payments', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getPaymentsHandler(req, res) {
  const { agencyId } = req.params;
  try {
    const payments = await getAgencyPayments(agencyId);
    res.json(payments);
  } catch (err) {
    logger.error('Failed to retrieve payments', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function adjustPaymentHandler(req, res) {
  const { agencyId } = req.params;
  const { paymentId, newAmount, reason } = req.body;
  try {
    const data = await adjustPayment(agencyId, paymentId, newAmount, reason);
    res.json(data);
  } catch (err) {
    logger.error('Failed to adjust payment', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  distributePaymentsHandler,
  getPaymentsHandler,
  adjustPaymentHandler,
};
