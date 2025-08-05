const express = require('express');
const {
  generateHandler,
  contactHandler,
  historyHandler,
  getInteractionHandler,
  deleteInteractionHandler,
} = require('../controllers/transformersGpt2');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');
const validate = require('../middleware/validate');
const rateLimit = require('../middleware/gpt2RateLimit');
const mlRequestLogger = require('../middleware/mlRequestLogger');
const {
  generateSchema,
  contactSchema,
  idParamSchema,
} = require('../validation/transformersGpt2');

const router = express.Router();

router.post(
  '/generate',
  auth,
  authorize('admin', 'user'),
  rateLimit,
  mlRequestLogger,
  validate(generateSchema),
  generateHandler,
);

router.post(
  '/contact',
  auth,
  authorize('admin', 'user'),
  rateLimit,
  mlRequestLogger,
  validate(contactSchema),
  contactHandler,
);

router.get(
  '/history',
  auth,
  authorize('admin', 'user'),
  mlRequestLogger,
  historyHandler,
);

router.get(
  '/:id',
  auth,
  authorize('admin', 'user'),
  validate(idParamSchema, 'params'),
  getInteractionHandler,
);

router.delete(
  '/:id',
  auth,
  authorize('admin'),
  validate(idParamSchema, 'params'),
  deleteInteractionHandler,
);

module.exports = router;
