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
};
