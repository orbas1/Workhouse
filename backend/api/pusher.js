const Pusher = require('pusher');

const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

/**
 * Trigger an event on a Pusher channel.
 * @param {string} channel
 * @param {string} event
 * @param {Object} data
 */
function trigger(channel, event, data) {
  return pusher.trigger(channel, event, data);
}

module.exports = {
  trigger,
};
