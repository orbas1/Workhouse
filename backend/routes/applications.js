const express = require('express');
const {
  createApplicationHandler,
  getUserApplicationsHandler,
  getOpportunityApplicationsHandler,
  updateApplicationStatusHandler,
  deleteApplicationHandler,
  getCompletedApplicationsHandler,
} = require('../controllers/application');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const applicationExists = require('../middleware/application');
const requireRole = require('../middleware/requireRole');
const applicationOwnership = require('../middleware/applicationOwnership');
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

// Get completed applications for the authenticated volunteer
router.get('/completed', auth, requireRole('volunteer', 'admin'), getCompletedApplicationsHandler);

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

// Withdraw an application
router.delete(
  '/:applicationId',
  auth,
  requireRole('volunteer', 'admin'),
  validate(applicationIdParamSchema, 'params'),
  applicationExists,
  applicationOwnership,
  deleteApplicationHandler
);

module.exports = router;
