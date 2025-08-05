const express = require('express');
const {
  addPortfolioItemHandler,
  getPortfolioHandler,
  exportPortfolioHandler,
  addProjectDetailHandler,
} = require('../controllers/portfolio');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const portfolioMiddleware = require('../middleware/portfolio');
const {
  userIdParamSchema,
  projectIdParamSchema,
  addPortfolioItemSchema,
  exportPortfolioSchema,
  addProjectDetailSchema,
} = require('../validation/portfolio');

const router = express.Router();

// Stage 81 routes
router.post(
  '/add/:userId',
  auth,
  validate(userIdParamSchema, 'params'),
  validate(addPortfolioItemSchema),
  addPortfolioItemHandler
);

router.get(
  '/:userId',
  auth,
  validate(userIdParamSchema, 'params'),
  getPortfolioHandler
);

router.post(
  '/export/:userId',
  auth,
  validate(userIdParamSchema, 'params'),
  validate(exportPortfolioSchema),
  exportPortfolioHandler
);

router.post(
  '/project/detail/:projectId',
  auth,
  validate(projectIdParamSchema, 'params'),
  portfolioMiddleware,
  validate(addProjectDetailSchema),
  addProjectDetailHandler
);

// Stage 101 routes
router.post(
  '/projects',
  auth,
  validate(addPortfolioItemSchema),
  addPortfolioItemHandler
);

router.get('/user', auth, getPortfolioHandler);

module.exports = router;
