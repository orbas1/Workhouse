const service = require('../services/ads');

async function billingHandler(req, res) {
  const data = service.getBillingInfo();
  res.json(data);
}

async function analyticsHandler(req, res) {
  const data = service.getAnalytics();
  res.json(data);
}

async function libraryHandler(req, res) {
  const data = service.getAdLibrary();
  res.json(data);
}

module.exports = {
  billingHandler,
  analyticsHandler,
  libraryHandler
const Ads = require('../models/ads');

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

module.exports = {
  getAds,
  getPreferences,
  updatePreferences,
};
