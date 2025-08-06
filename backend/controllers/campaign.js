const { createCampaign, getCampaignById, listCampaigns, updateCampaign } = require('../services/campaign');
const logger = require('../utils/logger');

async function createCampaignHandler(req, res) {
  const userId = req.user?.username || req.user?.id;
  try {
    const campaign = await createCampaign(userId, req.body);
    res.status(201).json(campaign);
  } catch (err) {
    logger.error('Failed to create campaign', { error: err.message, userId });
    res.status(400).json({ error: err.message });
  }
}

async function listCampaignsHandler(req, res) {
  try {
    const campaigns = await listCampaigns(req.query);
    res.json(campaigns);
  } catch (err) {
    logger.error('Failed to list campaigns', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getCampaignHandler(req, res) {
  res.json(req.campaign);
}

async function updateCampaignHandler(req, res) {
  try {
    const campaign = await updateCampaign(req.params.campaignId, req.body);
    if (!campaign) return res.status(404).json({ error: 'Campaign not found' });
    res.json(campaign);
  } catch (err) {
    logger.error('Failed to update campaign', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  createCampaignHandler,
  listCampaignsHandler,
  getCampaignHandler,
  updateCampaignHandler,
};
