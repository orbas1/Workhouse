const { randomUUID } = require('crypto');

// In-memory storage for all profiles
const profiles = [];

function createProfile({
  userId,
  role = 'general',
  bio = '',
  preferences = {},
  skills = [],
  geographicPreferences = {},
  profilePicture = '',
  introVideo = '',
  portfolioLinks = [],
  title = '',
}) {
  const profile = {
    id: randomUUID(),
    userId,
    role,
    bio,
    preferences,
    skills,
    portfolio: [],
    profilePicture,
    introVideo,
    portfolioLinks,
    title,
    analytics: { views: 0 },
    verificationStatus: 'unverified',
    continuousVerification: false,
    geographicPreferences,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  profiles.push(profile);
  return profile;
}

function findByUserId(userId) {
  return profiles.find((p) => p.userId === userId);
}

function findById(id) {
  return profiles.find((p) => p.id === id);
}

function updateProfile(userId, updates) {
  const profile = findByUserId(userId);
  if (!profile) return null;
  Object.assign(profile, updates, { updatedAt: new Date() });
  return profile;
}

function addPortfolioItem(userId, item) {
  const profile = findByUserId(userId);
  if (!profile) return null;
  const portfolioItem = { id: randomUUID(), ...item, createdAt: new Date() };
  profile.portfolio.push(portfolioItem);
  profile.updatedAt = new Date();
  return portfolioItem;
}

function addPortfolioItemById(profileId, item) {
  const profile = findById(profileId);
  if (!profile) return null;
  const portfolioItem = { id: randomUUID(), ...item, createdAt: new Date() };
  profile.portfolio.push(portfolioItem);
  profile.updatedAt = new Date();
  return portfolioItem;
}

function getPreferences(userId) {
  const profile = findByUserId(userId);
  return profile ? profile.preferences : null;
}

function addOrUpdateSkills(userId, skills = []) {
  const profile = findByUserId(userId);
  if (!profile) return null;
  const uniqueSkills = new Set([...(profile.skills || []), ...skills]);
  profile.skills = Array.from(uniqueSkills);
  profile.updatedAt = new Date();
  return profile.skills;
}

function getAnalytics(profileId) {
  const profile = findById(profileId);
  return profile ? profile.analytics : null;
}

function submitForVerification(profileId) {
  const profile = findById(profileId);
  if (!profile) return null;
  profile.verificationStatus = 'pending';
  profile.updatedAt = new Date();
  return profile;
}

function getVerificationStatus(profileId) {
  const profile = findById(profileId);
  return profile ? profile.verificationStatus : null;
}

function enableContinuousVerification(profileId, enabled) {
  const profile = findById(profileId);
  if (!profile) return null;
  profile.continuousVerification = enabled;
  profile.updatedAt = new Date();
  return profile;
}

function setGeographicPreferences(profileId, prefs) {
  const profile = findById(profileId);
  if (!profile) return null;
  profile.geographicPreferences = prefs;
  profile.updatedAt = new Date();
  return profile;
}

module.exports = {
  profiles,
  createProfile,
  findByUserId,
  findById,
  updateProfile,
  addPortfolioItem,
  addPortfolioItemById,
  getPreferences,
  addOrUpdateSkills,
  getAnalytics,
  submitForVerification,
  getVerificationStatus,
  enableContinuousVerification,
  setGeographicPreferences,
};
