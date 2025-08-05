const Stripe = require('stripe');

/**
 * Stripe SDK instance configured via STRIPE_SECRET_KEY.
 * The default API version is pinned to avoid breaking changes.
 */
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-08-16',
});

module.exports = stripe;

