const { searchFreelancers } = require('../services/freelancers');

async function searchFreelancersHandler(req, res) {
  try {
    const { query, location, minRate, maxRate, minExperience } = req.query;
    const freelancers = await searchFreelancers({
      query,
      location,
      minRate: minRate !== undefined ? parseFloat(minRate) : undefined,
      maxRate: maxRate !== undefined ? parseFloat(maxRate) : undefined,
      minExperience: minExperience !== undefined ? parseInt(minExperience, 10) : undefined,
    });
    res.json({ freelancers });
  } catch (err) {
    res.status(500).json({ error: err.message || 'Search failed' });
  }
}

module.exports = { searchFreelancersHandler };
