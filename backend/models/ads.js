const paymentMethods = [
  { id: 1, type: 'card', last4: '4242', brand: 'Visa' }
];

const transactions = [
  { id: 1, date: '2024-01-10', amount: 50, type: 'ads', status: 'paid' },
  { id: 2, date: '2024-02-15', amount: 75, type: 'subscription', status: 'failed' }
];

const campaigns = [
  { id: 1, name: 'Winter Promo', impressions: 1000, clicks: 120, ctr: 0.12, spend: 150 },
  { id: 2, name: 'Spring Sale', impressions: 500, clicks: 80, ctr: 0.16, spend: 90 }
];

module.exports = {
  getPaymentMethods: () => paymentMethods,
  getTransactions: () => transactions,
  getCampaigns: () => campaigns
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
