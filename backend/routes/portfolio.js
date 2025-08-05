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

module.exports = router;
