const { verifyToken } = require('../services/auth');

module.exports = function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    console.warn('Authentication failed: Missing Authorization header');
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1];
  const payload = verifyToken(token);
  if (!payload) {
    console.warn('Authentication failed: Invalid token');
    return res.status(401).json({ error: 'Invalid token' });
  }

  req.user = payload;
  next();
};
