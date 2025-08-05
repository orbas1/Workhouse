const { verifyToken } = require('../services/auth');

function authenticate(req, res, next) {
  const header = req.headers.authorization;
  if (!header) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }
  const token = header.split(' ')[1];
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }
  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
  req.user = payload;
  next();
}

module.exports = authenticate;
module.exports = { authenticate };
// Middleware to verify JWT token and attach payload to req.user
module.exports = function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }
  const payload = verifyToken(token);
  if (!payload) {
    return res.status(401).json({ error: 'Invalid or expired token' });
const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    logger.error('Authentication token missing');
    return res.status(401).json({ error: 'Authentication required' });
  }
  const payload = verifyToken(token);
  if (!payload) {
    logger.error('Invalid authentication token');
    return res.status(401).json({ error: 'Invalid token' });
  }
  req.user = payload;
  next();
};
