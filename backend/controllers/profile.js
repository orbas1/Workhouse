const {
  createMentorProfile,
  createMenteeProfile,
  updateProfile,
  getProfile,
  uploadPortfolioItem,
  getPreferences,
  addOrUpdateSkills,
  calculateMatchPotential,
  // Stage 82 services
  createProfile,
  updateProfileById,
  getProfileById,
  uploadPortfolioItemById,
  getProfileAnalytics,
  submitProfileForVerification,
  getVerificationStatus,
  enableContinuousVerification,
  setGeographicPreferences,
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

// Stage 82 Handlers
async function createProfileHandler(req, res) {
  try {
    const profile = await createProfile(req.user.id, req.body);
    res.status(201).json(profile);
  } catch (err) {
    logger.error('Failed to create profile', { error: err.message });
    res.status(400).json({ error: err.message });
  }
}

async function updateProfileByIdHandler(req, res) {
  const { profileId } = req.params;
  try {
    const profile = await updateProfileById(profileId, req.body);
    res.json(profile);
  } catch (err) {
    logger.error('Failed to update profile', { error: err.message, profileId });
    res.status(404).json({ error: err.message });
  }
}

async function getProfileByIdHandler(req, res) {
  const { profileId } = req.params;
  try {
    const profile = await getProfileById(profileId);
    res.json(profile);
  } catch (err) {
    logger.error('Failed to retrieve profile', { error: err.message, profileId });
    res.status(404).json({ error: err.message });
  }
}

async function uploadPortfolioItemByIdHandler(req, res) {
  const { profileId } = req.params;
  try {
    const item = await uploadPortfolioItemById(profileId, req.body);
    res.status(201).json(item);
  } catch (err) {
    logger.error('Failed to upload portfolio item', { error: err.message, profileId });
    res.status(404).json({ error: err.message });
  }
}

async function getProfileAnalyticsHandler(req, res) {
  const { profileId } = req.params;
  try {
    const analytics = await getProfileAnalytics(profileId);
    res.json(analytics);
  } catch (err) {
    logger.error('Failed to get profile analytics', { error: err.message, profileId });
    res.status(404).json({ error: err.message });
  }
}

async function submitProfileForVerificationHandler(req, res) {
  const { profileId } = req.params;
  try {
    const profile = await submitProfileForVerification(profileId);
    res.json({ verificationStatus: profile.verificationStatus });
  } catch (err) {
    logger.error('Failed to submit profile for verification', { error: err.message, profileId });
    res.status(404).json({ error: err.message });
  }
}

async function getVerificationStatusHandler(req, res) {
  const { profileId } = req.params;
  try {
    const status = await getVerificationStatus(profileId);
    res.json(status);
  } catch (err) {
    logger.error('Failed to get verification status', { error: err.message, profileId });
    res.status(404).json({ error: err.message });
  }
}

async function enableContinuousVerificationHandler(req, res) {
  const { profileId } = req.params;
  const { enabled } = req.body;
  try {
    const profile = await enableContinuousVerification(profileId, enabled);
    res.json({ continuousVerification: profile.continuousVerification });
  } catch (err) {
    logger.error('Failed to update continuous verification', { error: err.message, profileId });
    res.status(404).json({ error: err.message });
  }
}

async function setGeographicPreferencesHandler(req, res) {
  const { profileId } = req.params;
  try {
    const prefs = await setGeographicPreferences(profileId, req.body);
    res.json({ geographicPreferences: prefs });
  } catch (err) {
    logger.error('Failed to set geographic preferences', { error: err.message, profileId });
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
  // Stage 82 exports
  createProfileHandler,
  updateProfileByIdHandler,
  getProfileByIdHandler,
  uploadPortfolioItemByIdHandler,
  getProfileAnalyticsHandler,
  submitProfileForVerificationHandler,
  getVerificationStatusHandler,
  enableContinuousVerificationHandler,
  setGeographicPreferencesHandler,
};
