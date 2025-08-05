const logger = require('../utils/logger');
const affiliateModel = require('../models/affiliate');

async function registerAffiliate(data) {
  const existing = affiliateModel.findByEmail(data.email);
  if (existing) {
    throw new Error('Affiliate already exists');
  }
  const affiliate = affiliateModel.createAffiliate(data);
  logger.info('Affiliate registered', { affiliateId: affiliate.id });
  return affiliate;
}

async function getAffiliateById(id) {
  const affiliate = affiliateModel.findById(id);
  if (!affiliate) {
    throw new Error('Affiliate not found');
  }
  return affiliate;
}

async function updateAffiliate(id, updates) {
  const affiliate = affiliateModel.updateAffiliate(id, updates);
  if (!affiliate) {
    throw new Error('Affiliate not found');
  }
  logger.info('Affiliate updated', { affiliateId: id });
  return affiliate;
}

async function recordAffiliateAgreement(affiliateId, agreementVersion) {
  const affiliate = affiliateModel.findById(affiliateId);
  if (!affiliate) {
    throw new Error('Affiliate not found');
  }
  const record = affiliateModel.recordAgreement(affiliateId, agreementVersion);
  logger.info('Affiliate agreement updated', { affiliateId, agreementVersion });
  return record;
}

module.exports = {
  registerAffiliate,
  getAffiliateById,
  updateAffiliate,
  recordAffiliateAgreement,
};
