const {
  registerAffiliate,
  getAffiliateById,
  updateAffiliate,
  recordAffiliateAgreement,
} = require('../services/affiliate');
const logger = require('../utils/logger');

async function registerAffiliateHandler(req, res) {
  try {
    const affiliate = await registerAffiliate(req.body);
    res.status(201).json(affiliate);
  } catch (err) {
    logger.error('Failed to register affiliate', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function getAffiliateHandler(req, res) {
  const { affiliateId } = req.params;
  try {
    const affiliate = await getAffiliateById(affiliateId);
    res.json(affiliate);
  } catch (err) {
    logger.error('Failed to fetch affiliate', { error: err.message });
    res.status(404).json({ error: err.message });
  }
}

async function updateAffiliateHandler(req, res) {
  const { affiliateId } = req.params;
  try {
    const affiliate = await updateAffiliate(affiliateId, req.body);
    res.json(affiliate);
  } catch (err) {
    logger.error('Failed to update affiliate', { error: err.message });
    res.status(404).json({ error: err.message });
  }
}

async function updateAgreementHandler(req, res) {
  const { affiliateId, agreementVersion } = req.body;
  try {
    const record = await recordAffiliateAgreement(affiliateId, agreementVersion);
    res.status(201).json(record);
  } catch (err) {
    logger.error('Failed to record affiliate agreement', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  registerAffiliateHandler,
  getAffiliateHandler,
  updateAffiliateHandler,
  updateAgreementHandler,
};
