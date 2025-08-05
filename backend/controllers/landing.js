const { listFeatures, listPartners, listBadges } = require('../models/landingContent');
const fetchExternal = require('../utils/fetchExternal');

async function getLandingContent(req, res) {
  try {
      const features = listFeatures();
      const partners = listPartners();
      const badges = listBadges();
      let testimonials = [];
    const apiUrl = process.env.EXTERNAL_TESTIMONIAL_API;
    if (apiUrl) {
      const data = await fetchExternal(apiUrl);
      testimonials = data.slice(0, 3).map(item => ({
        id: item.id,
        name: item.name || 'Anonymous',
        quote: item.body || ''
      }));
    }
      res.json({ features, testimonials, partners, badges });
  } catch (err) {
    res.status(500).json({ error: 'Failed to load landing content' });
  }
}

module.exports = { getLandingContent };
