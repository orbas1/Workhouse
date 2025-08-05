const {
  createMentorProfile,
  createMenteeProfile,
  updateProfile,
  getProfile,
  uploadPortfolioItem,
  getPreferences,
  addOrUpdateSkills,
  calculateMatchPotential,
} = require('../services/profile');
const logger = require('../utils/logger');

async function createMentorProfileHandler(req, res) {
  try {
    const profile = await createMentorProfile(req.body);
    res.status(201).json(profile);
  } catch (err) {
    logger.error('Failed to create mentor profile', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function createMenteeProfileHandler(req, res) {
  try {
    const profile = await createMenteeProfile(req.body);
    res.status(201).json(profile);
  } catch (err) {
    logger.error('Failed to create mentee profile', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function updateProfileHandler(req, res) {
  const { userId } = req.params;
  try {
    const profile = await updateProfile(userId, req.body);
    res.json(profile);
  } catch (err) {
    logger.error('Failed to update profile', { error: err.message, userId });
    res.status(404).json({ error: err.message });
  }
}

async function getProfileHandler(req, res) {
  const { userId } = req.params;
  try {
    const profile = await getProfile(userId);
    res.json(profile);
  } catch (err) {
    logger.error('Failed to retrieve profile', { error: err.message, userId });
    res.status(404).json({ error: err.message });
  }
}

async function uploadPortfolioItemHandler(req, res) {
  const { userId } = req.params;
  try {
    const item = await uploadPortfolioItem(userId, req.body);
    res.status(201).json(item);
  } catch (err) {
    logger.error('Failed to upload portfolio item', { error: err.message, userId });
    res.status(404).json({ error: err.message });
  }
}

async function getPreferencesHandler(req, res) {
  const { userId } = req.params;
  try {
    const prefs = await getPreferences(userId);
    res.json(prefs);
  } catch (err) {
    logger.error('Failed to retrieve preferences', { error: err.message, userId });
    res.status(404).json({ error: err.message });
  }
}

async function addOrUpdateSkillsHandler(req, res) {
  const { userId } = req.params;
  const { skills } = req.body;
  try {
    const result = await addOrUpdateSkills(userId, skills);
    res.json({ skills: result });
  } catch (err) {
    logger.error('Failed to update skills', { error: err.message, userId });
    res.status(404).json({ error: err.message });
  }
}

async function getMatchPotentialHandler(req, res) {
  const { userId } = req.params;
  try {
    const result = await calculateMatchPotential(userId);
    res.json(result);
  } catch (err) {
    logger.error('Failed to calculate match potential', { error: err.message, userId });
    res.status(404).json({ error: err.message });
  }
}

module.exports = {
  createMentorProfileHandler,
  createMenteeProfileHandler,
  updateProfileHandler,
  getProfileHandler,
  uploadPortfolioItemHandler,
  getPreferencesHandler,
  addOrUpdateSkillsHandler,
  getMatchPotentialHandler,
};
