const { randomUUID } = require('crypto');

const startupProfiles = [];

function upsertStartupProfile(userId, data) {
  let profile = startupProfiles.find(p => p.userId === userId);
  if (!profile) {
    profile = {
      id: randomUUID(),
      userId,
      planDownloads: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    startupProfiles.push(profile);
  }
  Object.assign(profile, data, { updatedAt: new Date() });
  return profile;
}

function getStartupProfile(userId) {
  return startupProfiles.find(p => p.userId === userId) || null;
}

module.exports = {
  upsertStartupProfile,
  getStartupProfile,
  startupProfiles,
};
