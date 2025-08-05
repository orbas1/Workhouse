const { recordLog, getApiConfig } = require('../services/security');

const requestCounts = new Map();

function securityLogger(req, res, next) {
  const user = req.user?.username || 'anonymous';
  recordLog(user, `ACCESS ${req.method} ${req.originalUrl}`);
  next();
}

function rateLimiter(req, res, next) {
  const { rateLimit } = getApiConfig();
  if (!rateLimit) return next();
  const ip = req.ip;
  const now = Date.now();
  const windowMs = 60000; // 1 minute window
  const entry = requestCounts.get(ip) || { count: 0, start: now };
  if (now - entry.start > windowMs) {
    entry.count = 0;
    entry.start = now;
  }
  entry.count += 1;
  requestCounts.set(ip, entry);
  if (entry.count > rateLimit) {
    return res.status(429).json({ error: 'Too many requests' });
  }
  next();
}

module.exports = { securityLogger, rateLimiter };
