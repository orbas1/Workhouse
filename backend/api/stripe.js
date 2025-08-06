let stripe;

if (process.env.STRIPE_SECRET_KEY) {
  const Stripe = require('stripe');
  stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-08-16',
  });
} else {
  const noop = async () => ({ });
  stripe = new Proxy({}, { get: () => noop });
}

module.exports = stripe;

