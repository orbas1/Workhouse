const resourceModel = require('../models/resource');
const logger = require('../utils/logger');

function validateResourceType(req, res, next) {
  const { resourceType } = req.params;
  if (!resourceModel.isValidResourceType(resourceType)) {
    logger.error('Resource type not found', { resourceType });
    return res.status(404).json({ error: 'Resource type not found' });
  }
  next();
}

function validateRegion(req, res, next) {
  const { region } = req.params;
  if (!resourceModel.isValidRegion(region)) {
    logger.error('Legal resources not available for region', { region });
    return res.status(404).json({ error: 'Region not found' });
  }
  next();
}

function checkFundingSubscription(req, res, next) {
  const profileId = req.params.profileId || req.body.profileId;
  if (!resourceModel.isSubscribed(profileId)) {
    logger.error('Funding subscription not found', { profileId });
    return res.status(404).json({ error: 'Subscription not found' });
  }
  next();
}

module.exports = {
  validateResourceType,
  validateRegion,
  checkFundingSubscription,
};
