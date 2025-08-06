const { createGig, listGigs, getGig, updateGig, removeGig, searchGigs } = require('../services/gig');
const { gigSchema } = require('../validation/gig');
const logger = require('../utils/logger');

async function createGigHandler(req, res) {
  const ownerId = req.user?.id || req.user?.username || 'anonymous';
  const { error, value } = gigSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  try {
    const gig = await createGig(ownerId, value);
    res.status(201).json(gig);
  } catch (err) {
    logger.error('Failed to create gig', { error: err.message, ownerId });
    res.status(500).json({ error: 'Failed to create gig' });
  }
}

async function listGigsHandler(req, res) {
  const ownerId = req.user?.id || req.user?.username || 'anonymous';
  const gigs = await listGigs(ownerId);
  res.json(gigs);
}

async function getGigHandler(req, res) {
  const { gigId } = req.params;
  const gig = await getGig(gigId);
  if (!gig) {
    return res.status(404).json({ error: 'Gig not found' });
  }
  res.json(gig);
}

async function updateGigHandler(req, res) {
  const ownerId = req.user?.id || req.user?.username || 'anonymous';
  const { gigId } = req.params;
  const { error, value } = gigSchema.validate(req.body, { allowUnknown: true });
  if (error) {
    return res.status(400).json({ error: error.message });
  }
  const updated = await updateGig(gigId, ownerId, value);
  if (!updated) {
    return res.status(404).json({ error: 'Gig not found' });
  }
  res.json(updated);
}

async function deleteGigHandler(req, res) {
  const ownerId = req.user?.id || req.user?.username || 'anonymous';
  const { gigId } = req.params;
  const deleted = await removeGig(gigId, ownerId);
  if (!deleted) {
    return res.status(404).json({ error: 'Gig not found' });
  }
  res.json({ success: true });
}

async function searchGigsHandler(req, res) {
  try {
    const gigs = await searchGigs(req.query);
    res.json(gigs);
  } catch (err) {
    logger.error('Failed to search gigs', { error: err.message });
    res.status(500).json({ error: 'Failed to search gigs' });
  }
}

module.exports = {
  createGigHandler,
  listGigsHandler,
  getGigHandler,
  updateGigHandler,
  deleteGigHandler,
  searchGigsHandler,
};
