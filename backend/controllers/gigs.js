const { fetchMyGigs, fetchAppliedGigs } = require('../services/gigs');

async function getMyGigsHandler(req, res) {
  try {
    const gigs = await fetchMyGigs(req.user.id);
    res.json(gigs);
  } catch (err) {
    console.error('Failed to fetch user gigs', err);
    res.status(500).json({ error: 'Failed to fetch gigs' });
  }
}

async function getAppliedGigsHandler(req, res) {
  try {
    const gigs = await fetchAppliedGigs(req.user.id);
    res.json(gigs);
  } catch (err) {
    console.error('Failed to fetch applied gigs', err);
    res.status(500).json({ error: 'Failed to fetch gigs' });
  }
}

module.exports = { getMyGigsHandler, getAppliedGigsHandler };
