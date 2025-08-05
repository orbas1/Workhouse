const express = require('express');
const { getLoadPredictionHandler, getIncidentPredictionHandler } = require('../controllers/infrastructureOptimization');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const { verifyApiKey } = require('../middleware/infraOpsAuth');
const {
  loadPredictionQuerySchema,
  incidentPredictionQuerySchema,
} = require('../validation/infrastructureOptimization');

const router = express.Router();

router.get(
  '/infrastructure/load-prediction',
  auth,
  authorize('admin', 'devops'),
  verifyApiKey,
  validate(loadPredictionQuerySchema, 'query'),
  getLoadPredictionHandler
);

router.get(
  '/operations/incident-prediction',
  auth,
  authorize('admin', 'devops'),
  verifyApiKey,
  validate(incidentPredictionQuerySchema, 'query'),
  getIncidentPredictionHandler
);

module.exports = router;
