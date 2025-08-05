const express = require('express');
const {
  createCampaignHandler,
  listCampaignsHandler,
  getCampaignHandler,
} = require('../controllers/campaign');
const auth = require('../middleware/auth');
const validate = require('../middleware/validate');
const campaignExists = require('../middleware/campaign');
const {
  createCampaignSchema,
  listCampaignsQuerySchema,
  campaignIdParamSchema,
} = require('../validation/campaign');

const router = express.Router();

router.post('/', auth, validate(createCampaignSchema), createCampaignHandler);
router.get('/', auth, validate(listCampaignsQuerySchema, 'query'), listCampaignsHandler);
router.get(
  '/:campaignId',
  auth,
  validate(campaignIdParamSchema, 'params'),
  campaignExists,
  getCampaignHandler
);

module.exports = router;
