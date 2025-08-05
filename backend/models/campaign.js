const { randomUUID } = require('crypto');

// In-memory store for campaigns
const campaigns = new Map();

function createCampaign({ title, description = '', goalType, goalTarget, startDate, endDate, createdBy }) {
  const id = randomUUID();
  const now = new Date();
  const campaign = {
    id,
    title,
    description,
    goalType,
    goalTarget,
    progress: 0,
    startDate: startDate ? new Date(startDate) : now,
    endDate: endDate ? new Date(endDate) : null,
    status: 'ongoing',
    createdBy,
    createdAt: now,
    updatedAt: now,
  };
  campaigns.set(id, campaign);
  return campaign;
}

function getCampaignById(id) {
  return campaigns.get(id);
}

function listCampaigns(filter = {}) {
  let list = Array.from(campaigns.values());
  if (filter.status) {
    list = list.filter((c) => c.status === filter.status);
  }
  return list;
}

function updateCampaign(id, updates) {
  const campaign = campaigns.get(id);
  if (!campaign) return null;
  const updated = { ...campaign, ...updates, updatedAt: new Date() };
  campaigns.set(id, updated);
  return updated;
}

module.exports = {
  createCampaign,
  getCampaignById,
  listCampaigns,
  updateCampaign,
};
