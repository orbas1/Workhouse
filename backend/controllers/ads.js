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
};
