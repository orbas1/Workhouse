const {
  fetchOnboardingMaterials,
  registerAffiliateForWebinar
} = require('../services/onboarding');

async function getOnboardingMaterials(req, res) {
  try {
    const materials = await fetchOnboardingMaterials();
    res.json({ materials });
  } catch (err) {
    console.error('Failed to fetch onboarding materials', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function registerWebinar(req, res) {
  const { webinarId } = req.body;
  try {
    const registration = await registerAffiliateForWebinar(
      req.user.username,
      webinarId
    );
    res.status(201).json(registration);
  } catch (err) {
    console.error('Failed to register webinar', err);
    res.status(400).json({ error: err.message });
  }
}

module.exports = {
  getOnboardingMaterials,
  registerWebinar
};
