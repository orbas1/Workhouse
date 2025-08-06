const { randomUUID } = require('crypto');

const paymentMethods = [
  { id: 1, type: 'card', last4: '4242', brand: 'Visa' },
];

const transactions = [
  { id: 1, date: '2024-01-10', amount: 50, type: 'ads', status: 'paid' },
  { id: 2, date: '2024-02-15', amount: 75, type: 'subscription', status: 'failed' },
];

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

function getPaymentMethods() {
  return paymentMethods;
}

function getTransactions() {
  return transactions;
}

function getPreferences(userId) {
  return preferences.get(userId) || [];
}

function updatePreferences(userId, prefs) {
  preferences.set(userId, prefs);
  return prefs;
}

module.exports = {
  getPaymentMethods,
  getTransactions,
  listAds,
  getPreferences,
  updatePreferences,
};
