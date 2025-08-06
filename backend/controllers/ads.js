const service = require('../services/ads');
const Ads = require('../models/ads');
const campaignModel = require('../models/campaign');

function billingHandler(req, res) {
  const data = service.getBillingInfo();
  res.json(data);
}

function analyticsHandler(req, res) {
  const data = service.getAnalytics();
  res.json(data);
}

function libraryHandler(req, res) {
  const data = service.getAdLibrary();
  res.json(data);
}

function getAds(req, res) {
  const data = Ads.listAds();
  res.json(data);
}

function getPreferences(req, res) {
  const userId = req.user?.id || req.query.userId || 'anonymous';
  const prefs = Ads.getPreferences(userId);
  res.json({ preferences: prefs });
}

function updatePreferences(req, res) {
  const userId = req.user?.id || req.body.userId || 'anonymous';
  const prefs = Array.isArray(req.body.preferences) ? req.body.preferences : [];
  Ads.updatePreferences(userId, prefs);
  res.json({ preferences: prefs });
}

function createCampaign(req, res) {
  const creator = req.user?.id || 'system';
  const campaign = campaignModel.createCampaign({ ...req.body, createdBy: creator });
  res.status(201).json(campaign);
}

function updateCampaign(req, res) {
  const updated = campaignModel.updateCampaign(req.params.id, req.body);
  if (!updated) return res.status(404).json({ error: 'Campaign not found' });
  res.json(updated);
}

module.exports = {
  billingHandler,
  analyticsHandler,
  libraryHandler,
  getAds,
  getPreferences,
  updatePreferences,
  createCampaign,
  updateCampaign,
};

