const { verifyToken } = require('../services/auth');
const logger = require('../utils/logger');

/**
 * Express middleware to authenticate requests using a Bearer token.
 * Validates the JWT and attaches the decoded payload to req.user.
 */
module.exports = function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    logger.error('Authorization header missing');
    return res.status(401).json({ error: 'Authorization header missing' });
  }
  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);
  if (!payload) {
    logger.error('Invalid or expired token');
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
  req.user = payload;
  logger.info(`Authenticated user ${payload.username}`);
  next();
};
