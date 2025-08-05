const { verifyToken } = require('../services/auth');
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
