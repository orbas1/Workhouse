let stripe;

if (process.env.STRIPE_SECRET_KEY) {
  const Stripe = require('stripe');
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-08-16',
  });
} else {
  const missing = async () => {
    throw new Error('Stripe credentials are missing.');
  };
  stripe = new Proxy({}, { get: () => missing });
}

module.exports = stripe;

