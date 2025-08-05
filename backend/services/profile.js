const profileModel = require('../models/profile');
const logger = require('../utils/logger');

async function createMentorProfile(data) {
  const profile = profileModel.createProfile({ ...data, role: 'mentor' });
  logger.info('Mentor profile created', { userId: profile.userId });
  return profile;
}

async function createMenteeProfile(data) {
  const profile = profileModel.createProfile({ ...data, role: 'mentee' });
  logger.info('Mentee profile created', { userId: profile.userId });
  return profile;
}

async function updateProfile(userId, updates) {
  const profile = profileModel.updateProfile(userId, updates);
  if (!profile) {
    logger.error('Profile not found for update', { userId });
    throw new Error('Profile not found');
  }
  logger.info('Profile updated', { userId });
  return profile;
}

async function getProfile(userId) {
  const profile = profileModel.findByUserId(userId);
  if (!profile) {
    logger.error('Profile not found', { userId });
    throw new Error('Profile not found');
  }
  return profile;
}

async function uploadPortfolioItem(userId, item) {
  const result = profileModel.addPortfolioItem(userId, item);
  if (!result) {
    logger.error('Profile not found for portfolio upload', { userId });
    throw new Error('Profile not found');
  }
  logger.info('Portfolio item added', { userId, itemId: result.id });
  return result;
}

async function getPreferences(userId) {
  const prefs = profileModel.getPreferences(userId);
  if (!prefs) {
    logger.error('Profile preferences not found', { userId });
    throw new Error('Profile not found');
  }
  return prefs;
}

async function addOrUpdateSkills(userId, skills) {
  const result = profileModel.addOrUpdateSkills(userId, skills);
  if (!result) {
    logger.error('Profile not found for skills update', { userId });
    throw new Error('Profile not found');
  }
  logger.info('Skills updated', { userId, skillsCount: result.length });
  return result;
}

async function calculateMatchPotential(userId) {
  const profile = profileModel.findByUserId(userId);
  if (!profile) {
    logger.error('Profile not found for match potential', { userId });
    throw new Error('Profile not found');
  }
  // Dummy logic: score based on number of skills and preferences
  const skillScore = (profile.skills || []).length;
  const preferenceScore = Object.keys(profile.preferences || {}).length;
  const score = Math.min(100, (skillScore * 10) + (preferenceScore * 5));
  logger.info('Match potential calculated', { userId, score });
  return { userId, score };
}

// Stage 82 Investor-Entrepreneur Profile Services
async function createProfile(userId, data = {}) {
  const profile = profileModel.createProfile({ userId, ...data });
  logger.info('Profile created', { userId, profileId: profile.id });
  return profile;
}

async function updateProfileById(profileId, updates) {
  const profile = profileModel.findById(profileId);
  if (!profile) {
    logger.error('Profile not found for update', { profileId });
    throw new Error('Profile not found');
  }
  Object.assign(profile, updates, { updatedAt: new Date() });
  logger.info('Profile updated', { profileId });
  return profile;
}

async function getProfileById(profileId) {
  const profile = profileModel.findById(profileId);
  if (!profile) {
    logger.error('Profile not found', { profileId });
    throw new Error('Profile not found');
  }
  return profile;
}

async function uploadPortfolioItemById(profileId, item) {
  const result = profileModel.addPortfolioItemById(profileId, item);
  if (!result) {
    logger.error('Profile not found for portfolio upload', { profileId });
    throw new Error('Profile not found');
  }
  logger.info('Portfolio item added', { profileId, itemId: result.id });
  return result;
}

async function getProfileAnalytics(profileId) {
  const analytics = profileModel.getAnalytics(profileId);
  if (!analytics) {
    logger.error('Profile analytics not found', { profileId });
    throw new Error('Profile not found');
  }
  return analytics;
}

async function submitProfileForVerification(profileId) {
  const profile = profileModel.submitForVerification(profileId);
  if (!profile) {
    logger.error('Profile not found for verification', { profileId });
    throw new Error('Profile not found');
  }
  logger.info('Profile submitted for verification', { profileId });
  return profile;
}

async function getVerificationStatus(profileId) {
  const status = profileModel.getVerificationStatus(profileId);
  if (!status) {
    logger.error('Profile not found for verification status', { profileId });
    throw new Error('Profile not found');
  }
  return { status };
}

async function enableContinuousVerification(profileId, enabled) {
  const profile = profileModel.enableContinuousVerification(profileId, enabled);
  if (!profile) {
    logger.error('Profile not found for continuous verification', { profileId });
    throw new Error('Profile not found');
  }
  logger.info('Continuous verification updated', { profileId, enabled });
  return profile;
}

async function setGeographicPreferences(profileId, prefs) {
  const profile = profileModel.setGeographicPreferences(profileId, prefs);
  if (!profile) {
    logger.error('Profile not found for geographic preferences', { profileId });
    throw new Error('Profile not found');
  }
  logger.info('Geographic preferences updated', { profileId });
  return profile.geographicPreferences;
}

module.exports = {
  createMentorProfile,
  createMenteeProfile,
  updateProfile,
  getProfile,
  uploadPortfolioItem,
  getPreferences,
  addOrUpdateSkills,
  calculateMatchPotential,
  // Stage 82 exports
  createProfile,
  updateProfileById,
  getProfileById,
  uploadPortfolioItemById,
  getProfileAnalytics,
  submitProfileForVerification,
  getVerificationStatus,
  enableContinuousVerification,
  setGeographicPreferences,
};
