const model = require('../models/ads');
const logger = require('../utils/logger');

function getBillingInfo() {
  logger.info('Fetched billing information');
  return {
    methods: model.getPaymentMethods(),
    transactions: model.getTransactions()
  };
}

function getAnalytics() {
  const campaigns = model.getCampaigns();
  const totals = campaigns.reduce((acc, c) => {
    acc.impressions += c.impressions;
    acc.clicks += c.clicks;
    acc.spend += c.spend;
    return acc;
  }, { impressions: 0, clicks: 0, spend: 0 });
  totals.ctr = totals.impressions ? totals.clicks / totals.impressions : 0;
  logger.info('Fetched analytics overview', { campaigns: campaigns.length });
  return { campaigns, totals };
}

function getAdLibrary() {
  logger.info('Fetched ad library');
  return model.getCampaigns();
}

module.exports = {
  getBillingInfo,
  getAnalytics,
  getAdLibrary
};
