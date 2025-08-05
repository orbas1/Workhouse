const express = require('express');
const {
  updateModelTrainingHandler,
  evaluateModelPerformanceHandler,
} = require('../controllers/machineLearning');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const {
  modelTrainingUpdateSchema,
  modelPerformanceQuerySchema,
} = require('../validation/machineLearning');

const router = express.Router();

router.post(
  '/model-training/update',
  auth,
  authorize('admin', 'ml-engineer'),
  validate(modelTrainingUpdateSchema),
  updateModelTrainingHandler,
);

router.get(
  '/model-performance/evaluation',
  auth,
  authorize('admin', 'ml-engineer'),
  validate(modelPerformanceQuerySchema, 'query'),
  evaluateModelPerformanceHandler,
);

module.exports = router;
