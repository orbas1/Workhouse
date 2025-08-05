const campaignService = require('../services/campaign');
const logger = require('../utils/logger');

module.exports = async (req, res, next) => {
  const { campaignId } = req.params;
  const campaign = await campaignService.getCampaignById(campaignId);
  if (!campaign) {
    logger.error('Campaign not found', { campaignId });
    return res.status(404).json({ error: 'Campaign not found' });
  }
  req.campaign = campaign;
  next();
};
