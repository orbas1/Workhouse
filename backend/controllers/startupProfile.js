const { upsertStartupProfile, getStartupProfile } = require('../models/startupProfile');

async function getProfile(req, res) {
  const profile = getStartupProfile(req.user.id);
  if (!profile) return res.status(200).json(null);
  res.json(profile);
}

async function updateProfile(req, res) {
  const profile = upsertStartupProfile(req.user.id, req.body);
  res.json(profile);
}

module.exports = {
  getProfile,
  updateProfile,
};
