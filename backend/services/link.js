const { randomUUID } = require('crypto');
const { createLink, getLinksByAffiliate } = require('../models/link');

function listAffiliateLinks(affiliateId) {
  return getLinksByAffiliate(affiliateId);
}

function createAffiliateLink(affiliateId, url, description = '', materialType = 'link') {
  const newLink = {
    id: randomUUID(),
    affiliateId,
    url,
    description,
    materialType,
    clicks: 0,
    createdAt: new Date().toISOString(),
  };
  return createLink(newLink);
}

module.exports = { listAffiliateLinks, createAffiliateLink };
