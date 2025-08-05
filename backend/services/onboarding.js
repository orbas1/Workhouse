const {
  getResources,
  addRegistration,
  findRegistration
} = require('../models/onboarding');

async function fetchOnboardingMaterials() {
  return getResources();
}

async function registerAffiliateForWebinar(affiliateId, webinarId) {
  if (findRegistration(affiliateId, webinarId)) {
    throw new Error('Affiliate already registered for this webinar');
  }
  const registration = {
    affiliateId,
    webinarId,
    registeredAt: new Date().toISOString()
  };
  addRegistration(registration);
  return registration;
}

module.exports = {
  fetchOnboardingMaterials,
  registerAffiliateForWebinar
};
