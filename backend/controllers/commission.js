const {
  getCommissionRates,
  updateCommissionRate,
  getCommissionRateHistory,
  recordCommission,
  getCommissionHistory,
  calculateCommission,
  adjustRateForPerformance,
  getLeaderboard,
} = require('../services/commission');

async function getRatesHandler(req, res) {
  try {
    res.json(getCommissionRates());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function updateRatesHandler(req, res) {
  try {
    const { tier, rate } = req.body;
    const result = updateCommissionRate(tier, rate);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getRateHistoryHandler(req, res) {
  try {
    res.json(getCommissionRateHistory());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function recordCommissionHandler(req, res) {
  try {
    const commission = recordCommission(req.body);
    res.status(201).json(commission);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getCommissionHistoryHandler(req, res) {
  try {
    const history = getCommissionHistory(req.params.affiliateId);
    res.json(history);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function calculateCommissionHandler(req, res) {
  try {
    const { tier, serviceFee } = req.body;
    const result = calculateCommission(tier, serviceFee);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function performanceAdjustHandler(req, res) {
  try {
    const { tier, rate } = req.body;
    const result = adjustRateForPerformance(tier, rate);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function getLeaderboardHandler(req, res) {
  try {
    const data = getLeaderboard();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getRatesHandler,
  updateRatesHandler,
  getRateHistoryHandler,
  recordCommissionHandler,
  getCommissionHistoryHandler,
  calculateCommissionHandler,
  performanceAdjustHandler,
  getLeaderboardHandler,
};
