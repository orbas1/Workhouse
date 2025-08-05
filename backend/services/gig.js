const gigModel = require('../models/gig');
const logger = require('../utils/logger');

async function createGig(ownerId, data) {
  const gig = gigModel.createGig({ ...data, ownerId });
  logger.info('Gig created', { gigId: gig.id, ownerId });
  return gig;
}

async function listGigs(ownerId) {
  return gigModel.listGigsByOwner(ownerId);
}

async function getGig(id) {
  return gigModel.getGig(id);
}

async function updateGig(id, ownerId, updates) {
  const gig = gigModel.getGig(id);
  if (!gig || gig.ownerId !== ownerId) {
    return null;
  }
  const updated = gigModel.updateGig(id, updates);
  logger.info('Gig updated', { gigId: id, ownerId });
  return updated;
}

async function removeGig(id, ownerId) {
  const gig = gigModel.getGig(id);
  if (!gig || gig.ownerId !== ownerId) {
    return false;
  }
  const deleted = gigModel.removeGig(id);
  logger.info('Gig removed', { gigId: id, ownerId });
  return deleted;
}

module.exports = {
  createGig,
  listGigs,
  getGig,
  updateGig,
  removeGig,
};
