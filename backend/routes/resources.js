const express = require('express');
const {
  listServicesHandler,
  requestServiceHandler,
  getResourcesByTypeHandler,
  getLegalResourcesHandler,
  subscribeFundingAlertsHandler,
  getFundingAlertsHandler,
  applyMentorshipHandler,
  listMentorsHandler,
} = require('../controllers/resource');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const {
  validateResourceType,
  validateRegion,
  checkFundingSubscription,
} = require('../middleware/resource');
const {
  serviceRequestSchema,
  resourceTypeParamSchema,
  regionParamSchema,
  fundingSubscribeSchema,
  profileIdParamSchema,
  mentorshipApplicationSchema,
} = require('../validation/resource');

const router = express.Router();

router.use(auth);

router.get('/marketplace/services', listServicesHandler);
router.post(
  '/marketplace/services/request',
  validate(serviceRequestSchema),
  requestServiceHandler
);

router.get(
  '/resources/:resourceType',
  validate(resourceTypeParamSchema, 'params'),
  validateResourceType,
  getResourcesByTypeHandler
);
router.get(
  '/resources/legal/:region',
  validate(regionParamSchema, 'params'),
  validateRegion,
  getLegalResourcesHandler
);

router.post(
  '/alerts/funding/subscribe',
  validate(fundingSubscribeSchema),
  subscribeFundingAlertsHandler
);
router.get(
  '/alerts/funding/:profileId',
  validate(profileIdParamSchema, 'params'),
  checkFundingSubscription,
  getFundingAlertsHandler
);

router.post(
  '/mentorship/apply',
  validate(mentorshipApplicationSchema),
  applyMentorshipHandler
);
router.get('/mentorship/mentors', listMentorsHandler);

module.exports = router;
