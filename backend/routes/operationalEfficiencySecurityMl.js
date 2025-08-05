const express = require('express');
const {
  threatDetectionHandler,
  efficiencyAnalysisHandler,
  apiUsageOptimizationHandler,
} = require('../controllers/operationalEfficiencySecurityMl');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const parseDateRange = require('../middleware/parseDateRange');
const { dateRangeQuerySchema } = require('../validation/operationalEfficiencySecurityMl');

const router = express.Router();

router.get(
  '/security/threat-detection',
  auth,
  authorize('admin', 'security-analyst'),
  validate(dateRangeQuerySchema, 'query'),
  parseDateRange,
  threatDetectionHandler
);

router.get(
  '/operations/efficiency-analysis',
  auth,
  authorize('admin', 'ops-manager'),
  validate(dateRangeQuerySchema, 'query'),
  parseDateRange,
  efficiencyAnalysisHandler
);

router.get(
  '/api-usage/optimization',
  auth,
  authorize('admin', 'devops'),
  validate(dateRangeQuerySchema, 'query'),
  parseDateRange,
  apiUsageOptimizationHandler
);

module.exports = router;
