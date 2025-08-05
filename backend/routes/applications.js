const express = require('express');
const {
  createApplicationHandler,
  getUserApplicationsHandler,
  getOpportunityApplicationsHandler,
  updateApplicationStatusHandler,
} = require('../controllers/application');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const applicationExists = require('../middleware/application');
const requireRole = require('../middleware/requireRole');
const {
  applicationCreationSchema,
  applicationIdParamSchema,
  opportunityIdParamSchema,
  statusUpdateSchema,
} = require('../validation/application');

const router = express.Router();

// Submit a new volunteer application
router.post('/', auth, requireRole('volunteer', 'admin'), validate(applicationCreationSchema), createApplicationHandler);

// Get applications for the authenticated volunteer
router.get('/user', auth, getUserApplicationsHandler);

// Get applications for a specific opportunity (organization access)
router.get(
  '/opportunity/:opportunityId',
  auth,
  requireRole('organization', 'admin'),
  validate(opportunityIdParamSchema, 'params'),
  getOpportunityApplicationsHandler
);

// Update application status
router.put(
  '/:applicationId/status',
  auth,
  requireRole('organization', 'admin'),
  validate(applicationIdParamSchema, 'params'),
  validate(statusUpdateSchema),
  applicationExists,
  updateApplicationStatusHandler
);

module.exports = router;
