const { randomUUID } = require('crypto');

const ads = new Map();
const preferences = new Map();

function seedAds() {
  if (ads.size > 0) return;
  const sample = [
    {
      id: randomUUID(),
      title: 'Pro Membership',
      content: 'Unlock premium features to boost your productivity.',
      ctaUrl: 'https://example.com/pro',
      createdAt: new Date(),
    },
    {
      id: randomUUID(),
      title: 'Resume Review',
      content: 'Get your resume reviewed by industry experts.',
      ctaUrl: 'https://example.com/resume',
      createdAt: new Date(),
    },
  ];
  sample.forEach((ad) => ads.set(ad.id, ad));
}

seedAds();

function listAds() {
  return Array.from(ads.values());
}

function getPreferences(userId) {
  return preferences.get(userId) || [];
}

function updatePreferences(userId, prefs) {
  preferences.set(userId, prefs);
  return prefs;
}

module.exports = {
  listAds,
  getPreferences,
  updatePreferences,
};
