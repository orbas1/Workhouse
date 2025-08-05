const {
  initiatePayout,
  getPayoutHistory,
  updatePayoutStatusService,
} = require('../services/payout');

async function initiatePayoutHandler(req, res) {
  const { affiliateId } = req.params;
  const { amount } = req.body;
  try {
    const payout = await initiatePayout(Number(affiliateId), amount);
    res.status(201).json(payout);
  } catch (err) {
    console.error('Error initiating payout', err);
    res.status(400).json({ error: err.message });
  }
}

async function payoutHistoryHandler(req, res) {
  const { affiliateId } = req.params;
  try {
    const history = await getPayoutHistory(Number(affiliateId));
    res.json(history);
  } catch (err) {
    console.error('Error fetching payout history', err);
    res.status(400).json({ error: err.message });
  }
}

async function updatePayoutStatusHandler(req, res) {
  const { payoutId } = req.params;
  const { status } = req.body;
  try {
    const payout = await updatePayoutStatusService(Number(payoutId), status);
    res.json(payout);
  } catch (err) {
    console.error('Error updating payout status', err);
    res.status(err.statusCode || 400).json({ error: err.message });
  }
}

module.exports = {
  initiatePayoutHandler,
  payoutHistoryHandler,
  updatePayoutStatusHandler,
};
