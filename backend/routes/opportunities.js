const express = require('express');
const {
  listOpportunitiesHandler,
  createOpportunityHandler,
  getOpportunityHandler,
  updateOpportunityHandler,
  deleteOpportunityHandler,
  getOpportunityDashboardHandler,
} = require('../controllers/opportunity');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const opportunityExists = require('../middleware/opportunity');
const {
  opportunityIdParamSchema,
  opportunityQuerySchema,
  createOpportunitySchema,
  updateOpportunitySchema,
} = require('../validation/opportunity');

const router = express.Router();

router.get('/', auth, validate(opportunityQuerySchema, 'query'), listOpportunitiesHandler);
router.post('/', auth, validate(createOpportunitySchema), createOpportunityHandler);
router.get('/dashboard', auth, getOpportunityDashboardHandler);
router.get('/:opportunityId', auth, validate(opportunityIdParamSchema, 'params'), opportunityExists, getOpportunityHandler);
router.put('/:opportunityId', auth, validate(opportunityIdParamSchema, 'params'), opportunityExists, validate(updateOpportunitySchema), updateOpportunityHandler);
router.delete('/:opportunityId', auth, validate(opportunityIdParamSchema, 'params'), opportunityExists, deleteOpportunityHandler);

module.exports = router;
