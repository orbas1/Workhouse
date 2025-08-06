const {
  listFeatures,
  listPartners,
  listBadges,
  listTestimonials,
} = require('../models/landingContent');

async function getLandingContent(req, res) {
  try {
    const features = listFeatures();
    const partners = listPartners();
    const badges = listBadges();
    const testimonials = listTestimonials();
    res.json({ features, testimonials, partners, badges });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load landing content' });
  }
}

module.exports = { getLandingContent };
