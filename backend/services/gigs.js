const model = require('../models/gigs');

async function fetchMyGigs(userId) {
  return model.getMyGigs(userId);
}

async function fetchAppliedGigs(userId) {
  return model.getAppliedGigs(userId);
}

module.exports = { fetchMyGigs, fetchAppliedGigs };
