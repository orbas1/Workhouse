const { randomUUID } = require('crypto');

// In-memory store of ads keyed by groupId then adId
const adGroups = new Map();

function createAd(groupId, { title, content, targetUrl, imageUrl }) {
  const id = randomUUID();
  const now = new Date();
  const ad = {
    id,
    groupId,
    title,
    content,
    targetUrl,
    imageUrl,
    createdAt: now,
    updatedAt: now,
  };
  if (!adGroups.has(groupId)) {
    adGroups.set(groupId, new Map());
  }
  adGroups.get(groupId).set(id, ad);
  return ad;
}

function getAd(groupId, adId) {
  return adGroups.get(groupId)?.get(adId) || null;
}

function updateAd(groupId, adId, updates) {
  const group = adGroups.get(groupId);
  if (!group || !group.has(adId)) return null;
  const current = group.get(adId);
  const updated = { ...current, ...updates, updatedAt: new Date() };
  group.set(adId, updated);
  return updated;
}

module.exports = {
  createAd,
  getAd,
  updateAd,
};
