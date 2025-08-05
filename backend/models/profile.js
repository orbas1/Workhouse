const { randomUUID } = require('crypto');

// In-memory storage for mentor and mentee profiles
const profiles = [];

function createProfile({ userId, role, bio = '', preferences = {}, skills = [] }) {
  const profile = {
    id: randomUUID(),
    userId,
    role, // 'mentor' or 'mentee'
    bio,
    preferences,
    skills,
    portfolio: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  profiles.push(profile);
  return profile;
}

function findByUserId(userId) {
  return profiles.find((p) => p.userId === userId);
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

module.exports = {
  profiles,
  createProfile,
  findByUserId,
  updateProfile,
  addPortfolioItem,
  getPreferences,
  addOrUpdateSkills,
};
