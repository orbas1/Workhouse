const campaignModel = require('../models/campaign');
const logger = require('../utils/logger');

function evaluateStatus(campaign) {
  if (!campaign) return campaign;
  const now = new Date();
  const completedByProgress = campaign.progress >= campaign.goalTarget;
  const completedByTime = campaign.endDate && now > campaign.endDate;
  const status = completedByProgress || completedByTime ? 'completed' : 'ongoing';
  if (campaign.status !== status) {
    campaignModel.updateCampaign(campaign.id, { status });
    campaign.status = status;
  }
  return campaign;
}

async function createCampaign(userId, data) {
  const campaign = campaignModel.createCampaign({ ...data, createdBy: userId });
  logger.info('Campaign created', { campaignId: campaign.id, userId });
  return campaign;
}

async function getCampaignById(campaignId) {
  const campaign = campaignModel.getCampaignById(campaignId);
  return evaluateStatus(campaign);
}

async function listCampaigns(filter = {}) {
  const campaigns = campaignModel.listCampaigns(filter).map(evaluateStatus);
  return campaigns;
}

module.exports = {
  createCampaign,
  getCampaignById,
  listCampaigns,
};
