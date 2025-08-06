const express = require('express');
const {
  getRatesHandler,
  updateRatesHandler,
  getRateHistoryHandler,
  recordCommissionHandler,
  getCommissionHistoryHandler,
  calculateCommissionHandler,
  performanceAdjustHandler,
  getLeaderboardHandler,
} = require('../controllers/commission');
const auth = require('../middleware/auth');
const {
  validateRateUpdate,
  validateRecordCommission,
  validateCalculateCommission,
} = require('../middleware/validateCommission');

const router = express.Router();

router.use(auth);

router.get('/rates', getRatesHandler);
router.put('/rates/update', validateRateUpdate, updateRatesHandler);
router.get('/rates/history', getRateHistoryHandler);
router.post('/rates/performance-adjust', validateRateUpdate, performanceAdjustHandler);
router.post('/record', validateRecordCommission, recordCommissionHandler);
router.get('/:affiliateId/history', getCommissionHistoryHandler);
router.post('/calculate', validateCalculateCommission, calculateCommissionHandler);
router.get('/leaderboard', getLeaderboardHandler);

module.exports = router;
