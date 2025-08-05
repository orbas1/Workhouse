const logger = require('../utils/logger');

const requests = new Map();
const WINDOW_MS = 60 * 1000;
const LIMIT = 5;

module.exports = (req, res, next) => {
  const key = req.user?.id || req.ip;
  const now = Date.now();
  const entry = requests.get(key) || { count: 0, start: now };
  if (now - entry.start > WINDOW_MS) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count += 1;
  requests.set(key, entry);
  if (entry.count > LIMIT) {
    logger.error('Rate limit exceeded', { user: key });
    return res.status(429).json({ error: 'Too many requests' });
  }
  next();
};
