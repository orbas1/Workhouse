const { createCampaign, getCampaignById, listCampaigns } = require('../services/campaign');
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

module.exports = {
  createCampaignHandler,
  listCampaignsHandler,
  getCampaignHandler,
};
