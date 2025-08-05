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

module.exports = {
  createMentorProfile,
  createMenteeProfile,
  updateProfile,
  getProfile,
  uploadPortfolioItem,
  getPreferences,
  addOrUpdateSkills,
  calculateMatchPotential,
};
